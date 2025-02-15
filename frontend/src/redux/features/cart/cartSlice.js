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
            const isExist = state.products.find((product) => product.id === action.payload.id);
            // console.log(isExist);
            if (!isExist) {
                state.products.push({...action.payload, quantity: 1});
            } else {
                console.log("items already added");
                isExist.quantity += 1;
            }

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotalPrice = setGrandTotal(state);


        },
    },
});


export const setSelectedItems = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity);
},0)
export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price);
},0)

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
    return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
};

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;