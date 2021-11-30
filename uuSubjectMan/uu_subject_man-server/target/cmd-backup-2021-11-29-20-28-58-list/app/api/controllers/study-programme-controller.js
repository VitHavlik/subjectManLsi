"use strict";
const StudyProgrammeAbl = require("../../abl/study-programme-abl.js");

class StudyProgrammeController {

  update(ucEnv) {
    return StudyProgrammeAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return StudyProgrammeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new StudyProgrammeController();
