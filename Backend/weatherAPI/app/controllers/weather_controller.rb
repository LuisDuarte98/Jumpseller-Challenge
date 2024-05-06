class WeatherController < ApplicationController
    require 'open-uri'
    require 'json'
  
    def forecast
        location = params[:location]
        start_date = params[:start_date]
        end_date = params[:end_date]
  
        # Validate presence of required parameters
        unless location.present? && start_date.present? && end_date.present?
            render json: { error: "Missing parameters" }, status: :unprocessable_entity
            return
        end

        # Query the database to check if all weather data for the specified range is already stored
        stored_weather_data = Weather.where(location: location, date: start_date..end_date).order(:date)

        # If all weather data for the range is already stored in the database, return it directly
        if stored_weather_data.count == (Date.parse(end_date) - Date.parse(start_date) + 1).to_i
            render json: stored_weather_data, status: :ok
            return
        end
  
        # First, get coordinates of the location
        geocoding_url = "https://geocoding-api.open-meteo.com/v1/search?name=#{location}"
        geocoding_response = JSON.parse(URI.open(geocoding_url).read)

        # Debug output
        #puts "Geocoding response: #{geocoding_response.inspect}"
  
        if !geocoding_response["results"] and geocoding_response["results"].empty?
            render json: { error: "Location not found" }, status: :not_found
            return
        end
  
        latitude = geocoding_response["results"][0]["latitude"]
        longitude = geocoding_response["results"][0]["longitude"]
  
        # Then, get weather forecast
        weather_url = "https://api.open-meteo.com/v1/forecast?latitude=#{latitude}&longitude=#{longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,daylight_duration&start_date=#{start_date}&end_date=#{end_date}"
        weather_response = JSON.parse(URI.open(weather_url).read)

        # Debug output
        #puts "Weather response : #{weather_response.inspect}"
        
        # Extract relevant data from the weather response and format it
        forecast_data = weather_response["daily"]["time"].map.with_index do |date, index|
            {   
                location: location,
                date: date,
                min_temperature: weather_response["daily"]["temperature_2m_min"][index],
                max_temperature: weather_response["daily"]["temperature_2m_max"][index],
                precipitation: weather_response["daily"]["precipitation_sum"][index],
                daylight_duration: weather_response["daily"]["daylight_duration"][index]
            }
        end

        # Save each object into the database
        forecast_data.each do |data|
            Weather.find_or_initialize_by(location: data[:location], date: data[:date]).update(data)
        end

        # Finally, the response
        render json: forecast_data
        rescue => e
            render json: { error: e.message }, status: :internal_server_error
    end
end
  