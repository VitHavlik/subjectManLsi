/* eslint-disable */
const topicCreateDtoInType = shape({
  name: uu5String(100).isRequired(),
  description: uu5String(1000),
  subjectId: uu5String(64).isRequired()
});

const topicListDtoInType = shape({
  subjectId: uu5String(64).isRequired()
});

const topicUpdateDtoInType = shape({
  id: uu5String(64).isRequired(),
  name: uu5String(100).isRequired(),
  description: uu5String(1000)
});

const topicRemoveDtoInType = shape({
  id: uu5String(64).isRequired()
});

const digitalContentAdd = shape({
  id: uu5String(64).isRequired(),
  name: uu5String(100).isRequired(),
  link: uu5String(255).isRequired(),
  type: oneOf(["video", "youtube", "uuBook", "uuCourse", "link"]).isRequired(),
});

const digitalContentRemove = shape({
  id: uu5String(64).isRequired(),
  digitalContentId: uu5String(64).isRequired()
});