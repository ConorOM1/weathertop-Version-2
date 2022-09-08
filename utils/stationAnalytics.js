"use strict";

const stationStore = require("../models/station-store");

const stationAnalytics = {
  getLatestReading(readings) {
    return readings[readings.length - 1];
  },

  weatherCode(code) {
    if (code == 200) {
      return "Thunderstorm";
    } else if (code == 300) {
      return "Drizzle";
    } else if (code == 500) {
      return "Rain";
    } else if (code == 600) {
      return "Snow";
    } else if (code == 700) {
      return "Mist/Fog";
    } else if (code == 800) {
      return "Clear";
    }
  },

  weatherIcons(code) {
    let weatherIcons = code;

    switch (code) {
      case "200":
        return "bolt icon";
        break;
      case "300":
        return "cloud sun rain icon";
        break;

      case "500":
        return "cloud showers heavy icon";
        break;
      case "600":
        return "snowflake icon";
        break;
      case "700":
        return "smog icon";
        break;
      case "800":
        return "sun icon";
        break;
    }
  },

  celsiusToFahrenheit(temperature) {
    return temperature * 1.8 + 32;
  },

  beaufortConversion(windSpeed) {
    if (windSpeed == 0) {
      return 0;
    } else if (windSpeed >= 1 && windSpeed <= 6) {
      return 1;
    } else if (windSpeed >= 7 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 29) {
      return 4;
    } else if (windSpeed >= 30 && windSpeed <= 39) {
      return 5;
    } else if (windSpeed >= 40 && windSpeed <= 50) {
      return 6;
    } else if (windSpeed >= 51 && windSpeed <= 62) {
      return 7;
    } else if (windSpeed >= 63 && windSpeed <= 75) {
      return 8;
    } else if (windSpeed >= 76 && windSpeed <= 87) {
      return 9;
    } else if (windSpeed >= 88 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else if (windSpeed >= 117) {
      return 12;
    }
  },

  windCompass(windDirection) {
    if (windDirection > 11.25 && windDirection <= 33.75) {
      return "North North East";
    } else if (windDirection > 33.75 && windDirection <= 56.25) {
      return "East North East";
    } else if (windDirection > 56.25 && windDirection <= 78.75) {
      return "East";
    } else if (windDirection > 78.75 && windDirection <= 101.25) {
      return "East South East";
    } else if (windDirection > 101.25 && windDirection <= 123.75) {
      return "East South East";
    } else if (windDirection > 123.75 && windDirection <= 146.25) {
      return "South East";
    } else if (windDirection > 146.25 && windDirection <= 168.75) {
      return "South South East";
    } else if (windDirection > 168.75 && windDirection <= 191.25) {
      return "South";
    } else if (windDirection > 191.25 && windDirection <= 213.75) {
      return "South South West";
    } else if (windDirection > 213.75 && windDirection <= 236.25) {
      return "South West";
    } else if (windDirection > 236.25 && windDirection <= 258.75) {
      return "West South West";
    } else if (windDirection > 258.75 && windDirection <= 281.25) {
      return "West";
    } else if (windDirection > 281.25 && windDirection <= 303.75) {
      return "West North West";
    } else if (windDirection > 303.75 && windDirection <= 326.25) {
      return "North West";
    } else if (windDirection > 326.25 && windDirection <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },

  windChill(temperature, windSpeed) {
    return Math.round(
      13.12 +
        0.6215 * temperature -
        11.37 * Math.pow(windSpeed, 0.16) +
        0.3965 * temperature * Math.pow(windSpeed, 0.16)
    );
  },

  maxTemp(station) {
    let maxTemp = 0;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
    }
    return maxTemp;
  },

  minTemp(station) {
    let minTemp = 0;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
    }
    return minTemp;
  },

  maxWindSpeed(station) {
    let maxWindSpeed = 0;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWindSpeed) {
          maxWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return maxWindSpeed;
  },

  minWindSpeed(station) {
    let minWindSpeed = 0;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWindSpeed) {
          minWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return minWindSpeed;
  },

  maxPressure(station) {
    let maxPressure = 0;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },

  minPressure(station) {
    let minPressure = 0;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  },
};

module.exports = stationAnalytics;
