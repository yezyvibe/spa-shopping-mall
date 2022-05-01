import ProductDetail from "../components/ProductDetail.js";
import { request } from "../utils/api.js";

export default function ProductDetailPage({ $target, productId }) {
  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  $page.innerHTML = "<h1>상품 정보</h1>";

  this.state = {
    productId,
    product: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state.product) {
      $target.innerHTML = "Loading..";
    } else {
      $target.innerHTML = "";
      $target.appendChild($page);

      new ProductDetail({
        $target,
        initialState: {
          product: this.state.product,
          selectedOptions: [],
        },
      });
    }
  };
  this.fetchProductDetail = async () => {
    const { productId } = this.state;
    const result = await request(productId);
    this.setState({
      ...this.state,
      product: result,
    });
  };

  this.fetchProductDetail();
}
