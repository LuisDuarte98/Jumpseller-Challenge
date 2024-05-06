class Weather < ApplicationRecord

    validates :location, presence: true
    validates :date, presence: true
    validates :max_temperature, numericality: { greater_than_or_equal_to: -273.15 } #Minimum possible temperature in Celsius
  
    def self.save_weather_data(location, date, max_temperature, min_temperature, precipitation, daylight_duration)
        weather = Weather.new(
            location: location,
            date: date,
            max_temperature: max_temperature,
            min_temperature: min_temperature,
            precipitation: precipitation,
            daylight_duration: daylight_duration
        )
        weather.save
    end

end
