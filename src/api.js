
const apiKey = process.env.REACT_APP_API_KEY


export const fetchWeather = async (lat, lon) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)

    return await res.json()
}

export const geocodeCity = async (city) =>{ 
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)

    return await res.json()
}