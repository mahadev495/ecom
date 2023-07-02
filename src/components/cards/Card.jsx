import React, { useEffect } from "react";
import "./Card.css";
// import { AddRemoveBtn } from "../addremoveBtn/AddRemoveBtn";
import { useState } from "react";
const Card = ({ product, addItem, removeItem, addedItems }) => {
  const [isAdded, setIsAdded] = useState(true);
  const item = addedItems.filter((addedItem) => addedItem.id == product.id);
  useEffect(() => {
    item.length == 0 ? setIsAdded(true) : setIsAdded(false);
  }, [item]);

  // console.log(item);
  return (
    <div className="card">
      <h2>{product.category}</h2>
      <img className="card__img" src={product.image} alt="" />
      <div>
        
        <h4 className="card-title">{product.title}</h4>
        {/* <p>{product.description}</p> */}
      </div>
      <div className="card-price-add">
        <span className="card-price">Price : ${product.price}</span>
        <button
          className={isAdded ? "add-item-btn" : "remove-item-btn"}
          onClick={() => {
            isAdded ? addItem(product) : removeItem(product);
            setIsAdded(!isAdded);
          }}
        >
          {isAdded ? "ADD " : "CANCEL"}
        </button>
      </div>
    </div>
  );
};

export default Card;
