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
};

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  SubjectListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoListFailed`;
      this.message = "Subject list by subject Dao list failed.";
    }
  },

};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  SubjectGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoGetFailed`;
      this.message = "Subject get by subject Dao get failed.";
    }
  },
  SubjectGetDontExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectGetDontExist`;
      this.message = "Searched subject do not exist.";
    }
  },

};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Update subject by subject Dao update failed.";
    }
  },
};

module.exports = {
  Update,
  Create,
  List,
  Get
};
