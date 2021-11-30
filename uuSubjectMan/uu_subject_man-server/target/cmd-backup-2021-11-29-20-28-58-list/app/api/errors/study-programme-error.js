"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const STUDY_PROGRAMME_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}studyProgramme/`;

const Create = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}create/`,
  
};

const Update = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}update/`,
  
};

module.exports = {
  Update,
  Create
};
