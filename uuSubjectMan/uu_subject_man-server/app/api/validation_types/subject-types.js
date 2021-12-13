/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    goal: uu5String(5000).isRequired(),
    credits: integer(1,1000).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    guarantor: uu5String(100).isRequired(),
    teachers: array().isRequired()
});

const subjectListByStudyProgrammeDtoInType = shape({
    studyProgrammeId: uu5String(64).isRequired(),
});

const subjectGetDtoInType = shape({
    id: uu5String(64).isRequired(),
});

const subjectUpdateDtoInType = shape({
    id: uu5String(64).isRequired(),
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    goal: uu5String(5000).isRequired(),
    credits: integer(1,1000).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    guarantor: uu5String(200).isRequired(),
    teachers: array().isRequired()
});

const subjectAssingStudyProgrameDtoInType = shape({
    id: uu5String(64).isRequired(),
    studyProgrammeId: uu5String(64).isRequired(),
    semester: oneOf([1,2,3,4,5,6,7,8,9,10]).isRequired()
});

const subjectRemoveStudyProgrameDtoInType = shape({
    id: uu5String(64).isRequired(),
    studyProgrammeId: uu5String(64).isRequired()
});

