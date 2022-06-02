import axios from "axios";

export const apiCall = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=539a92a71fbb1b6ee46f8afdfc95bb2e`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  }

