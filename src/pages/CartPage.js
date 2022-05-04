import Cart from "../components/Cart.js";
import { routeChange } from "../utils/router.js";
import { request } from "../utils/api.js ";
import { getItem } from "../utils/localStorage.js";

export default function CartPage($target) {
  const $page = document.createElement("div");
  $page.className = "CartPage";
  $page.innerHTML = "<h1>장바구니</h1>";

  const cartData = getItem("products_cart", []);
  this.state = {
    products: null,
  };
  let cartComponent = null;

  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니가 비어있습니다. 상품을 담아주세요.");
      routeChange("/web/");
    } else {
      $target.appendChild($page);
      if (this.state.products && !cartComponent) {
        // 컴포넌트 없을 때만 일회성으로 생성 -> 장바구니에 담긴 상품이 바뀌면 바로 적용되나?
        cartComponent = new Cart({
          $target: $page,
          initialState: this.state.products,
        });
        cartComponent.render();
      }
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await request(cartItem.productId);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartItem.optionId
        );

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          productPrice: product.price,
          quantity: cartItem.quantity,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );

    this.setState({ ...this.state, products: products });
  };

  this.fetchProducts();
}
