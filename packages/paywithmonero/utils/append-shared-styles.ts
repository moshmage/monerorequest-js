import sharedStyles from "../src/shared-styles";

export function appendSharedStyles(shadowRoot: ShadowRoot) {
  const style = document.createElement('style');
  style.textContent = sharedStyles;
  shadowRoot.appendChild(style);
}