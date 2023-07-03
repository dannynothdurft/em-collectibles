"use client";
import React from "react";
import "@/components/del-button/style.scss";

function DelButton({ onClick, small }) {
  const buttonClass = small ? "delete-button small" : "delete-button";

  return (
    <button onClick={onClick} className={buttonClass}>
      ␡
    </button>
  );
}

export default DelButton;
