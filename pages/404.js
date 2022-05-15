import React, { useState } from "react";
import { useGlobalContext } from "../context/appContext";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="main-container" style={{ height: "88vh" }}>
      <h1 className="text-4xl font-semibold">Page Not Found |404</h1>
      <Link href="/">
        <button className="btn ">return home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
