import { routeChange } from "../utils/router.js";
import { comma } from "../utils/comma.js";

export default function ProductList({ $target, initialState }) {
  this.state = initialState; // state에는 상품 목록이 객체 배열로 담겨 있다.
  const $productList = document.createElement("ul");
  // $page.className = "productList";
  $target.appendChild($productList);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $productList.innerHTML = `
    ${
      this.state &&
      this.state
        .map(
          (product) => `
      <li class="Product" data-product-id="${product.id}">
        <img src=${product.imageUrl}>
          <div class="Product__info">
            <div>${product.name}</div>
            <div>${comma(product.price)}원 ~</div>
          </div>
      </li>
    `
        )
        .join("")
    }`;
  };
  this.render();

  // 이벤트 달기
  $productList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { productId } = $li.dataset;
    if (productId) {
      routeChange(`/web/products/${productId}`); // url 변경해주는 함수
    }
  });
}
