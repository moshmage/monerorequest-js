import sharedStyles from "../src/shared-styles";

export function appendStyles(shadowRoot: ShadowRoot, styles: string) {
  const style = document.createElement('style');
  style.textContent = styles;
  shadowRoot.appendChild(style);
}

export function appendSharedStyles(shadowRoot: ShadowRoot) {
  appendStyles(shadowRoot, sharedStyles);
}