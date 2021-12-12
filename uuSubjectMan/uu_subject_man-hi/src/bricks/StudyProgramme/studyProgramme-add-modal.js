//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useLsiValues, useContext, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "../config/config";
import Lsi from "./lsi/studyProgramme-add-modal-lsi";
//@@viewOff:imports

const StudyProgrammeAddForm = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "StudyProgrammeAddForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    studyProgramme: UU5.PropTypes.object,
    onSave: UU5.PropTypes.func,
    onSaveDone: UU5.PropTypes.func,
    onSaveFail: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    studyProgramme: null,
    onSave: () => { },
    onSaveDone: () => { },
    onSaveFail: () => { },
    onCancel: () => { },
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    //@@viewOn:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UU5.Forms.Form
        onSave={props.onSave}
        onSaveDone={props.onSaveDone}
        onSaveFail={props.onSaveFail}
        onCancel={props.onCancel}
      >
        <UU5.Forms.Text
          label={<UU5.Bricks.Lsi lsi={Lsi.form.name} />}
          name="name"
          value={props?.studyProgramme ? props?.studyProgramme.name : undefined}
          inputAttrs={{ maxLength: 255 }}
          controlled={false}
          required
        />
        <UU5.Forms.Text
          label={<UU5.Bricks.Lsi lsi={Lsi.form.description} />}
          name="description"
          value={props?.studyProgramme ? props?.studyProgramme.description : undefined}
          inputAttrs={{ maxLength: 255 }}
          controlled={false}
        />
        <UU5.Forms.Select
          label={<UU5.Bricks.Lsi lsi={Lsi.form.degree} />}
          name="degree"
          value={props?.studyProgramme ? props?.studyProgramme.degree : undefined}
          required
        >
          <UU5.Forms.Select.Option value="bachelor" content={<UU5.Bricks.Lsi lsi={Lsi.form.degree.bachelor} />} />
          <UU5.Forms.Select.Option value="magister" content={<UU5.Bricks.Lsi lsi={Lsi.form.degree.magister} />} />
        </UU5.Forms.Select>
        <UU5.Forms.Select
          label={<UU5.Bricks.Lsi lsi={Lsi.form.form} />}
          name="forms"
          value={props?.studyProgramme ? props?.studyProgramme.forms : undefined}
          required
        >
          <UU5.Forms.Select.Option value="full-time" content={<UU5.Bricks.Lsi lsi={Lsi.form.form.fullTime} />} />
          <UU5.Forms.Select.Option value="part-time" content={<UU5.Bricks.Lsi lsi={Lsi.form.form.partTime} />} />
        </UU5.Forms.Select>
        <UU5.Forms.Select
          label={<UU5.Bricks.Lsi lsi={Lsi.form.languages} />}
          name="languages"
          value={props?.studyProgramme ? props?.studyProgramme.languages : undefined}
          required
        >
          <UU5.Forms.Select.Option value="CZ" content={<UU5.Bricks.Lsi lsi={Lsi.form.languages.czech} />} />
          <UU5.Forms.Select.Option value="EN" content={<UU5.Bricks.Lsi lsi={Lsi.form.languages.english} />} />
        </UU5.Forms.Select>
        <UU5.Forms.Number
          label={<UU5.Bricks.Lsi lsi={Lsi.form.credits} />}
          name="credits"
          value={props?.studyProgramme ? props?.studyProgramme.credits : undefined}
          min={0}
          max={300}
          step={1}
          valueType="number"
          required
        />
        <UU5.Forms.Controls controlled={false} />
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  }
});

export default StudyProgrammeAddForm;