import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({ $target, initialState }) {
  this.state = initialState;
  const $productDetail = document.createElement("div");
  $productDetail.className = "ProductDetail";
  $target.appendChild($productDetail);

  let selectedOp = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    if (selectedOp) {
      // selectedOp에 값이 할당된 이후에 상태값 변경해주기
      selectedOp.setState({
        selectedOptions: this.state.selectedOptions,
      });
    }
  };

  this.render = () => {
    const { product } = this.state;
    console.log(product);
    // 상품 디테일 정보 보여주는 것까지
    $productDetail.innerHTML = `
      <img src="${product.imageUrl}">
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${product.price}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions
            .map(
              (option) =>
                `<option value="${option.id}" ${
                  option.stock === 0 ? "disabled" : ""
                }> ${option.stock === 0 ? "(품절) " : ""}
              ${product.name} ${option.name} ${
                  option.price === 0 ? "" : `(+${option.price}원)`
                }</option>`
            )
            .join("")}
        </select>
        <div class="ProductDetail__selectedOptions"></div>
      </div>
    `;
    // 선택한 옵션 목록 보여주기
    selectedOp = new SelectedOptions({
      $target: $productDetail.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      },
    });
  };

  this.render();

  // 옵션 선택하기 이벤트 달기
  $productDetail.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      const selectedOptionId = parseInt(e.target.value);
      const { product, selectedOptions } = this.state;
      console.log(product, selectedOptions);
      const option = product.productOptions.find(
        (option) => option.id === selectedOptionId
      ); // 얘는 방금 선택한 옵션
      const selectedOption = selectedOptions.find(
        (option) => option.optionId === selectedOptionId
      ); // 기존 선택된 옵션들 중 방금 선택한 애가 있는지 찾기

      if (option && !selectedOption) {
        // 이미 선택한 옵션이 아니므로 -> 선택한 옵션으로 추가하기
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];
        this.setState({
          ...this.state,
          selectedOptions: nextSelectedOptions,
        });
      }
    }
  });
}
