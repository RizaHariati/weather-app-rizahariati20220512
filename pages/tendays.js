import React from "react";
import { useState } from "react";
import Router from "next/router";
import { useGlobalContext } from "../context/appContext";
import Image from "next/image";

const TenDays = () => {
  const { dailyWeather, todaysWeather } = useGlobalContext();
  console.log(dailyWeather);
  const [selected, setSelected] = useState(null);

  const toggle = (id) => {
    if (selected === id) {
      return setSelected(null);
    } else {
      setSelected(id);
    }
  };

  if (dailyWeather && todaysWeather) {
    console.log(dailyWeather);
    return (
      <div className="main-container h-fit">
        <div className=" max-w-screen-md h-full bg-white rounded-md space-y-5 p-5 mx-auto">
          {/* title */}
          <div>
            <h2 className="font-bold text-xl">
              10 Day Weather -
              <span className="font-medium text-base">
                {` ${todaysWeather.name}, ${todaysWeather.state || ""}, ${
                  todaysWeather.country
                }`}
              </span>
            </h2>
            <p>{`as of ${todaysWeather.timeNow} WIB`}</p>
          </div>

          {dailyWeather.map((weather, index) => {
            return (
              <div className=" relative" key={index}>
                <button
                  onClick={() => toggle(index)}
                  className="absolute text-xl right-0 top-0 hover: text-blue-700"
                >
                  <i
                    className={
                      selected === index
                        ? "fa-solid fa-angle-up text-clrButton"
                        : "fa-solid fa-angle-down text-clrButton"
                    }
                  ></i>
                </button>
                {selected != index && <Today weather={weather} />}
                {selected === index && <DayAndNight weather={weather} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      Router.push("/");
    }, 2000);
    return (
      <div
        onClick={() => {
          clearList();
        }}
        className="main-container"
        style={{ height: "88vh" }}
      >
        <h1 className="text-4xl font-semibold">Loading</h1>
      </div>
    );
  }
};

export default TenDays;

const Today = ({ weather }) => {
  const {
    day,
    tempMax,
    tempMin,
    dailyIcon,
    dailyDescription,
    dailyMain,
    wind_speed,
    rain,
  } = weather;
  return (
    <div
      className=" grid w-full space-x-1  py-5 border-b-2 border-b-slate-200 items-center"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 2.5fr 1fr 2fr",
      }}
    >
      <p>{day}</p>
      <h3 className="font-sans font-bold text-lg">
        {tempMax} &#8451;
        <span className=" font-normal text-base">/{tempMin} &#8451;</span>
      </h3>
      <div className="flex items-center">
        <Image
          src={`http://openweathermap.org/img/w/${dailyIcon}.png`}
          alt={dailyMain}
          className="mr-5"
          width={40}
          height={40}
        />
        <p>{dailyDescription}</p>
      </div>
      <div className="flex items-center  ">
        <i className="fa-solid fa-cloud-rain text-clrButton "></i>
        <p className="ml-2">{rain}%</p>
      </div>
      <div className="flex items-center  ">
        <i className="fa-solid fa-wind  text-clrButton"></i>
        <p className="ml-2">W {wind_speed} mph</p>
      </div>
    </div>
  );
};

const DayAndNight = ({ weather }) => {
  const { tempDay, tempNight, moonrise, moonset, sunrise, sunset } = weather;
  return (
    <div className=" grid w-full grid-cols-1 md:grid-cols-2 space-x-5 py-5 border-b-2 border-b-slate-200">
      {/*  day */}
      <DayNightDetails
        time="Day"
        weather={weather}
        rise="Sunrise"
        riseValue={sunrise}
        set="Sunset"
        setValue={sunset}
        temp={tempDay}
      />

      {/* night */}
      <DayNightDetails
        time="Night"
        weather={weather}
        rise="Moonrise"
        riseValue={moonrise}
        set="Moonset"
        setValue={moonset}
        temp={tempNight}
      />
    </div>
  );
};

const DayNightDetails = ({
  time,
  weather,
  rise,
  riseValue,
  set,
  setValue,
  temp,
}) => {
  const {
    day,
    dailyIcon,
    dailyMain,
    rain,
    wind_speed,
    tempMax,
    dailyDescription,
    uvi,
    humidity,
  } = weather;
  return (
    <div className="space-y-3">
      <p className="font-semibold">
        {day} <span>| {time}</span>
      </p>
      <div className=" w-full flex justify-between items-center">
        <h2 className="font-sans font-bold text-4xl">{temp} &#8451;</h2>
        <Image
          src={`http://openweathermap.org/img/w/${dailyIcon}.png`}
          alt={dailyMain}
          width={70}
          height={70}
        />
        <div>
          <div className="flex items-center  ">
            <i className="fa-solid fa-cloud-rain text-clrButton "></i>
            <p className="ml-2">{rain}%</p>
          </div>
          <div className="flex items-center  ">
            <i className="fa-solid fa-wind  text-clrButton"></i>
            <p className="ml-2">W {Math.floor(wind_speed)} mph</p>
          </div>
        </div>
      </div>
      <p className="leading-4 capitalize ">
        {` ${dailyDescription}. High ${tempMax}C. Winds N
        at ${Math.floor(wind_speed)} to ${Math.ceil(
          wind_speed
        )} mph. Chance of rain ${rain}%`}
      </p>
      <div className="px-5 border-2 border-x-slate-200 rounded-md">
        <div className="flex py-3 justify-between ">
          <div className="flex items-center w-full">
            <i className="fa-solid fa-droplet text-clrButton"></i>
            <div className="ml-3">
              <p className="leading-5">Humidity</p>
              <p className="leading-3 text-lg font-bold">{humidity}%</p>
            </div>
          </div>
          <div className="flex items-center w-full">
            <i className="fa-solid fa-sun text-clrButton"></i>
            <div className="ml-3">
              <p className="leading-5">UV Index</p>
              <p className="leading-3 text-lg font-bold">
                {(uvi / 10).toFixed(1)} out of 10
              </p>
            </div>
          </div>
        </div>
        <hr className="solid  bg-slate-400"></hr>
        <div className="flex py-3 justify-between ">
          <div className="flex items-center w-full">
            <i className="fa-solid fa-arrow-up-from-bracket text-clrButton"></i>
            <div className="ml-3">
              <p className="leading-5">{rise}</p>
              <p className="leading-3 text-lg font-bold">{riseValue}</p>
            </div>
          </div>
          <div className="flex items-center w-full">
            <i className="fa-solid fa-download text-clrButton"></i>
            <div className="ml-3">
              <p className="leading-5">{set}</p>
              <p className="leading-3 text-lg font-bold">{setValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
