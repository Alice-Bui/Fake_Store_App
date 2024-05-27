// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'orderData',
    initialState: {
        orders: [],
        new: {value: false, icon: 'caret-up'},
        paid: {value: false, icon: 'caret-up'},
        delivered: {value: false, icon: 'caret-up'}
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.orders.forEach((order) => {
                order.showList = {value: false, icon: 'caret-up'}
                order.showDetails = {value: false, icon: 'caret-up'}
                if (order.is_delivered == 1) {
                    order.status = 'delivered'
                } else if (order.is_paid == 1) {
                    order.status = 'paid'
                } else {
                    order.status = 'new'
                }
            })
            console.log(state.orders)
        },
        displayStatus: (state, action) => {
            const selectStatus = action.payload
            state[selectStatus] = state[selectStatus].value === false
                ? {value: true, icon: 'caret-down'}
                : {value: false, icon: 'caret-up'}
            state.orders.forEach(order => {
                if (order.status === selectStatus) {
                    order.showList = {
                        value: state[selectStatus].value,
                        icon: state[selectStatus].icon
                    };
                }
            });
        },

        // for each single order
        displayOrder: (state, action) => {
            const selectOrder = state.orders.find(o => o.id === action.payload.id);
            selectOrder.showDetails = selectOrder.showDetails.value === false
                ? {value: true, icon: 'caret-down'}
                : {value: false, icon: 'caret-up'}
            console.log(typeof selectOrder.order_items)
            console.log(typeof selectOrder)
        },

        updatePaidStatus: (state, action) => {
            const selectOrder = state.orders.find(o => o.id === action.payload.id);
            selectOrder.is_paid = 1
            selectOrder.is_delivered = 0
            selectOrder.status = 'paid'
        },

        updateDeliveredStatus: (state, action) => {
            const selectOrder = state.orders.find(o => o.id === action.payload.id);
            selectOrder.is_paid = 1
            selectOrder.is_delivered = 1
            selectOrder.status = 'delivered'
        }
    },
});

export const { setOrders, displayStatus, displayOrder, updatePaidStatus, updateDeliveredStatus } = orderSlice.actions;
export const selectOrders = (state) => state.orderData.orders;
export const selectNew = (state) => state.orderData.new
export const selectPaid = (state) => state.orderData.paid
export const selectDelivered = (state) => state.orderData.delivered

export default orderSlice.reducer