"use strict";
const uuid = require("uuid");

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/stationAnalytics");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId);
    const latestReading = stationAnalytics.getLatestReading(station.readings);

    if (latestReading) {
      const viewData = {
        title: "Station",
        station: station,
        stationSummary: {
          latestWeather: stationAnalytics.weatherCode(latestReading.code),
          latestWeatherIcon: stationAnalytics.weatherIcons(latestReading.code),
          latestTempC: latestReading.temperature,
          latestTempF: stationAnalytics.celsiusToFahrenheit(latestReading.temperature),
          latestWindChill: stationAnalytics.windChill(latestReading.temperature,latestReading.windSpeed),
          latestWindSpeed: latestReading.windSpeed,
          latestBeaufort: stationAnalytics.beaufortConversion(latestReading.windSpeed),
          latestWindCompass: stationAnalytics.windCompass(latestReading.windDirection),
          latestPressure: latestReading.pressure,
          maxTemperature: stationAnalytics.maxTemp(station),
          minTemperature: stationAnalytics.minTemp(station),
          maxWindSpeed: stationAnalytics.maxWindSpeed(station),
          minWindSpeed: stationAnalytics.minWindSpeed(station),
          maxPressure: stationAnalytics.maxPressure(station),
          minPressure: stationAnalytics.minPressure(station),
        },
      };
      response.render("station", viewData);
    } else {
      const viewData = {
        title: "Station",
        station: station,
      };
      response.render("station", viewData);
    }
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDirection: request.body.windDirection,
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
