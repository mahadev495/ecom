import React from "react";
import "./Button.css";
const Button = ({ num, click }) => {
  return (
    <button className="ui-change-btn" onClick={() => click(true)}>
      <div className="button-content">
        <img src="./src/assets/addCart.svg"  alt="cart" />
        <span>{num}</span>
        </div>
    </button>
    
  );
};

export default Button;
