export const CartView = (cart: {name: string, price: number}[]) => `<div class="cart">
  ${cart.map((item, i) =>`<div class="item" id="${i}"><div>${item.name}</div><div>${item.price} XMR</div></div>`).join("")}
  <div class="total"><div>Total</div>${cart.reduce((p,c) => +p+(+c.price),0)} XMR</div>
</div>`;