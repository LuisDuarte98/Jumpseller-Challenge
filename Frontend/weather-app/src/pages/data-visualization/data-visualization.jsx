import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getWeatherInformation } from "../../api/weather.js";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { format } from "date-fns";
import "./data-visualization.scss";

function DataVisualization() {
    const routerInfo = useLocation();
    const [data, setData] = useState();
    const { location, startDate, endDate } = routerInfo.state;
    const [aux, setAux] = useState([]);

    useEffect(() => {
        getWeatherInformation(location, startDate, endDate)
            .then((response) => {
                setData(response.data);
                let aux2 = [];
                response.data?.daily.time.map((x, i) => {
                    aux2.push({
                        minTemperature: data.daily.temperature_2m_min[i],
                        maxTemperature: data.daily.temperature_2m_max[i],
                        date: format(new Date(x), "dd/MMM"),
                    });
                });
                setAux(aux2);
                console.log(data?.daily.time);
                console.log(aux);
                console.log(aux2);
            })
            .catch((error) => console.error(error));
    }, [location, startDate, endDate]);

    if (!data) {
        return <>Loading..</>;
    }
    return (
        <>
            <div className="general-info">
                <p>
                    Here you can visualise the most pertinent data about the
                    weather in <b>{location}</b>
                </p>
            </div>
            <div className="chart-section">
                <LineChart
                    width={600}
                    height={400}
                    data={aux}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="maxTemperature"
                        stroke="#ff7300"
                        name="Max Temperature"
                    />
                    <Line
                        type="monotone"
                        dataKey="minTemperature"
                        stroke="#007bff"
                        name="Min Temperature"
                    />
                </LineChart>
            </div>
            <div className="table-section">
                <table className="table">
                    <thead className="table__head">
                        <tr>
                            <th className="head__date">Date</th>
                            <th>Max temperature (°C)</th>
                            <th>Min temperature (°C)</th>
                            <th>Precipitation sum (mm)</th>
                            <th>Daylight duration (sec)</th>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {data?.daily.time.map((x, i) => {
                            return (
                                <tr>
                                    <td className="body__date">{x}</td>
                                    <td>{data.daily.temperature_2m_min[i]}</td>
                                    <td>{data.daily.temperature_2m_max[i]}</td>
                                    <td>{data.daily.precipitation_sum[i]}</td>
                                    <td>{data.daily.daylight_duration[i]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-danger">Go back</button>
            </div>
        </>
    );
}

export default DataVisualization;
