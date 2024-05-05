import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./form-page.scss";

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
            <div className="formPage">
                <div className="info-section">
                    <h2 className="info-section__title">
                        Welcome to Weather App
                    </h2>
                    <p>
                        Here you can visualise the most pertinent data about the
                        weather in a given location between two date ranges
                    </p>
                </div>

                <div className="form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input
                                {...register("location")}
                                placeholder="Location"
                            />
                        </div>
                        <div>
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
                        <button type="submit" className="btn btn-outline-info">
                            Visualize!
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default FormPage;
