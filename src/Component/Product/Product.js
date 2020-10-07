import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    console.log(props);
    const {img, name, price, seller, stock, key} = props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
               <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
               <br/>
               <p><small>by: {seller}</small></p>
               <p>$:{price}</p>
               
               <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="main-btn">Add to cart</button>

                }
            </div>
        </div>
    );
};

export default Product;