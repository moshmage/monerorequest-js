export const ModalStyles = `
:host #modal-backdrop {
  position: absolute;
  top:0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background: var(--shadow-color);
  opacity: 0.5;
}

:host #modal {
  width: 33vw;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 1em;
  border-radius: .5em;
  position: absolute;
  top: 10vh;
  left: 33vw;
  z-index: 2;
}

:host #close-modal {
  width: fit-content;
  padding: .5em;
  position: absolute;
  right: 1em;
  top: 1.5em;
}

:host button {
  border: 1px solid var(--border-color);
  width: 100%;
  text-align: center;
  border-radius: .1em;
  padding: .3em;
  color: var(--text-color);
  cursor: pointer;
  margin-bottom: .5em;
}

:host h2 {
  padding-bottom: .5em;
  color: var(--text-color);
}

:host .cart {
  border: 1px solid var(--border-color);
  border-radius: .5em;
  width: 100%;
  margin-top: 1em;
}

:host .cart .item, :host .cart .total {
  padding: .5em;
  margin: .5em;
}

:host .cart .item {
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

:host .cart .item div {
 pointer-events: none;
}

:host .cart .total {
  display: flex;
  justify-content: space-between;
  color: var(--special-color);
}

:host form {
  border: 1px solid var(--border-color);
  border-radius: .5em;
  padding: 1em;
}

:host label {
  display: block;
  color: var(--text-color);
  margin-bottom: .3em;
}

:host input {
  width: 100%;
  margin-bottom: .7em;
  padding: 0;
}

:host form button, :host #backToCartButton {
  margin-top: 1em;
}

:host #qrcode {
  display: flex;
  justify-content: center;
}

:host {
  color: var(--text-color);
}

:host p {
  text-align: center;
  margin-bottom: .5em;
}

`;