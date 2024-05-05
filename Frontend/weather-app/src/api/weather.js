import axios from "axios";

const baseURL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,daylight_duration";

export function getWeatherInformation(location, startDate, endDate) {
  return axios({
    method: "get",
    url: "/query/getCustomName",
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      location: location,
      startDate: startDate,
      endDate: endDate,
    },
    validateStatus: (status) => validateStatus(status),
  });
}

function validateStatus(status) {
  return true;
}
