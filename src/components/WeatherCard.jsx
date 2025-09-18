import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh, faWind, faTint } from "@fortawesome/free-solid-svg-icons";
import "./weatherCard.css";

function WeatherCard({city , temperature, description, humidity, feelsLike, wind, time}){
    if(!city){
        return null;
    }
    return(
    <div className = "weather-card">
        <div className="first-row">
            <div className="city-block">
            <h2>{city}</h2>
            <p>{time}</p>
            <p>{description}</p>
        </div>
        <div className="temp-block">
            <h3><FontAwesomeIcon icon={faTemperatureHigh} />{temperature}°C</h3>
            <p>Feels like: {feelsLike}°C</p>
        </div>
        </div>
        <div className="second-row">
            <div className="humidity">
            <p> <FontAwesomeIcon icon={faTint} />Humidity: {humidity}%</p>
        </div>
        <div className="wind">
             <p><FontAwesomeIcon icon={faWind} />Wind Speed: {wind} m/s</p>
        </div>
        </div>
        
    </div>
    );
}
export default WeatherCard;