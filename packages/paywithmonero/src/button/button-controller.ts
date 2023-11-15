import {appendSharedStyles} from "../../utils/append-shared-styles";
import {ButtonView} from "./button-view";
import {Events} from "../types/events";
import {makeEvent} from "../../utils/make-event";

class MoneroPaymentButton extends HTMLElement {
  payButton: HTMLElement;
  itemName: string;
  itemPrice: number;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.itemName = this.getAttribute('itemName') || 'Sample Item';
    this.itemPrice = parseFloat(this.getAttribute('itemPrice')) || 1;

    appendSharedStyles(this.shadowRoot);

    this.shadowRoot.innerHTML = ButtonView;

    // Get references to elements
    this.payButton = this.shadowRoot.getElementById('payButton');

    // Add event listener
    this.payButton.addEventListener('click', this.showModal.bind(this));
  }

  showModal() {
    this.dispatchEvent(
      makeEvent(Events.showModal, {itemName: this.itemName, itemPrice: this.itemPrice})
    );
  }
}

// Define the custom element for the button
customElements.define('pay-with-monero', MoneroPaymentButton);