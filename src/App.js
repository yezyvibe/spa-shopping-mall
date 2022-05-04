import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";
import { init } from "./utils/router.js";

export default function App($target) {
  // 라우팅 먼저 -> window.location 객체 활용하기

  this.route = () => {
    const { pathname } = window.location;
    $target.innerHTML = ""; //라우팅될 때마다 화면 초기화
    if (pathname === "/web/") {
      // 상품목록페이지 렌더링
      new ProductListPage($target).render();
    } else if (pathname.substring(0, 14) === "/web/products/") {
      const [, , , productId] = pathname.split("/");
      new ProductDetailPage({
        $target,
        productId,
      }).render();
    } else if (pathname === "/web/cart") {
      new CartPage($target).render();
    }
  };

  init(this.route);
  this.route();
}
