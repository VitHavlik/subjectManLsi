"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const SUBJECTS_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}subjects/`;

const ListSubjects = {
  UC_CODE: `${SUBJECTS_ERROR_PREFIX}listSubjects/`,
  
};

module.exports = {
  ListSubjects
};
