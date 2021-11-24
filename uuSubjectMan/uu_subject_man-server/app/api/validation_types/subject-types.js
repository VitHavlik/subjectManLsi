/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    credits: number(Infinity).isRequired(),
    supervisor: uu5String(200).isRequired(),
    goal: uu5String(5000).isRequired(),
    studyDegree: oneOf(["Bc.", "Mgr."]).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    info: uu5String(5000)



  });