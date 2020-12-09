import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productCount: 0,
    products: [],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      let cartProduct = state.products.find(
        (p) => p.product && p.product._id === action.payload.product._id
      );

      if (cartProduct === undefined) {

        state.products.push({
          product: action.payload.product,
          qtyCart: 1,
        });
        state.productCount++;

        if (action.payload.product.applyDiscounts) {
          state.totalAmount += action.payload.product.cropPrice;
        } else {
          state.totalAmount += action.payload.product.mrp;
        }
      } else {
        cartProduct.qtyCart++;
        if (cartProduct.product.applyDiscounts) {
          state.totalAmount += cartProduct.product.cropPrice;
        } else {
          state.totalAmount += cartProduct.product.mrp;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));

    },
    removeItem: (state, action) => {
      let product = state.products.find(
        (p) => p.product && p.product._id === action.payload.product._id
      );
      if (product === undefined) return;
      if (product.qtyCart === 1) {
        var index = state.products.indexOf(product);
        state.products.splice(index, 1);
        state.productCount--;
        product.qtyCart--;
      } else {
        product.qtyCart--;
      }
      if (product.product.applyDiscounts) {
        state.totalAmount -= product.product.cropPrice;
      } else {
        state.totalAmount -= product.product.mrp;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteItem: (state, action) => {
      let product = state.products.find(
        (p) => p.product && p.product._id === action.payload.product._id
      );
      if (product === undefined) return;

      if (product.product.applyDiscounts) {
        state.totalAmount -= product.qtyCart * product.product.cropPrice;
      } else {
        state.totalAmount -= product.qtyCart * product.product.mrp;
      }

      product.qtyCart = 0;
      var index = state.products.indexOf(product);
      state.products.splice(index, 1);
      state.productCount--;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    loadCartFromLocalstroage:(state, action)=>{
      state.productCount = action.payload.cart.productCount;
      state.products = action.payload.cart.products;
      state.totalAmount = action.payload.cart.totalAmount;

    },
    emptyCart:(state, action) =>{
      localStorage.removeItem("cart");
      state.productCount = 0;
      state.products = [];
      state.totalAmount = 0;

    }
  },
});

export const { addItem, removeItem, deleteItem, loadCartFromLocalstroage, emptyCart } = cartSlice.actions;
export const selectCartProducts = (state) => state.cart.products;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export const selectAcartProduct = (product) => (state) => {
  return state.cart.products.find(
    (p) => p.product && p.product._id === product._id
  );
};

export const selectCartCount = (state) => state.cart.productCount;
export default cartSlice.reducer;
