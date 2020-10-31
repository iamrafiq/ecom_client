import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCount: 0,
    products: [{}],
  },
  reducers: {
    addItem: (state, action) => {
      console.log("add item 1", state.products);
      let cartProduct = state.products.find(
        (p) => p.product && p.product._id === action.payload.product._id
      );
      console.log("cart Product", cartProduct);

      if (cartProduct === undefined) {
        console.log("add item2", "push");

        state.products.push({
          product: action.payload.product,
          qtyCart: 1,
        });
        console.log("add item3", state.products);
      } else {
        cartProduct.qtyCart++;
      }
      state.productCount++;
    },
    removeItem: (state, action) => {
      let product = state.products.find(
        (p) => p.product && p.product._id === action.payload.product._id
      );
      console.log("deleteing proeuct", product)
      if (product === undefined) return;
      if (product.qtyCart === 1) {
        var index = state.products.indexOf(product);
        state.products.splice(index, 1);
        state.productCount--;
      } else {
        product.qtyCart--;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const selectCartProducts = (state) => state.cart.products;
export const selectAcartProduct = (product) => (state) => {
  return state.cart.products.find(
    (p) => p.product && p.product._id === product._id
  );
};

export const selectCartCount = (state) => state.cart.itemCount;
export default cartSlice.reducer;
