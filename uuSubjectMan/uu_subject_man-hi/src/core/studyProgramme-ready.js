//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import StudyProgrammeTile from "./studyProgramme-tile";
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
        data: UU5.PropTypes.array
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        data: []
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

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
                    <Uu5Tiles.ActionBar/>
                    <Uu5Tiles.Grid
                        tileMinWidth={200}
                        tileMaxWidth={500}
                        tileSpacing={8}
                        rowSpacing={8}
                    >
                        <StudyProgrammeTile key={props.data?.id}/>
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