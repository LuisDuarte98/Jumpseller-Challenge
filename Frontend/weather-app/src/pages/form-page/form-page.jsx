import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./form-page.scss";
import "../../assets/scss/general.scss";
import { getWeatherInformation } from "../../api/weather.js";

function FormPage() {
    const { register, handleSubmit, control, watch } = useForm();
    const goTo = useNavigate();
    const onSubmit = (formData) => {
        var tzoffset = new Date().getTimezoneOffset() * 60000;
        var startDateISO = new Date(formData.startDate - tzoffset)
            .toISOString()
            .split("T")[0];
        var endDateISO = new Date(formData.endDate - tzoffset)
            .toISOString()
            .split("T")[0];
        getWeatherInformation(formData.location, startDateISO, endDateISO)
            .then((response) => {
                goTo("/data-visualization", {
                    state: {
                        weatherData: response.data,
                        location: formData.location,
                        startDate: startDateISO,
                        endDate: endDateISO,
                    },
                });
            })
            .catch((error) => alert("Something went wrong, please try again!"));
    };

    const location = watch("location");
    const startDate = watch("startDate");
    const endDate = watch("endDate");

    const disableSubmission =
        !location || location === "" || !startDate || !endDate;

    return (
        <>
            <div className="info-section">
                <img src="logo.png" />
                <h2 className="info-section__title">Welcome to Weather App</h2>
                <p>
                    Here you can visualise the most pertinent data about the
                    weather in a given location between two date ranges
                </p>
            </div>

            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form__location">
                        <input
                            {...register("location")}
                            placeholder="Location"
                        />
                    </div>
                    <div className="form__date">
                        <Controller
                            name={"startDate"}
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <DatePicker
                                        onChange={onChange}
                                        selected={value}
                                        placeholderText="Start Date"
                                    />
                                );
                            }}
                        />
                    </div>
                    <div className="form__date">
                        <Controller
                            name={"endDate"}
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <DatePicker
                                        onChange={onChange}
                                        selected={value}
                                        placeholderText="End Date"
                                    />
                                );
                            }}
                        />
                    </div>
                    <div className="form__required-fields">
                        <span>
                            (All the fields presented above are required)
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="button button--ok"
                        disabled={disableSubmission}
                    >
                        Visualise data
                    </button>
                </form>
            </div>
        </>
    );
}

export default FormPage;
