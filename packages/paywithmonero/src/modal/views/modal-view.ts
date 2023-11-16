export const ModalView = `
  <div id="modal-backdrop" style="display: none;"></div>
  <div id="modal" style="display: none;">
    <button id="close-modal">x</button>
    <h2>Monero Payment Request</h2>
    <button id="addToCartButton">Add to Cart</button>
    <button id="checkoutButton">Go to Checkout</button>
    <div id="cartItems"><table></table></div>
    <div id="error"></div>
    <div id="shippingForm" style="display: none;">
      <h2>Shipping Form</h2>
        <form id="shippingInfo">
          <label for="recipientName">Recipient's Name:</label>
          <input type="text" id="recipientName" name="recipientName">
      
          <label for="address">Address:</label>
          <input type="text" id="address" name="address">
      
          <label for="city">City:</label>
          <input type="text" id="city" name="city">
      
          <label for="state">State:</label>
          <input type="text" id="state" name="state">
      
          <label for="zipCode">Zip Code:</label>
          <input type="text" id="zipCode" name="zipCode">
      
          <label for="email">Email:</label>
          <input type="email" id="email" name="email">
      
          <button id="confirmShippingButton" type="submit">Submit</button>
        </form>
    </div>
    <div id="paymentForm" style="display: none;">
      <h2>Payment</h2>
      <div id="qrcode"></div>
      <p>Scan the QR code with your Monero Subscription Wallet to make the payment.</p>
      <button id="backToCartButton">Back to Cart</button>
    </div>
  </div>
`