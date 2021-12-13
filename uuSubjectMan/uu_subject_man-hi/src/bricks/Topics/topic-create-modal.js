//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useLsiValues, useContext, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "../config/config";
import Lsi from "./lsi/topic-create-modal-lsi";
//@@viewOff:imports

const TopicCreateModal = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "DigitalContentCreateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSave: UU5.PropTypes.func,
    onSaveDone: UU5.PropTypes.func,
    onSaveFail: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
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
          value=""
          inputAttrs={{ maxLength: 255 }}
          controlled={false}
          required
        />
        <UU5.Forms.Text
          label={<UU5.Bricks.Lsi lsi={Lsi.form.description} />}
          name="description"
          value=""
          inputAttrs={{ maxLength: 255 }}
          controlled={false}
          required
        />
        

        <UU5.Forms.Controls controlled={false} />
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  }
});

export default TopicCreateModal;