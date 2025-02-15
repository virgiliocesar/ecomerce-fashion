import { configureStore } from "@reduxjs/toolkit"

import cartRedux from "./features/cart/cartSlice"

export const store = configureStore({
    reducer: {
      cart: cartRedux
  },
});
