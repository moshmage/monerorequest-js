import {MoneroPaymentButton} from "../../src/button/button-controller.ts";

describe('MoneroPaymentButton', () => {

  it('renders correctly', () => {
    const el = new MoneroPaymentButton();
    document.body.appendChild(el);

    const shadowRoot = el.shadowRoot!;
    const payButton = shadowRoot.querySelector('#payButton') as HTMLButtonElement;
    expect(payButton).not.toBeNull();

    document.body.removeChild(el);
  });

  it('dispatches showModal event on button click', () => {
    const el = new MoneroPaymentButton();
    document.body.appendChild(el);

    const spyDispatchEvent = jest.spyOn(el, 'dispatchEvent');

    el.shadowRoot.getElementById("payButton").dispatchEvent(new Event("click"))

    expect(spyDispatchEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'show-modal',
        detail: expect.objectContaining({
          itemName: el.itemName,
          itemPrice: el.itemPrice,
        }),
      })
    );

    spyDispatchEvent.mockRestore();
    document.body.removeChild(el);
  });

});