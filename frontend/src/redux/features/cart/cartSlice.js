import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotalPrice: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((products) => products._id === action.payload.id);

            if (!isExist) {
                state.products.push({...action.payload, quantity: 1});
            } else {
                console.log("items already added");
            }

            state.selectedItems = setSectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotalPrice = setGrandTotal(state);


        },
    },
});


export const setSectedItems = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity);
})
export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price);
})

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
    return setTotalPrice(state) + setTotalPrice(state) + state.taxRate;
};

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;