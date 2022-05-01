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
              ${option.optionName} ${product.price + option.optionPrice}원
              <div><input type="number" value="${option.quantity}" />개</div>
            </li>
          `
            )
            .join("")}
        </ul>
        <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
        <button class="OrderButton">주문하기</button>
      `;
    }
  };
  this.render();

  // 선택 수량 변경하기
}
