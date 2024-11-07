import React from "react";
import Image1 from "../assets/fedora1.jpg";
import Image2 from "../assets/fedora2.jpg";

export function Teeth() {
  return (
    <div>
      <h5>Fedora:</h5>
      <br />
      <br />
      <img src={Image1} className="d-inline-block align-text-top" />
      <br />
      <br />
      <img src={Image2} className="d-inline-block align-text-top" />
    </div>
  );
}
