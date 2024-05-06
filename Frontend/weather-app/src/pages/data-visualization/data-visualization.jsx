import React from "react";
import { useLocation } from "react-router-dom";

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
import { useNavigate } from "react-router-dom";
import "./data-visualization.scss";

function DataVisualization() {
    const routerInfo = useLocation();
    const data = routerInfo.state;

    const goTo = useNavigate();
    const goBack = () => {
        goTo("/");
    };

    if (!data) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }
    return (
        <>
            <div className="general-info">
                <p>
                    Here you can visualise the most pertinent data about the
                    weather in <b>{data.location} </b>between{" "}
                    <b>{data.startDate}</b> and <b>{data.endDate}</b>
                </p>
            </div>
            <div className="chart-section">
                <LineChart
                    width={600}
                    height={400}
                    data={data.weatherData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="max_temperature"
                        stroke="#ff7300"
                        name="Max Temperature"
                    />
                    <Line
                        type="monotone"
                        dataKey="min_temperature"
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
                        {data.weatherData.map((x, i) => {
                            return (
                                <tr>
                                    <td className="body__date">
                                        {format(new Date(x.date), "dd/MMM")}
                                    </td>
                                    <td>{x.min_temperature}</td>
                                    <td>{x.max_temperature}</td>
                                    <td>{x.precipitation}</td>
                                    <td>{x.daylight_duration}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-danger button" onClick={goBack}>
                    Go back
                </button>
            </div>
        </>
    );
}

export default DataVisualization;
