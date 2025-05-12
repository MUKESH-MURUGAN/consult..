import React from "react";

const About = () => {
  return (
    <div className="pt-20 bg-gray-100 min-h-screen px-4">
      {/* About Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <h2 className="text-4xl font-bold text-center mb-4">ABOUT US</h2>
        <p className="text-center mb-6 text-gray-700">
          Welcome to TASTE IT – the perfect place to unwind and sip on the finest teas in town. 
          Established in the heart of the Kongu region, we are passionate about bringing traditional 
          and innovative tea blends to your cup.
        </p>
        <p className="text-center text-gray-600">
          From the aromatic ginger-cardamom tea to classic Indian chai, every cup is brewed with 
          love and care. Whether you’re catching up with friends or taking a break from work, our 
          shop is designed to offer comfort, flavor, and a warm atmosphere.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">Contact Us</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700">📍 Address</h4>
            <p className="text-gray-600">123 Tea Street, Kongu Area, Tamil Nadu, India</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">📞 Phone</h4>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">📧 Email</h4>
            <p className="text-gray-600">tasteittea@gmail.com</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">🕒 Hours</h4>
            <p className="text-gray-600">Mon - Sun: 7 AM - 10 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
