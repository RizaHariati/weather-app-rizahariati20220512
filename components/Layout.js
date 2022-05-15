import Head from "next/head";
import React, { useState } from "react";
import { useGlobalContext } from "../context/appContext";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const { showSearchBar, closeSearchBar } = useGlobalContext();
  return (
    <>
      <Head>
        <title>The Weather Channel</title>
        <meta name="keywords" content="Riza About Page" />
      </Head>
      <div
        className=" relative "
        onWheel={() => {
          closeSearchBar();
        }}
      >
        <NavBar />
        <div className={showSearchBar ? " banner top-40 " : " banner top-20 "}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
