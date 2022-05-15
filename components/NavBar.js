import Link from "next/link";
import React, { useState } from "react";
import { useGlobalContext } from "../context/appContext";
import { useRouter } from "next/router";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();
  const {
    showSearchBar,
    closeSearchBar,
    openSearchBar,
    locationKey,
    getLocationKey,
    locationList,
    getSelectedLocation,
    todaysWeather,
  } = useGlobalContext();

  const handleChange = (e) => {
    e.preventDefault();
    getLocationKey(e.target.value);
  };

  const handleSubmit = (e, locationList) => {
    e.preventDefault();

    if (locationList.length > 0) {
      const { name, state, country, lat, lon } = locationList[0];
      getSelectedLocation({ lat, lon, name, state, country });
      setTimeout(() => {
        router.push(`/city`);
      }, 500);
    }
  };
  return (
    <nav className="fixed w-full">
      {/* search bar */}
      <div
        className={
          showSearchBar ? "upperBar h-20" : "upperBar h-0 overflow-hidden"
        }
      >
        <div className="flex items-center space-x-6 ">
          <Link href="/">
            <button className=" w-16 h-16 bg-white ">
              <h3 className="text-clrPrimaryDark text-sm leading-3 p-1 pt-6 narrow-font font-bold">
                The Weather Channel
              </h3>
            </button>
          </Link>

          <h3 className="text-xl text-white">
            An <span>IBM </span> Business
          </h3>
        </div>

        <div className="relative w-80 h-9">
          <form
            className=" w-80 h-9 mx-auto rounded-md bg-clrPrimaryLight flex focus-within:ring-1 focus-within:ring-white"
            onSubmit={(e) => handleSubmit(e, locationList)}
          >
            <input
              placeholder="Select City.."
              className="w-10/12 bg-transparent pl-2 focus-within:bg-clrAccentDark transition-all focus-within:ring-0 focus-within:border0 text-white font-medium capitalize"
              value={locationKey}
              onChange={(e) => handleChange(e)}
            />

            {locationList.length > 0 && (
              <div className="transition all bg-white absolute top-10 rounded-md shadow-md left-0 w-80  p-2">
                {locationList.map((item, index) => {
                  const { name, state, country, lat, lon } = item;
                  return (
                    <button
                      key={index}
                      className={
                        locationList.length === 1
                          ? " search-list-btn"
                          : " search-list-btn border-b-2 border-b-slate-200"
                      }
                      onClick={() => {
                        getSelectedLocation({ lat, lon, name, state, country });
                        setTimeout(() => {
                          router.push(`/city`);
                        }, 500);
                      }}
                    >
                      <p>{name}</p>
                      {state && <p>, {state}</p>}
                      {country && <p>, {country}</p>}
                    </button>
                  );
                })}
              </div>
            )}

            <button
              type="submit"
              className="w-2/12 hover:bg-clrAccentDark transition-all "
            >
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </button>
          </form>
        </div>
        <button
          className=" ml-auto"
          onClick={() => {
            closeSearchBar();
          }}
        >
          <i className="fa-solid fa-chevron-up text-white text-xl"></i>
        </button>
      </div>

      {/* location bar */}
      <div className="bg-clrPrimaryLight w-full h-10 flex items-center justify-start px-24 space-x-1 text-white">
        {todaysWeather && (
          <>
            <Image
              src={`http://openweathermap.org/img/w/${todaysWeather.weatherIcon}.png`}
              alt={todaysWeather.weatherMain}
              width={40}
              height={40}
              className={" mix-blend-screen mr-2 "}
            />
            <h2 className="font-sans">
              {`87`} &#8451;
              {`, ${todaysWeather.name}, ${todaysWeather.state || ""}, ${
                todaysWeather.country
              }`}
            </h2>
          </>
        )}
      </div>

      {/* navigation bar */}
      <div className="bg-clrPrimaryDark w-full h-10 flex items-center justify-between p-0 px-6 space-x-1 text-white transition-all">
        <div className="flex h-full ">
          <Link href={!todaysWeather ? "/" : `/city`}>
            <p className="w-32 h-full transition-all  cursor-pointer hover:border-b-white hover:border-b-4 pt-2 text-center ">
              Today
            </p>
          </Link>

          <Link href="/">
            <p className="w-32 h-full transition-all pt-2 text-center ">
              Hourly
            </p>
          </Link>

          <Link href={!todaysWeather ? "/" : `/tendays`}>
            <p className="w-32 h-full transition-all cursor-pointer hover:border-b-white hover:border-b-4 pt-2 text-center ">
              10 days
            </p>
          </Link>

          <Link href="/">
            <p className="w-32 h-full transition-all pt-2 text-center ">
              Weekend
            </p>
          </Link>

          <Link href="/">
            <p className="w-32 h-full transition-all pt-2 text-center ">
              Monthly
            </p>
          </Link>

          <Link href="/">
            <p className="w-32 h-full transition-all pt-2 text-center ">
              Radar
            </p>
          </Link>

          <Link href="/">
            <div className="flex items-center w-32 h-full transition-all justify-center">
              <i className="fa-solid fa-video"></i>
              <p className="ml-2 ">Video</p>
            </div>
          </Link>
        </div>
        {!showSearchBar && (
          <button
            className=" w-36 flex h-full items-center  justify-center transition-all hover:opacity-80 border-l-2 border-l-clrPrimaryLight pl-3"
            onClick={() => {
              openSearchBar();
            }}
          >
            <p className="mr-4">Search City</p>
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
