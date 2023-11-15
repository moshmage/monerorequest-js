import {appendSharedStyles, appendStyles} from "../../utils/append-shared-styles";
import {ButtonView} from "./views/button-view.ts";
import {Events} from "../types/events";
import {makeEvent} from "../../utils/make-event";
import {ButtonStyles} from "./styles/button-styles.ts";

class MoneroPaymentButton extends HTMLElement {
  payButton: HTMLElement;
  itemName: string;
  itemPrice: number;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.itemName = this.getAttribute('item-name') || 'Sample Item';
    this.itemPrice = parseFloat(this.getAttribute('item-price')) || 1;

    this.shadowRoot.innerHTML = ButtonView;
    appendSharedStyles(this.shadowRoot);
    appendStyles(this.shadowRoot, ButtonStyles);

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