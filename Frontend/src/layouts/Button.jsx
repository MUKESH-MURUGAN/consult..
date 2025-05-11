import React from "react";

const Button = (props) => {
  return (
    <a href="/login">
      <button className="px-6 py-1 border-2 border-white bg-[#FFDCAB] hover:text-[#AB6B2E] transition-all rounded-full">
        {props.title}
      </button>
    </a>
  );
};

export default Button;
