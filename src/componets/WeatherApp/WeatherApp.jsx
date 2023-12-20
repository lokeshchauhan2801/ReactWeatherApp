import React, { useState } from 'react'
import './WeatherApp.css'

import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import humidity_icon from "../Assets/humidity.png"
import search_icon from "../Assets/search.png"
import wind_icon from "../Assets/wind.png"
import snow_icon from "../Assets/snow.png"
import rain_icon from '../Assets/rain.png'
import api_key from './WeatherAppApi'
import countryvini from '../Assets/Countryvini.png'
import timevini from '../Assets/Timevini.png'

import country from '../Assets/Countryfleg.png'



const WeatherApp = () => {
    const [weatherIcon, setWeatherIcon] = useState(cloud_icon)
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        wind: '',
        temperature: '',
        location: '',
        climate : 'Clear' ,
        country :   ' ',
        timezone : ' ',
        convertTimeZone : '',
    });
    const search = async () => {
        const element = document.querySelector(".cityInput")
        if (!element || element.value === ' ') {
            return 0;
        }
        try {

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`
            let response = await fetch(url);
            let data = await response.json();
            if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                setWeatherIcon(clear_icon)
            }
            else if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
                setWeatherIcon(cloud_icon)
            }
            else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                setWeatherIcon(drizzle_icon)
            }
            else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                setWeatherIcon(drizzle_icon)
            }
            else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                setWeatherIcon(rain_icon)
            }
            else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
                setWeatherIcon(rain_icon)

            }
            else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                setWeatherIcon(snow_icon)
            }
            else {
                console.log('it is coming to else part')
                setWeatherIcon(clear_icon)
            }

            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: data.main.temp,
                location: data.name,
                climate : data.weather[0].main,
                country : data.sys.country,
                timezone : data.timezone,
                convertTimeZone : convertTimeZone(data.timezone),
            });

            function convertTimeZone(offsetInSeconds) {
                // Convert seconds to milliseconds
                const offsetInMilliseconds = offsetInSeconds * 1000;
            
                // Create a Date object with the current UTC time and apply the offset
                const date = new Date();
                date.setUTCMilliseconds(date.getUTCMilliseconds() + offsetInMilliseconds);
            
                // Format the offset as a string (e.g., '+05:00' or '-03:30')
                const offsetString = date.toISOString().substr(11, 5);
            
                return offsetString;
            }
            

        } catch (error) { 
            console.error('Error fetching weather data : ', error)
            document.write("Input can't be empty .",error)

        }

    }

    return (
        <div className='container'>
            <div className='top-bar'>
            
                <input type='text' className='cityInput' placeholder='search' />
                <div className='search-icon' onClick={() => search()}>

                    <img src={search_icon} alt='search-icon ' />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherIcon}></img>
                <div className="climate">{weatherData.climate}</div>
            </div>

            <div className="weather-temp">{`${weatherData.temperature}°C`}</div>
            <div className='weather-location'>{`${weatherData.location}`}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon'></img>
                    <div className="data">
                        <div className="humidity-percent">{`${weatherData.humidity} %`}</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon'></img>
                    <div className="data">
                        <div className="wind-rate">{`${weatherData.wind} Km/h`}</div>
                        <div className='text'>Wind speed</div>
                    </div>
                </div>
            </div>
            <div className='data-container'>
            <div className='element'>
                    <img src={countryvini} alt='' className='icon'></img>
                    <div className="data">
                        <div className="wind-rate">{weatherData.country}</div>
                        <div className='text'>Country</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={timevini} alt='' className='icon'></img>
                    <div className="data">
                        <div className="wind-rate">{weatherData.convertTimeZone}</div>
                        <div className='text'>Time Zone</div>
                    </div>
                </div>
            </div>
        </div>

    )
};
export default WeatherApp;