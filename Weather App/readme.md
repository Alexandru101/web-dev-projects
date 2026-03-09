# Weather-App Documentation
<img width="927" height="775" alt="image" src="https://github.com/user-attachments/assets/fa306cd2-9c2b-4d64-a8b2-a718bcba6bc3" /><br>
[License](https://github.com/Alexandru101/web-dev-projects/blob/main/LICENSE)
[Website](https://Alexandru101.github.io/web-dev-projects/Weather%20App)

## Step 1: Declaring the API Key and Input Element
First we store the OpenWeatherMap API key in a variable. This key is required to authenticate requests to the weather API.

The city input field is also selected so the user can enter the location for which they want to retrieve weather data.
```
const apiKey = "da5cc509bc967933cf9f957a7a06eb9b"
const cityInput = document.getElementById("city");
```

## Step 2: Creating the Weather Fetch Function
The getWeather() function retrieves weather data for the city entered by the user.

Two API URLs are created:

weatherUrl for current weather conditions

forecastUrl for the multi-day forecast

Both URLs include the city name, API key, and the metric unit parameter so temperatures are returned in Celsius.
```
async function getWeather(){
    const city = document.getElementById("city").value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
```

## Step 3: Fetching Current Weather Data
A request is sent to the current weather endpoint using fetch().
The response is converted into JSON so the data can be accessed inside the application.

```
    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
```

## Step 4: Updating the Current Weather UI
After retrieving the weather data, the page is updated with information about the selected city.

The following values are displayed:

City name

Current temperature

Weather description
```
        document.getElementById("cityName").textContent = weatherData.name;
        document.getElementById("temperature").textContent = `Temperature ${weatherData.main.temp}°C`
        document.getElementById("description").textContent = weatherData.weather[0].description;
```

## Step 5: Displaying the Weather Icon
Each weather condition has an associated icon. The icon code is retrieved from the API response and used to construct the correct image URL.

The image source of the weather icon element is then updated.
```
        const weatherIcon = weatherData.weather[0].icon;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
```

## Step 6: Fetching the Forecast Data
A second request is made to retrieve the 5-day weather forecast.

The response is converted to JSON so the forecast data can be processed.
```
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
```

## Step 7: Processing the Daily Forecast
All forecast display elements are selected using .querySelectorAll('.day').

The forecast API returns weather data in 3-hour intervals, so the code selects every 8th entry to represent one full day.

For each forecast day:

The weekday name is generated from the forecast timestamp.

The weather icon is displayed.

The predicted temperature is rounded and shown.
```
        const forecastDays = document.querySelectorAll('.day');
        forecastDays.forEach((day, index) => {
            const forecast = forecastData.list[index * 8];
            const forecastIcon = forecast.weather[0].icon;
            
            const weekday = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            day.querySelector('.weekday').textContent = weekday;
            day.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="weather icon not found">`;
            day.querySelector('.temp').textContent = `${Math.round(forecast.main.temp)}°C`;
        })
```

## Step 8: Error Handling
If any part of the data request fails (such as a network error or invalid city), the error is caught and logged to the console.
```
    } catch (error){
        console.log(`Error fetching weather data: ${error}`);
    }
}
```

## Step 9: Triggering Weather Search with the Enter Key
An event listener is attached to the city input field.
When the user presses the Enter key, the getWeather() function is executed to retrieve the weather data.
```
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        getWeather();
    }
})
```

## Setup Instructions

- Download [Visual Studio Code](https://code.visualstudio.com/) and make sure to have "Live Server" extension installed
- Create a folder for the project and make sure to change the html '<head>' stylesheet "href" suitable for your projects file names (eg what you have named instead of style.css and index.js)
- Create three files within that folder for index.html, index.js and style.css.
- Copy and paste all the code for each of these files that can be found within this project
- Press "Go Live" at the bottom of your visual studio code (IDE)
