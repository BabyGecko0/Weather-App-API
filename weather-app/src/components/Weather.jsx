import React from 'react'
import './Weather.css'
import search_icon from '../assets/loupe.png'
import sunny_icon from '../assets/sunny.png'
import cloudy_icon from '../assets/cloudy.png'
import humidity_icon from '../assets/humidity.png'
import rainy_icon from '../assets/rainy.png'
import snow_icon from '../assets/snow.png'
import sunny_cloudy_icon from '../assets/sunny-cloudy.png'
import windy_icon from '../assets/windy.png'


const Weather = () => {
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type="text" placeholder='Search' />
            <img src={search_icon} alt="" className='search-button' />
        </div>
        <img src={sunny_icon} alt="" className='weather-icon' />
        <p className='temperature'>25C</p>
        <p className='location'>Athens, Greece</p>
        
        <div className='weather-details'>
            <div className='col'>
                <img src={humidity_icon} alt="" className='humidity-style' />
                <div>
                    <p className='humidity-title'>61%</p>
                    <span style={{ fontSize: '12px'}}>Humidity</span>
                </div>
                <img src={windy_icon} alt="" className='humidity-style' />
                <div>
                    <p className='humidity-title'>2km/h</p>
                    <span style={{ fontSize: '12px'}} >Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
