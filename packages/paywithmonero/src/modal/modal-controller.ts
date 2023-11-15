import {ModalView} from "./modal-view";
import {Events} from "../types/events";
import {setElementDisplay} from "../../utils/set-element-display";

/** Import the needed files from source instead of package because we want this component to be as self-sufficient as possible */
import {makeRandomId, MoneroPaymentRequestEncoder, MoneroPaymentRequestPayload_V1} from "../../../paymentrequest/src/index.ts"

type MoneroCart = {moneroCart: {name: string; price: number}[]};

export class MoneroModal extends HTMLElement {

  modal: HTMLDivElement;
  addToCartButton: HTMLButtonElement;
  checkoutButton: HTMLButtonElement;
  confirmShippingButton: HTMLButtonElement;
  backToCartButton: HTMLButtonElement;
  shippingForm: HTMLDivElement;
  cartItems: HTMLDivElement;
  paymentForm: HTMLDivElement;
  qrCodeElement: HTMLDivElement;

  itemPrice: number;
  itemName: string;

  sellersWallet: string;
  changeIndicatorUrl: string;
  customLabel: string;

  constructor() {
    super();
    this.attachShadow({mode: "open"});

    this.sellersWallet = this.getAttribute("sellers-wallet")?.toString();
    if (!this.sellersWallet)
      throw new Error("[sellers-wallet] attribute is required");

    this.changeIndicatorUrl = this.getAttribute("change-indicator-url")?.toString() ?? "";
    this.customLabel = this.getAttribute("custom-label")?.toString() ?? "";


    this.shadowRoot.innerHTML = ModalView;

    this.modal = this.shadowRoot.getElementById('modal') as HTMLDivElement;
    this.addToCartButton = this.shadowRoot.getElementById('addToCartButton') as HTMLButtonElement;
    this.checkoutButton = this.shadowRoot.getElementById('checkoutButton') as HTMLButtonElement;
    this.shippingForm = this.shadowRoot.getElementById('shippingForm') as HTMLDivElement;
    this.cartItems = this.shadowRoot.getElementById('cartItems') as HTMLDivElement;
    this.confirmShippingButton = this.shadowRoot.getElementById('confirmShippingButton') as HTMLButtonElement;
    this.paymentForm = this.shadowRoot.getElementById('paymentForm') as HTMLDivElement;
    this.qrCodeElement = this.shadowRoot.getElementById('qrcode') as HTMLDivElement;
    this.backToCartButton = this.shadowRoot.getElementById('backToCartButton') as HTMLButtonElement;

    this.addToCartButton.addEventListener('click', _ => this.addToCart());
    this.checkoutButton.addEventListener('click', _ => setElementDisplay(this.shippingForm, "block"));
    this.confirmShippingButton.addEventListener('click', _ => this.showPayment());
    this.backToCartButton.addEventListener('click', _ => setElementDisplay(this.cartItems, "block"));

    document.addEventListener(Events.showModal, event =>
      this.showModal(event as unknown as CustomEvent));
  }

  get cart() {
    return (window as unknown as MoneroCart).moneroCart;
  }

  set cart(v) {
    (window as unknown as MoneroCart).moneroCart = v;
  }

  redrawCartItems() {
    this.cartItems.innerHTML = [
      `<table>`,
      ...this.cart.map((item, i) =>
        `<tr onclick="${() => this.removeItem(i)}"><td>${item.name}</td><td>${item.price} XMR</td></tr>`),
      `</table>`
    ].join(``);
  }

  removeItem(index: number) {
    const copy = Array.from(this.cart);
    copy.splice(0, index);
    this.cart = copy;
    this.redrawCartItems();
  }

  showModal(event: CustomEvent) {
    setElementDisplay(this.modal, "block");

    this.addToCartButton.innerText = `Add ${event.detail.itemName} to cart`;
    this.itemName = event.detail.itemName;
    this.itemPrice = event.detail.itemPrice;
  }

  addToCart() {
    this.cart = [...(this.cart || []), {name: this.itemName, price: this.itemPrice}];
    this.redrawCartItems();
  }

  async loadQRCodeLibrary() {
    try {
      if (document.getElementById("qrCodeLoaded"))
        return true;

      const qrCodeScript = document.createElement('script');
      qrCodeScript.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.1/dist/qrcode.min.js';
      qrCodeScript.type = 'text/javascript';
      qrCodeScript.async = true;
      qrCodeScript.id = 'qrCodeLoaded';

      await new Promise((resolve, reject) => {
        qrCodeScript.onload = resolve;
        qrCodeScript.onerror = reject;
        document.head.appendChild(qrCodeScript);
      });
    } catch (error) {
      console.error('Error loading QR code generator:', error);
      return false;
    }
  }

  createQRCode() {
    const total = this.cart.reduce((p,c) => +p+(+c),0)

    const request: MoneroPaymentRequestPayload_V1 = {
      amount: total.toString(),
      currency: "XMR",
      number_of_payments: 1,
      change_indicator_url: this.changeIndicatorUrl,
      custom_label: this.customLabel,
      days_per_billing_cycle: 0,
      start_date: new Date().toISOString(),
      sellers_wallet: this.sellersWallet,
      payment_id: makeRandomId(),
    }

    const qr = (window as any).QRCode(0, 'M');
    qr.addData(MoneroPaymentRequestEncoder.fromJson(request));
    qr.make();

    // Display the QR code
    this.qrCodeElement.innerHTML = qr.createImgTag();
  }

  async showPayment() {
    await this.loadQRCodeLibrary();

    setElementDisplay(this.paymentForm, "block");
    this.createQRCode();
  }

}

customElements.define('monero-payment-request-modal', MoneroModal);