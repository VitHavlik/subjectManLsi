//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useLsiValues, useDataList, useRef, useImperativeHandle } from "uu5g04-hooks";
import Calls from "../../calls";
import Config from "../config/config";
import Lsi from "./lsi/subjects-select-modal-lsi";
//@@viewOff:imports

const SubjectsSelectModal = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectsSelectModal",
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
    const { state, data, newData, pendingData, errorData, handlerMap } = useDataList({
      handlerMap: {
        load: Calls.listSubjects
      },
      itemHandlerMap: {
      },
      initialDtoIn: { pageInfo: {} }
    });
    //@@viewOn:hooks

    //@@viewOn:private
    const renderChild = () => {
      let child;
      switch (state) {
        case "pendingNoData":
        case "pending":
          child = <UU5.Bricks.Loading />
          break;
        case "ready":
        case "readyNoData":
          child = (
            <>
              <UU5.Forms.Form
                onSave={props.onSave}
                onSaveDone={props.onSaveDone}
                onSaveFail={props.onSaveFail}
                onCancel={props.onCancel}
              >
                <UU5.Forms.Select
                  label={<UU5.Bricks.Lsi lsi={Lsi.form.subjects} />}
                  name="subjectId"
                  required
                >
                  {
                    data?.map((subj) => (
                      <UU5.Forms.Select.Option key={subj.data.id} value={subj.data.id} content={subj.data.name} />
                    ))
                  }
                </UU5.Forms.Select>
                <UU5.Forms.Number
                  label={<UU5.Bricks.Lsi lsi={Lsi.form.semester} />}
                  name="semester"
                  value={0}
                  min={0}
                  max={10}
                  step={1}
                  valueType="number"
                  required
                />
                <UU5.Forms.Controls controlled={false} />
              </UU5.Forms.Form>
            </>
          )
          break;
        case "error":
        case "errorNoData":
          child = <UU5.Common.Error errorData={errorData} />
          break;
      };
      return child;
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        {renderChild()}
      </>
    );
    //@@viewOff:render
  }
});

export default SubjectsSelectModal;