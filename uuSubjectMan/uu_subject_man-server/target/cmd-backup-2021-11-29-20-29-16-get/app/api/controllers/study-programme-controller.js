"use strict";
const StudyProgrammeAbl = require("../../abl/study-programme-abl.js");

class StudyProgrammeController {

  list(ucEnv) {
    return StudyProgrammeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return StudyProgrammeAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return StudyProgrammeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new StudyProgrammeController();
