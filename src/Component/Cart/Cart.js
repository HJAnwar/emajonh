import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, pd) => total + pd.price , 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;

    }
    let shipping = 0;

    if (total > 35) {
        shipping = 0;
    }
    else if (total > 35) {
        shipping = 4;
    }
    else if (total > 0) {
        shipping = 12;
    }
    const tax = (total / 10).toFixed(2);

    const totalPrice = (total + shipping + Number(tax)).toFixed(2)


    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }

    return (
        <div>

            <h4>Oredr Summary</h4>
            <h5>Item Order {cart.length}</h5>
            <h5>shipping cost : {shipping}</h5>
            <p> product price {formatNumber(total)} </p>
            <h5>Vat : {tax}</h5>
            <p>total Price: {totalPrice}</p>
            <br />
            {
                props.children
            }

        </div>
    );
};

export default Cart;