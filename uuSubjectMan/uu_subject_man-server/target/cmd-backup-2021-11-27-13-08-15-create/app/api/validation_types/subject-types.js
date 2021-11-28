/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    goal: uu5String(5000).isRequired(),
    credits: number(Infinity).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    guarantor: array().isRequired(),
    teachers: array().isRequired(),
    state:  oneOf(["active", "inactive"]).isRequired()
});