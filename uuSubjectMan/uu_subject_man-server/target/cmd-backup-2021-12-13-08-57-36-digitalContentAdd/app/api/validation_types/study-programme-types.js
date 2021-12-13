/* eslint-disable */
const studyProgrammeCreateDtoInType = shape({
    name: string(100).isRequired(),
    description: string(1000),
    degree: oneOf(["bachelor", "magister"]).isRequired(),
    credits: integer(1,1000).isRequired(),
    languages: oneOf(["CZ", "EN"]).isRequired(),
    forms: oneOf(["full-time", "part-time", "online"]).isRequired(),
});

const studyProgrammeGetDtoInType = shape({
    id: string(64).isRequired()
});

const studyProgrammeUpdateDtoInType = shape({
    id: string(64).isRequired(),
    name: string(100).isRequired(),
    description: string(1000),
    degree: oneOf(["bachelor", "magister"]).isRequired(),
    credits: number(Infinity).isRequired(),
    languages: oneOf(["CZ", "EN"]).isRequired(),
    forms: oneOf(["full-time", "part-time", "online"]).isRequired(),
});

