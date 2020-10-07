import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';


const Review = () => {
    const [cart, setCart] = useState([])


    const removeProduct = (productKey) => {
        console.log("hello", productKey);
        const newCart = cart.filter(pd =>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        
        setCart(cartProducts);
    }, [])
    return (
        <div className="twin-container">
           
           <div className="product-container">
           {
                cart.map(pd => <ReviewItem
                     product={pd}
                     removeProduct= {removeProduct}
                     key={pd.key}
                     ></ReviewItem>)
            }
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
               <Link to="/">
                    <button className="main-btn">Place Order</button>
                </Link>
               </Cart>

           </div>
        </div>
    );
};

export default Review;