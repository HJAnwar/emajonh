import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, key, price} = props.product;
    return (
        <div>
            <h4>{name} </h4>
            <p>quantity: {quantity} </p>
            <p>price: {price}</p>
            <br/>
            <button
             onClick={ () =>props.removeProduct(key)}
             className="main-btn"
              > Remove</button>
        </div>
    );
};

export default ReviewItem;