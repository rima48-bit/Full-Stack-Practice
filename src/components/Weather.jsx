import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudyIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef(null)

    const [weatherData, setWeatherData] = useState(null)

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,

        "02d": cloudyIcon,
        "02n": cloudyIcon,

        "03d": cloudyIcon,
        "03n": cloudyIcon,

        "04d": drizzleIcon,
        "04n": drizzleIcon,

        "09d": rainIcon,
        "09n": rainIcon,

        "10d": rainIcon,
        "10n": rainIcon,

        "13d": snowIcon,
        "13n": snowIcon,
    }

    const search = async (city) => {

        if (!city || city.trim() === "") {
            alert("Please enter a city name")
            return
        }

        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url)
            const data = await response.json()

            console.log("API Response:", data)

            // Check if API returned an error
            if (data.cod !== 200) {
                setWeatherData(false)
                console.log("Weather API Error:", data.message)
                return
            }

            const icon = allIcons[data.weather[0].icon] || clearIcon

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {

            console.log("Error fetching weather data:", error)
            setWeatherData(false)

        }
    }

    useEffect(() => {
        search("London")
    }, [])

    const handleSearch = () => {
        search(inputRef.current.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="weather">

            <div className="search-bar">

                <input
                    type="text"
                    placeholder="Enter city name"
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                />

                <img
                    src={searchIcon}
                    alt="Search"
                    onClick={handleSearch}
                />

            </div>

            {weatherData === false ? (

                <p className="error-message">
                    City not found
                </p>

            ) : weatherData ? (

                <>
                    <img
                        src={weatherData.icon}
                        alt="Weather"
                        className="weather-icon"
                    />

                    <p className="temperature">
                        {weatherData.temperature}°C
                    </p>

                    <p className="location">
                        {weatherData.location}
                    </p>

                    <div className="weather-data">

                        <div className="col">

                            <img
                                src={humidityIcon}
                                alt="Humidity"
                            />

                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>

                        </div>

                        <div className="col">

                            <img
                                src={windIcon}
                                alt="Wind"
                            />

                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>

                        </div>

                    </div>
                </>

            ) : (

                <p className="loading">
                    Loading weather...
                </p>

            )}

        </div>
    )
}

export default Weather
