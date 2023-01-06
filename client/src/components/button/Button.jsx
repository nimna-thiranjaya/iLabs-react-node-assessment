import React from "react";
import "./button.css";

const Button = ({ icon, text, ...buttonProps }) => {
  return (
    <button className="addbutton" type="button" {...buttonProps}>
      <span className="icon">{icon}</span> {text}
    </button>
  );
};

export default Button;
