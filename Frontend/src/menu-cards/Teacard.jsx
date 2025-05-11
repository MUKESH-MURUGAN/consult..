import React from "react";

const TeaCard = ({ id, imageUrl, name }) => {
  return (
    <div key={id} className="w-64 rounded overflow-hidden shadow-lg m-4"> 
      <img className="w-full" src={imageUrl} alt={name} />
      <div className="px-6 py-4 bg-gray-200">
        <div className="font-bold text-xl mb-2  text-center">{name}</div>
      </div>
    </div>
  );
};

export default TeaCard;

