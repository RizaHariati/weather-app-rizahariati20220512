import React from "react";
import { useGlobalContext } from "../context/appContext";

const Footer = () => {
  const { showSearchBar } = useGlobalContext();
  return (
    <div className={showSearchBar ? "footerBar h-10" : "footerBar h-0"}>
      <p>copyright RizaHariati &#169;2022</p>{" "}
    </div>
  );
};

export default Footer;
