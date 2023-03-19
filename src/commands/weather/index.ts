#!/usr/bin/env node
const zipcodes = require('zipcodes');

export async function getWeather(args: string[]): Promise<void> {
  const zipCode = args[0];
  const timezone = args[1] || 'America/Los_Angeles'

  try {
    const location = zipcodes.lookup(zipCode);
    if (!location) {
      console.error('Invalid zip code provided.');
      return;
    }

    const { latitude, longitude } = location;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&timezone=${timezone}`
    );

    const weatherData = await response.json();
    console.log(`Weather in ${location.city}, ${location.state} ${zipCode}:`);
    console.log(`Temp: `, weatherData.current_weather.temperature);
    console.log(`Wind speed: `, weatherData.current_weather.windspeed);
    console.log(`Elevation: `, weatherData.elevation);
  } catch (error) {
    console.log(error)
    console.error('Error fetching weather data:', error);
  }
}