export const ModalView = `
      <div id="modal" style="display: none;">
        <button id="addToCartButton">Add to Cart</button>
        <button id="checkoutButton">Go to Checkout</button>
        <div id="shippingForm" style="display: none;">
          <h2>Shipping Form</h2>
          <div id="cartItems"><table></table></div>
          <button id="confirmShippingButton">Confirm Shipping</button>
        </div>
        <div id="paymentForm" style="display: none;">
          <h2>Payment</h2>
          <p>Scan the QR code with your Monero wallet to make the payment.</p>
          <div id="qrcode"></div>
          <button id="backToCartButton">Back to Cart</button>
        </div>
      </div>
`