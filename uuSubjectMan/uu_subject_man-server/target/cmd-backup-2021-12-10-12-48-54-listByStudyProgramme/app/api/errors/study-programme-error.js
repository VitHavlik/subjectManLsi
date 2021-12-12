"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const STUDY_PROGRAMME_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}studyProgramme/`;

const Create = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgrammeDaoCreateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoCreateFailed`;
      this.message = "Create studyProgramme by studyProgramme Dao create failed.";
    }
  }
}

const Update = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgrammeDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoUpdateFailed`;
      this.message = "Update studyProgramme by studyProgramme Dao update failed.";
    }
  }
};

const List = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}list/`,
  StudyProgrammeDaoListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoListFailed`;
      this.message = "List studyProgramme by studyProgramme Dao list failed.";
    }
  }
};

const Get = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgrammeDaoGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoGetFailed`;
      this.message = "Get studyProgramme by studyProgramme Dao get failed.";
    }
  },
  StudyProgrammeDoNotExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDoNotExist`;
      this.message = "Searched studyProgramme do not exist.";
    }
  }
};

module.exports = {
  Get,
  List,
  Update,
  Create
};
