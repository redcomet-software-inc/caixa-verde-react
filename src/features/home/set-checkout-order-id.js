/* Checkout Utility */
export const setCheckoutOrderId = (order_id) => {
    this.setState({checkout_order_id: order_id});
    localStorage.setItem("checkout_order_id", order_id);
}