class Order {
    constructor(cart, userData, status = 'pending', date, orderId ) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = date;
        this.formattedDate = this.date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        this.orderId = orderId
    };
};


module.exports = Order