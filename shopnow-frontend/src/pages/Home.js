import React, { useState } from "react";

import BaseComponent from "../components/BaseComponent";
import CarouselComponent from "../components/CarouselComponent";

import ashley from "../images/brands/ashley.jpg";
import samsung from "../images/brands/samsung.png";
import oppo from "../images/brands/oppo.jpg";
import godrej from "../images/brands/godrej.jpg";
import steelcase from "../images/brands/steelcase.jpeg";
import lego from "../images/brands/lego.png";
import hp from "../images/brands/hp.jpg";
import ciftoys from "../images/brands/ciftoys.png";

import laptop from "../images/carousel/laptop.JPG";
import galaxy from "../images/carousel/galaxy.JPG";
import techno from "../images/carousel/techno.JPG";
import iphone from "../images/carousel/iphone.JPG";
import oneplus from "../images/carousel/oneplus.JPG";
import redmi from "../images/carousel/redmi.JPG";

function Home() {
  console.log("home.js rendered");
  const brandsImages = [
    { id: 1, image: ashley, text: "ashley logo" },
    { id: 2, image: oppo, text: "oppo logo" },
    { id: 3, image: godrej, text: "godrej logo" },
    { id: 4, image: steelcase, text: "steelcase logo" },
    { id: 5, image: lego, text: "lego logo" },
    { id: 6, image: samsung, text: "samsung logo" },
    { id: 7, image: hp, text: "hp logo" },
    { id: 8, image: ciftoys, text: "ciftoys" },
  ];

  const carouselitems1 = [
    {
      src: laptop,
      altText: "laptop",
      caption: "",
      key: 1,
    },
    {
      src: galaxy,
      altText: "galaxy",
      caption: "",
      key: 2,
    },
    {
      src: techno,
      altText: "techno",
      caption: "",
      key: 3,
    },
  ];

  const carouselitems2 = [
    {
      src: iphone,
      altText: "iphone",
      caption: "",
      key: 1,
    },
    {
      src: oneplus,
      altText: "oneplus",
      caption: "",
      key: 2,
    },
    {
      src: redmi,
      altText: "redmi",
      caption: "",
      key: 3,
    },
  ];

  const brands = brandsImages.map((brand) => {
    return (
      <div
        className="col-md-3 d-flex justify-content-center align-items-center mt-5"
        key={brand.id}
      >
        <img
          src={brand.image}
          alt={brand.text}
          className="img-fluid"
          height="230px"
          width="230px"
        />
      </div>
    );
  });
  return (
    <BaseComponent>
      <div className="Home" style={{minHeight:"500px"}}>
        <div>
          <h2 className="text-center fw-bold text-primary mt-3">WELCOME TO SHOP-NOW</h2>
        </div>
        <div className="row" style={{marginLeft:"0px",marginRight:"0px"}}>
          <div className="col-md-6">
            <CarouselComponent items={carouselitems1} />
          </div>
          <div className="col-md-6">
            <CarouselComponent items={carouselitems2} />
          </div>
        </div>
        <div>
          <h2 className="text-center fw-bold">FEATURED BRANDS</h2>
        </div>
        <div className="row" style={{marginLeft:"0px",marginRight:"0px"}}>{brands}</div>
      </div>
    </BaseComponent>
  );
}
export default Home;
