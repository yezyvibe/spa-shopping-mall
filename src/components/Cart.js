import { removeItem } from "../utils/localStorage.js";
import { routeChange } from "../utils/router.js";
import { comma } from "../utils/comma.js";

export default function Cart({ $target, initialState }) {
  this.state = initialState;
  console.log(this.state, "장바구니 컴포넌트");
  const $component = document.createElement("div");
  $component.className = "Cart";
  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () => {
    return this.state.reduce(
      (acc, item) =>
        acc + (item.productPrice + item.optionPrice) * item.quantity,
      0
    );
  };

  this.render = () => {
    $component.innerHTML = `
      <ul>
        ${this.state
          .map(
            (cartItem) => `
          <li class="Cart__item">
            <img src="${cartItem.imageUrl}"/>
            <div class="Cart__itemDesription">
              <div>${cartItem.productName} ${cartItem.optionName} ${
              cartItem.quantity
            }개</div>
              <div>${comma(
                cartItem.productPrice + cartItem.optionPrice
              )} 원</div>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
      <div class="Cart__totalPrice">총 상품가격 ${comma(
        this.getTotalPrice()
      )}원</div>
      <button class="OrderButton">주문하기</button>
      `;
  };

  this.render();

  $component.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      alert("주문 되었습니다!");
      removeItem("products_cart");
      routeChange("/web/");
    }
  });
}
