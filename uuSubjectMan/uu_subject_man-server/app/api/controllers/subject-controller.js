"use strict";
const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {

  removeSubject(ucEnv) {
    return SubjectAbl.removeSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listByStudyProgramme(ucEnv) {
    return SubjectAbl.listByStudyProgramme(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  assignSubject(ucEnv) {
    return SubjectAbl.assignSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return SubjectAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  list(ucEnv) {
    return SubjectAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return SubjectAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return SubjectAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SubjectController();
