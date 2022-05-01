const API_END_POINT =
  "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products";

export const request = async (productId) => {
  try {
    const result = await fetch(
      `${API_END_POINT}${productId ? `/${productId}` : ""}`
    );
    if (result.ok) {
      const json = await result.json();
      return json;
    }
  } catch (e) {
    console.log(e.message);
  }
};
