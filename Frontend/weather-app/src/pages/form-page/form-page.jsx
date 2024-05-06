import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./form-page.scss";
import "../../assets/scss/general.scss";

function FormPage() {
    const { register, handleSubmit, control } = useForm();
    const goTo = useNavigate();
    const onSubmit = (formData) => {
        goTo("/data-visualization", {
            state: {
                ...formData,
            },
        });
    };

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
                    <button type="submit" className="button button--ok">
                        Visualise data
                    </button>
                </form>
            </div>
        </>
    );
}

export default FormPage;
