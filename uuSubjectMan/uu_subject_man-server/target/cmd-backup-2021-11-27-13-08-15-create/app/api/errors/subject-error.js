"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoCreateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Create subject by subject Dao create failed.";
    }
  },

  SubjectListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoListFailed`;
      this.message = "Subject list by subject Dao list failed.";
    }
  },

  };

  module.exports = {
    Create
  };
