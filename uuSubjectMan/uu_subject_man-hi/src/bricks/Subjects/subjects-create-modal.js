//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useLsiValues, useContext, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "../config/config";
import Lsi from "./lsi/subjects-create-modal-lsi";
//@@viewOff:imports

const SubjectsCreateModal = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectsCreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.object,
    onSave: UU5.PropTypes.func,
    onSaveDone: UU5.PropTypes.func,
    onSaveFail: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: null,
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
          value={props?.subject ? props?.subject.name : undefined}
          inputAttrs={{ maxLength: 255 }}
          controlled={false}
          required
        />
        <UU5.Forms.Text
          label={<UU5.Bricks.Lsi lsi={Lsi.form.goal} />}
          name="goal"
          value={props?.subject ? props?.subject.goal : undefined}
          inputAttrs={{ maxLength: 255 }}
          controlled={false}
          required
        />
        <UU5.Forms.Select
          label={<UU5.Bricks.Lsi lsi={Lsi.form.languages} />}
          name="language"
          value={props?.subject ? props?.subject.language : undefined}
          required
        >
          <UU5.Forms.Select.Option value="CZ" content={<UU5.Bricks.Lsi lsi={Lsi.form.languages.czech} />} />
          <UU5.Forms.Select.Option value="EN" content={<UU5.Bricks.Lsi lsi={Lsi.form.languages.english} />} />
        </UU5.Forms.Select>
        <UU5.Forms.Number
          label={<UU5.Bricks.Lsi lsi={Lsi.form.credits} />}
          name="credits"
          value={props?.subject ? props?.subject.credits : undefined}
          min={0}
          max={300}
          step={1}
          valueType="number"
          required
        />
        <UU5.Forms.TagSelect
          label={<UU5.Bricks.Lsi lsi={Lsi.form.teachers} />}
          name="teachers"
          value={props?.subject ? props?.subject.teachers : undefined}
          allowCustomTags
          required
        />
        <UU5.Forms.Text
          label={<UU5.Bricks.Lsi lsi={Lsi.form.guarantor} />}
          name="guarantor"
          value={props?.subject ? props?.subject.guarantor : undefined}
          allowCustomTags
          required
        />
        <UU5.Forms.Controls controlled={false} />
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  }
});

export default SubjectsCreateModal;