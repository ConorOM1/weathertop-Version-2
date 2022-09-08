"use strict";
const uuid = require("uuid");

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const accounts = require("./accounts.js");

const dashboard = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("dashboard rendering");
    const viewData = {
      title: "Station Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      name: request.body.name,
      readings: [],
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
