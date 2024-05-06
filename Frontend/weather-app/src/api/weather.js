import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

export function getWeatherInformation(location, startDate, endDate) {
    return axios({
        method: "get",
        url: `${baseURL}weather/forecast?location=${location}&start_date=${startDate}&end_date=${endDate}`,
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
