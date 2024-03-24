const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=be22b7b7f649ac351e2ac6880b53fbad`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (response.body.cod && response.body.cod !== 200) {
            callback('Unable to find location', undefined);
        } else {
            const temperatureCelsius = response.body.main.temp - 273.15;
            callback(undefined, `It is currently ${temperatureCelsius} degrees Celsius out .`);
        }
    });
};

module.exports = forecast;
