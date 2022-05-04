import { getItem, setItem } from "../utils/localStorage.js";
import { routeChange } from "../utils/router.js";
import { comma } from "../utils/comma.js";

export default function selectedOptions({ $target, initialState }) {
  this.state = initialState;
  const $component = document.createElement("div");
  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 전체 금액 계산하기
  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;
    return selectedOptions.reduce(
      (acc, option) =>
        acc + (productPrice + option.optionPrice) * option.quantity,
      0
    ); // 이전값+현재값, 초기값 순서로 적음
  };

  this.render = () => {
    const { product, selectedOptions } = this.state;

    if (product && selectedOptions) {
      $component.innerHTML = `
        <h3>선택된 상품</h3>
        <ul>
          ${selectedOptions
            .map(
              (option) => `
            <li>
              ${option.optionName} ${comma(
                product.price + option.optionPrice
              )}원
              <div><input class="quantity-input" data-option-id="${
                option.optionId
              }" type="number" value="${option.quantity}" />개</div>
            </li>
          `
            )
            .join("")}
        </ul>
        <div class="ProductDetail__totalPrice">${comma(
          this.getTotalPrice()
        )}원</div>
        <button class="OrderButton">주문하기</button>
      `;
    }
  };
  this.render();

  // 선택 수량 변경하기
  $component.addEventListener("change", (e) => {
    try {
      if (e.target.className === "quantity-input") {
        const nextQuantity = parseInt(e.target.value);
        const nextSelectedOptions = [...this.state.selectedOptions];
        if (typeof nextQuantity === "number") {
          const { product } = this.state;
          const optionId = parseInt(e.target.dataset.optionId); //옵션 아이디 찾기
          const option = product.productOptions.find(
            (option) => option.id === optionId
          ); //상품 전체 옵션 목록 중 내가 선택한 애 찾기
          const selectedOptionIndex = nextSelectedOptions.findIndex(
            (selectedOption) => selectedOption.optionId === optionId
          ); // 선택했던 옵션 목록 중 내가 선택한 옵션의 인덱스 위치 찾기
          nextSelectedOptions[selectedOptionIndex].quantity =
            option.stock >= nextQuantity ? nextQuantity : option.stock;
          this.setState({
            ...this.state,
            selectedOptions: nextSelectedOptions,
          });
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  });
  // 주문하기 이벤트 달기 상품 옵션은 this.state.selectedOptions에 담겨 있다
  $component.addEventListener("click", (e) => {
    const orderButton = e.target.closest("button");
    const { selectedOptions } = this.state;
    if (orderButton) {
      const cartData = getItem("products_cart", []);
      setItem(
        "products_cart",
        cartData.concat(
          selectedOptions.map((option) => ({
            productId: option.productId,
            optionId: option.optionId,
            quantity: option.quantity,
          }))
        )
      );
      // alert("장바구니에 담겼습니다!")
      routeChange("/web/cart");
    }
  });
}
