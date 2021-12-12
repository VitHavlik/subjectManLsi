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
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,
  SubjectListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoListFailed`;
      this.message = "Subject list by subject Dao list failed.";
    }
  },

};

const ListByStudyProgramme = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}listByStudyProgramme/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoListByStudyProgrammeFailed`;
      this.message = "Subject list by study programme ID by subject Dao list failed.";
    }
  },
};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
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

const AssignSubject = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}assignSubject/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoAssignStudyProgramFailed`;
      this.message = "Subject get by subject Dao get failed.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoAssignStudyProgramFailed`;
      this.message = "Assign study programme to subject by subject Dao update failed.";
    }
  },
  SubjectDontExistFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoAssignStudyProgramFailed`;
      this.message = "Subject id you selected does not exist.";
    }
  },
  SubjecAlreadyAssignedToStudyProgFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoAssignStudyProgramFailed`;
      this.message = "Subject is already assigned to this study programme.";
    }
  },
};

const RemoveSubject = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}removeSubject/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoRemoveStudyProgramFailed`;
      this.message = "Subject get by subject Dao get failed.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoRemoveStudyProgramFailed`;
      this.message = "Remove study programme from subject by subject Dao update failed.";
    }
  },
  SubjectDontExistFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoRemoveStudyProgramFailed`;
      this.message = "Subject id you selected does not exist.";
    }
  },
  SubjecNotAssignedToStudyProgFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoRemoveStudyProgramFailed`;
      this.message = "Subject is not assigned to this study programme.";
    }
  },
};

module.exports = {
  RemoveSubject,
  ListByStudyProgramme,
  AssignSubject,
  Update,
  Create,
  List,
  Get
};
