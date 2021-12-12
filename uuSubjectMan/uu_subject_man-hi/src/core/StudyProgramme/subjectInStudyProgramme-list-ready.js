//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const SubjectInStudyProgrammeListReady = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        data: UU5.PropTypes.array,
        studyProgrammeId: UU5.PropTypes.string,
        handleSubjectAdd: UU5.PropTypes.func,
        handleSubjectRemove: UU5.PropTypes.func
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        data: [],
        studyProgrammeId: "",
        handleSubjectAdd: () => { },
        handleSubjectRemove: () => { }
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        const SUBJECTS_ACTIONS = ({ screenSize }) => {
            return [
                {
                    content: {
                        en: "Add subject",
                        cs: "Přidej předmět"
                    },
                    onClick: () => { props?.handleSubjectAdd() },
                    icon: "mdi-plus-circle",
                    colorSchema: "primary",
                    bgStyle: "filled",
                    active: true
                }
            ];
        };

        const SUBJECT_COLUMNS = [
            {
                cell: cellProps => <UU5.Bricks.Lsi lsi={cellProps.data.data.name} />,
                header: <UU5.Bricks.Lsi lsi={{ en: "Species", cs: "Název" }} />
            },
            {
                cell: cellProps => <UU5.Bricks.Lsi lsi={cellProps.data.data.credits} />,
                header: <UU5.Bricks.Lsi lsi={{ en: "Credits", cs: "Kredity" }} />
            },
            {
                cell: cellProps => <UU5.Bricks.Lsi lsi={cellProps.data.data.studyProgrammes.find(stdProg => stdProg.studyProgrammeId === props?.studyProgrammeId)?.semester} />,
                header: <UU5.Bricks.Lsi lsi={{ en: "semester", cs: "semester" }} />
            },
            {
                cell: cellProps => <UU5.Bricks.Button content="Odstaň" onClick={()=>{props.handleSubjectRemove(cellProps.data.data.id);}}></UU5.Bricks.Button>,
                cellPadding: "4px 8px",
            }
        ];
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
                    <Uu5Tiles.ActionBar title={""} actions={SUBJECTS_ACTIONS} />
                    <Uu5Tiles.List
                        rowPadding="4px 16px"
                        tileRowSpacing={8}
                        tileListPadding="8px 16px"
                        columns={SUBJECT_COLUMNS}
                    />
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

export default SubjectInStudyProgrammeListReady;