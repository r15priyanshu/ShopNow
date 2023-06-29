import React from "react";
import BaseComponent from "../components/BaseComponent";

function About() {
  console.log("about.js rendered");
  return (
    <BaseComponent>
      <div className="About container mt-2" style={{ minHeight: "500px",textAlign:"justify" }}>
        <p>Welcome to <span className="fw-bold">ShopNow!</span></p>
        <p>
          At ShopNow, we are passionate about providing you with the best online
          shopping experience. We understand that shopping for products should
          be convenient, reliable, and enjoyable, and that's why we've built our
          platform with your needs in mind.
        </p>
        <p>
          Our mission is to bring you a wide range of high-quality products from
          various categories, all in one place. Whether you're looking for the
          latest fashion trends, electronics, home decor, or unique gifts,
          ShopNow has got you covered. We partner with trusted suppliers and
          brands to ensure that every product we offer meets our strict quality
          standards.
        </p>
        <p>
          We believe in making your shopping journey seamless and hassle-free.
          Our user-friendly website and mobile app allow you to browse, compare,
          and purchase products with ease. We provide detailed product
          descriptions, images, and customer reviews to help you make informed
          decisions. Plus, our secure payment gateway ensures that your personal
          and financial information is always protected.
        </p>
        <p>
          Customer satisfaction is our top priority. Our dedicated customer
          support team is available to assist you with any inquiries, concerns,
          or feedback you may have. We strive to provide prompt and helpful
          assistance to ensure that your shopping experience at ShopNow is
          nothing short of exceptional.
        </p>
        <p>
          We also value your trust and privacy. At ShopNow, we adhere to strict
          data protection measures and employ industry-standard security
          protocols to safeguard your information. Your personal details are
          handled with care and only used for order processing and delivery
          purposes.
        </p>
        <p>
          Thank you for choosing ShopNow. We appreciate your support and look
          forward to serving you with the best products and service. Happy
          shopping!
        </p>
      </div>
    </BaseComponent>
  );
}

export default About;
