//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "../config/config";
import StudyProgrammeTile from "../../bricks/StudyProgramme/studyProgramme-tile";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const StudyProgrammeReady = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        data: UU5.PropTypes.array,
        handleOpen: UU5.PropTypes.func,
        handleCreate: UU5.PropTypes.func,
        handleUpdate: UU5.PropTypes.func
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        data: [],
        handleOpen: ()=>{},
        handleCreate: ()=>{},
        handleUpdate: ()=>{}
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        const STUDY_PROGRAMME_ACTIONS = ({ screenSize }) => {
            return [
              {
                content: {
                  en: "Add study programme",
                  cs: "Přidej studijní program"
                },
                onClick: () => {props?.handleCreate()},
                icon: "mdi-plus-circle",
                colorSchema: "primary",
                bgStyle: "filled",
                active: true
              }
            ];
          };
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:hooks
        const addFormRef = useRef();
        //@@viewOff:hooks

        //@@viewOn:render
        const className = Config.Css.css``;
        // { id, className, style, disabled, hidden }
        const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
        const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

        const component = (
            <div {...attrs}>
                {UU5.Utils.Content.getChildren(props.children, props, STATICS)}
            </div>
        );

        return currentNestingLevel ? (
            <div {...attrs}>
                <Uu5Tiles.ControllerProvider data={props.data ? props.data : []}>
                    <Uu5Tiles.ActionBar title={""} actions={STUDY_PROGRAMME_ACTIONS}/>
                    <Uu5Tiles.Grid
                        tileMinWidth={200}
                        tileMaxWidth={500}
                        tileSpacing={8}
                        rowSpacing={8}
                    >
                        <StudyProgrammeTile 
                        key={props.data?.id}
                        handleOpen={props.handleOpen}
                        handleUpdate={props.handleUpdate}/>
                    </Uu5Tiles.Grid>
                </Uu5Tiles.ControllerProvider>
            </div>
        ) : (
            <UU5.Bricks.LinkModal children="Visual Component" hidden={props.hidden} component={component} />
        );
        //@@viewOff:render
    }
});

//@@viewOn:helpers
//@@viewOff:helpers

export default StudyProgrammeReady;