import React from 'react';
import tea01 from "../assets/tea01.jpg";
import tea02 from "../assets/tea02.jpg";
import tea03 from "../assets/tea03.jpg";
import tea04 from "../assets/tea04.jpg";
import tea05 from "../assets/tea05.jpg";
import tea06 from "../assets/tea06.jpg";
import tea07 from "../assets/tea07.jpg";
import tea08 from "../assets/tea08.jpg";
import tea09 from "../assets/tea09.jpg";
import cf01 from "../assets/cf01.webp";
import cf02 from "../assets/cf02.webp";
import cf03 from "../assets/cf03.webp";
import cf04 from "../assets/cf04.webp";
import cf05 from "../assets/cf05.webp";
import cf06 from "../assets/cf06.webp";
import cf07 from "../assets/cf07.webp";
import cf08 from "../assets/cf08.webp";
import cf09 from "../assets/cf09.webp";
import co01 from "../assets/co01.webp";
import co02 from "../assets/co02.jpg";
import TeaCard from '../menu-cards/Teacard';

const Menu = () => {
  return (
    <div className="p-4">
      {/* Tea Section */}
      <div className="mb-8">
        <h2 className="text-7xl ms-5 mt-24 font-bold mb-4">Tea</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <TeaCard id="tea01" imageUrl={tea01} name="Spiced Milk Tea" price={45} />
          <TeaCard id="tea02" imageUrl={tea02} name="Berry Lemon Tea" price={50} />
          <TeaCard id="tea03" imageUrl={tea03} name="Ginger Tea" price={40} />
          <TeaCard id="tea04" imageUrl={tea04} name="Honey Citrus Tea" price={55} />
          <TeaCard id="tea05" imageUrl={tea05} name="Cinnamon Berry Tea" price={50} />
          <TeaCard id="tea06" imageUrl={tea06} name="Rose Tea" price={48} />
          <TeaCard id="tea07" imageUrl={tea07} name="Raspberry Tea" price={52} />
          <TeaCard id="tea08" imageUrl={tea08} name="Green Tea" price={45} />
          <TeaCard id="tea09" imageUrl={tea09} name="Golden Milk Tea" price={60} />
        </div>
      </div>

      {/* Coffee Section */}
      <div className="mb-8">
        <h2 className="text-7xl ms-5 mt-5 font-bold mb-4">Coffee</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <TeaCard id="cf01" imageUrl={cf01} name="Espresso" price={60} />
          <TeaCard id="cf02" imageUrl={cf02} name="Double Espresso" price={70} />
          <TeaCard id="cf03" imageUrl={cf03} name="Short Macchiato" price={65} />
          <TeaCard id="cf04" imageUrl={cf04} name="Long Macchiato" price={68} />
          <TeaCard id="cf05" imageUrl={cf05} name="Ristretto" price={55} />
          <TeaCard id="cf06" imageUrl={cf06} name="Long Black" price={60} />
          <TeaCard id="cf07" imageUrl={cf07} name="Café Latte" price={75} />
          <TeaCard id="cf08" imageUrl={cf08} name="Cappuccino" price={80} />
          <TeaCard id="cf09" imageUrl={cf09} name="Flat White" price={78} />
        </div>
      </div>

      {/* Snacks Section */}
      <div className="mb-8">
        <h2 className="text-7xl ms-5 mt-5 font-bold mb-4">Snacks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <TeaCard id="co01" imageUrl={co01} name="Dark chocolate" price={30} />
          <TeaCard id="co02" imageUrl={co02} name="Milk chocolate" price={28} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
