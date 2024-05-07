import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action){
            state.push(action.payload)
        },
        remove(state, action){
            return state.filter(item => item.idProduct !== action.payload)
        },
        update(state, action){
            return state.map((item) => (item.idProduct === action.payload.idProduct ? ({...item, 'quantity': action.payload.newQuantity}): item))
        },
        removeAll(state, action){
            return []
        }
    }
});

export const {add, remove, update, removeAll} = cartSlice.actions;
export default cartSlice.reducer;