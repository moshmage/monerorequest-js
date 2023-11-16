import {ModalView} from "./views/modal-view.ts";
import {Events} from "../types/events";
import {setElementDisplay} from "../../utils/set-element-display";
/** Import the needed files from source instead of package because we want this component to be as self-sufficient as possible */
import {makeRandomId, MoneroPaymentRequestEncoder, MoneroPaymentRequestPayload_V1} from "../../../paymentrequest/src/index.ts"
import {appendSharedStyles, appendStyles} from "../../utils/append-shared-styles.ts";
import {ModalStyles} from "./styles/modal-styles.ts";
import {AddItemButton} from "./views/add-item-button-view.ts";
import {CartView} from "./views/cart-view.ts";
import {Errors} from "../../utils/errors.ts";

type MoneroCart = {moneroCart: {name: string; price: number}[]};

export class MoneroModal extends HTMLElement {

  modal: HTMLDivElement;
  modalBackdrop: HTMLDivElement;
  addToCartButton: HTMLButtonElement;
  checkoutButton: HTMLButtonElement;
  confirmShippingButton: HTMLButtonElement;
  backToCartButton: HTMLButtonElement;
  closeModal: HTMLButtonElement;
  shippingForm: HTMLDivElement;
  cartItems: HTMLDivElement;
  paymentForm: HTMLDivElement;
  qrCodeElement: HTMLDivElement;
  errorElement: HTMLDivElement;

  itemPrice: number;
  itemName: string;

  sellersWallet: string;
  changeIndicatorUrl: string;
  customLabel: string;
  shippingInfo: Record<string, string|number>

  constructor() {
    super();
    this.attachShadow({mode: "open"});

    this.sellersWallet = this.getAttribute("sellers-wallet")?.toString();
    if (!this.sellersWallet)
      throw new Error("[sellers-wallet] attribute is required");

    this.changeIndicatorUrl = this.getAttribute("change-indicator-url")?.toString() ?? "";
    this.customLabel = this.getAttribute("custom-label")?.toString() ?? "";

    this.shadowRoot.innerHTML = ModalView;

    appendSharedStyles(document.head as any);
    appendStyles(this.shadowRoot, ModalStyles);

    this.modal = this.shadowRoot.getElementById('modal') as HTMLDivElement;
    this.modalBackdrop = this.shadowRoot.getElementById('modal-backdrop') as HTMLDivElement;
    this.addToCartButton = this.shadowRoot.getElementById('addToCartButton') as HTMLButtonElement;
    this.checkoutButton = this.shadowRoot.getElementById('checkoutButton') as HTMLButtonElement;
    this.shippingForm = this.shadowRoot.getElementById('shippingForm') as HTMLDivElement;
    this.cartItems = this.shadowRoot.getElementById('cartItems') as HTMLDivElement;
    this.confirmShippingButton = this.shadowRoot.getElementById('confirmShippingButton') as HTMLButtonElement;
    this.paymentForm = this.shadowRoot.getElementById('paymentForm') as HTMLDivElement;
    this.qrCodeElement = this.shadowRoot.getElementById('qrcode') as HTMLDivElement;
    this.errorElement = this.shadowRoot.getElementById('error') as HTMLDivElement;
    this.backToCartButton = this.shadowRoot.getElementById('backToCartButton') as HTMLButtonElement;
    this.closeModal = this.shadowRoot.getElementById('close-modal') as HTMLButtonElement;

    this.addToCartButton.addEventListener('click', _ => this.addToCart());
    this.checkoutButton.addEventListener('click', _ => this.switchViews(this.shippingForm));
    this.confirmShippingButton.addEventListener('click', _ => this.showPayment());
    this.backToCartButton.addEventListener('click', _ => this.switchViews(this.cartItems));
    this.closeModal.addEventListener('click', _ => this.hideModal());

    const shippingForm = this.shadowRoot.getElementById('shippingInfo');

    // Add event listener to the form
    shippingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.shippingInfo =
        Object.fromEntries(new FormData(event.target as any).entries()) as Record<string, string | number>;
    });

    document.addEventListener(Events.showModal, event =>
      this.showModal(event as unknown as CustomEvent));

    this.cartItems.addEventListener("click", event => {
      const target = event.target as HTMLElement;
      console.log(`Target`, target);
      if (target.classList.contains("item"))
        this.removeItem(+target.id);
    });
  }

  get cart() {
    return (window as unknown as MoneroCart).moneroCart || [];
  }

  set cart(v) {
    (window as unknown as MoneroCart).moneroCart = v;
  }

  redrawCartItems() {
    this.cartItems.innerHTML = CartView(this.cart);
  }

  setError(value: string) {
    this.errorElement.innerText = value;
  }

  switchViews(ele?: HTMLElement) {
    [this.shippingForm, this.paymentForm].forEach((e) => setElementDisplay(e, "none"));
    if (ele)
      setElementDisplay(ele as HTMLDivElement, "block")
  }

  hideModal() {
    [this.modalBackdrop, this.modal].forEach(e => setElementDisplay(e, "none"))
    this.switchViews();
  }

  removeItem(index: number) {
    const copy = Array.from(this.cart);
    copy.splice(index, 1);
    this.cart = copy;
    this.redrawCartItems();
  }

  showModal(event: CustomEvent) {
    setElementDisplay(this.modal, "block");
    setElementDisplay(this.modalBackdrop, "block");
    this.itemName = event.detail.itemName;
    this.itemPrice = event.detail.itemPrice;
    this.addToCartButton.innerHTML = AddItemButton(event.detail.itemName);
  }

  addToCart() {
    this.setError("");
    this.cart = [...(this.cart || []), {name: this.itemName, price: this.itemPrice}];
    this.redrawCartItems();
  }

  async loadQRCodeLibrary() {
    try {
      if (document.getElementById("qrCodeLoaded"))
        return true;

      const qrCodeScript = document.createElement('script');
      qrCodeScript.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
      qrCodeScript.type = 'text/javascript';
      qrCodeScript.async = true;
      qrCodeScript.id = 'qrCodeLoaded';

      await new Promise((resolve, reject) => {
        qrCodeScript.onload = resolve;
        qrCodeScript.onerror = reject;
        this.shadowRoot.appendChild(qrCodeScript);
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
      cart: JSON.stringify(this.cart),
      shipping_info: JSON.stringify(this.shippingInfo)
    }

    this.qrCodeElement.innerHTML = ``;
    new (window as any).QRCode(this.qrCodeElement, MoneroPaymentRequestEncoder.fromJson(request));
  }

  async showPayment() {
    this.setError("");
    setElementDisplay(this.shippingForm, "none");

    if (!this.cart.length)
      return this.setError(Errors.NoCartToSubmit);

    await this.loadQRCodeLibrary();

    setElementDisplay(this.paymentForm, "block");
    this.createQRCode();
  }
}

customElements.define('monero-payment-request-modal', MoneroModal);