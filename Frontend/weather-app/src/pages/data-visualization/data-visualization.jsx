import React from "react";

function DataVisualization() {
  return (
    <>
      <div className="chart-section"></div>
      <div className="table-section">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Max temperature (°C)</th>
              <th>Min temperature (°C)</th>
              <th>Precipitation sum (mm)</th>
              <th>Daylight duration (sec)</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}

export default DataVisualization;
