# Server README

## Setup (Windows)
### Need to have installed Ruby, Ruby on Rails, SQLite3
### To run the project you need to have a cmd into the weatherAPI folder and run the following commands:
1. bundle install -> In order to install all the gems dependencies
2. ruby bin\rails server -> In order to boot up the server

## What have i made?
### Defined a model to store the weather information
      t.string :location
      t.date :date
      t.float :max_temperature
      t.float :min_temperature
      t.float :precipitation
      t.integer :daylight_duration
      t.timestamps
### Defined a route and a controller to retrieve weather information, with the following algorithm:
1. It accepts as parameters the location (e.g Lisbon), a start date and an end date
2. First checks if there is all the necessary records already in the database
3. If so, retrieves it
4. If not, first it is made a call to the open-meteo API in order to get the coordinates of the location (i.e map Lisbon to latitude and longitude)
5. Then, if there is no error, it continues. Otherwise, the API responds with the error
6. Next step, it is made another call to the open-meteo API, to get some information, like the min and max temperature in each day for the given date range
7. Lastly, if there is no error with the call, the controller stores the retrieved information into the database (without duplicates!), and responds with that same information to the client. Otherwise responds with the error
