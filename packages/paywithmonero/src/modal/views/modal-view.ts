export const ModalView = `
  <div id="modal" style="display: none;">
    <h2>Monero Payment Request</h2>
    <button id="addToCartButton">Add to Cart</button>
    <button id="checkoutButton">Go to Checkout</button>
    <div id="cartItems"><table></table></div>
    <div id="shippingForm" style="display: none;">
      <h2>Shipping Form</h2>
        <form id="shippingInfo">
          <label for="recipientName">Recipient's Name:</label>
          <input type="text" id="recipientName" name="recipientName" required>
      
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required>
      
          <label for="city">City:</label>
          <input type="text" id="city" name="city" required>
      
          <label for="state">State:</label>
          <input type="text" id="state" name="state" required>
      
          <label for="zipCode">Zip Code:</label>
          <input type="text" id="zipCode" name="zipCode" required>
      
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
      
          <button type="submit">Submit</button>
        </form>
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