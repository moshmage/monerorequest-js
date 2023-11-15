# Monero Payment Request WebComponent
## Usage
Add the script via cdn:
```html
<script src="cdn/to/@monerorequest-js/paywith-monero" />
```
Add the following element to each of the sellable items; This component will open a modal that will have two options, 
"add to cart" and "go to checkout".
```html
<pay-with-monero item-name="Sample item" item-price="10.00" />
```
Finally, add the monero-payment-request-modal which will communicate with the custom-events sent by `<pay-with-monero />`
and provide a shipping address and a QR code generator with the encoded monero payment request.
```html
<monero-payment-request-modal sellers-wallet="Your_XMR_Address" 
                              change-indicator-url="optional" 
                              custom-label="optional"/>
```