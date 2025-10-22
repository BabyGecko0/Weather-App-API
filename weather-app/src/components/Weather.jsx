// Import necessary React hooks and assets
import React, { useEffect , useState , useRef} from 'react'
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

    // State to store weather data
    const [weatherData, setWeatherData] = useState(false);

    // Ref for the search input field
    const searchRef = useRef();

    // Mapping of weather icon codes to local image assets
    const allIcons = {
        "01d": sunny_icon,
        "01n": sunny_icon,
        "02d": sunny_cloudy_icon,
        "02n": sunny_cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": cloudy_icon,
        "04n": cloudy_icon,
        "09d": rainy_icon,
        "09n": rainy_icon,
        "10d": rainy_icon,
        "10n": rainy_icon,
        "11d": rainy_icon,
        "11n": rainy_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": cloudy_icon,
        "50n": cloudy_icon,
    }

    // Function to fetch weather data for a given city
    const searchCity = async (city) => {
    // Validate input
    if(city === "") {
            alert("Please enter a city name");
            return;
        }
    // Fetch weather data from OpenWeatherMap API
    try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`

            const response = await fetch(url);
            const data = await response.json();

            // Handle API errors
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log('fetched weather data:', data);

            // Select appropriate icon based on weather code
            const icon = allIcons[data.weather[0].icon] || sunny_icon;

            // Update state with relevant weather data
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                country: data.sys.country
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data:", error);
        }
    }

    // Fetch default weather data for Athens on initial render
    useEffect(() => {
        searchCity("Tirana");
    }, [])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={searchRef} type="text" placeholder='Search' />
            {/* Search icon triggers city search on click */}
            <img src={search_icon} alt="" className='search-button' onClick={() => searchCity(searchRef.current.value)} />
        </div>
        {/* Conditionally render weather data if available */}
        {weatherData ? <>
        <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}, {weatherData.country}</p>
        <div className='weather-details'>
            <div className='col'>
                <img src={humidity_icon} alt="" className='humidity-style' />
                <div>
                    <p className='humidity-title'>{weatherData.humidity}%</p>
                    <span style={{ fontSize: '12px'}}>Humidity</span>
                </div>
                <img src={windy_icon} alt="" className='humidity-style' />
                <div>
                    <p className='humidity-title'>{weatherData.windSpeed}km/h</p>
                    <span style={{ fontSize: '12px'}} >Wind Speed</span>
                </div>
            </div>
        </div>  </> : <>   
        </>}
    </div>
  )
}

export default Weather
