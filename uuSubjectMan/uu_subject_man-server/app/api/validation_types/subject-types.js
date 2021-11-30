/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    goal: uu5String(5000).isRequired(),
    credits: number(Infinity).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    guarantor: array().isRequired(),
    teachers: array().isRequired(),
    studyProgrammeId: uu5String(64).isRequired(),
});

const subjectGetDtoInType = shape({
    id: uu5String(200).isRequired(),
});

const subjectUpdateDtoInType = shape({
    id: uu5String(64).isRequired(),
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    goal: uu5String(5000).isRequired(),
    credits: number(Infinity).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    guarantor: array().isRequired(),
    teachers: array().isRequired()
});