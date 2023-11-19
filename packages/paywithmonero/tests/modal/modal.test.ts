import {MoneroModal} from "../../src/modal/modal-controller.ts";

describe('MoneroModal', () => {
  let el: MoneroModal;

  beforeEach(() => {
    el = new MoneroModal("8BgaEbUAhz2SuvTPUfCQp4BX4QHqQ8CUGKEVxyazhx6dJDnwUZSNKH8VYewYGtdJjnRLdpc1ReksEegZEzU2obds1VLTQG7");
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
  });

  it('renders modal correctly', () => {
    expect(el.shadowRoot.getElementById('modal')).not.toBeNull();
  });

  it('dispatches showModal event and adds item to cart on button click', () => {
    const itemName = 'Test Item';
    const itemPrice = 10;
    document.dispatchEvent(new CustomEvent('show-modal', {
      detail: { itemName, itemPrice },
    }));

    expect(el.cart).toHaveLength(0);

    el.addToCartButton.dispatchEvent(new Event('click'));

    expect(el.cart).toHaveLength(1);
    expect(el.cart[0]).toEqual({ name: itemName, price: itemPrice });
  });

  it('removes item from cart on button click', () => {
    document.dispatchEvent(new CustomEvent('show-modal', {
      detail: { itemName: 'Test Item 2', itemPrice: 10 },
    }));
    el.addToCartButton.dispatchEvent(new Event('click'));

    const before = el.cart.length;

    const cartItem = el.cartItems.querySelector('.cart .item');

    expect(cartItem).toBeTruthy();

    cartItem?.dispatchEvent(new Event('click', {bubbles: true}));

    const after = el.cart.length;

    expect(after).toBeLessThan(before);
  });

  it('copies QR code element title to clipboard on button click', async () => {
    const clipboardWriteTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: clipboardWriteTextMock },
      writable: true,
    });

    el.copyQrCode.dispatchEvent(new Event('click'));

    expect(clipboardWriteTextMock).toHaveBeenCalledWith(el.qrCodeElement.title);
  });
});