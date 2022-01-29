//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../core/config/config";
import Lsi from "./lsi/studyProgramme-tile-lsi";

//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const StudyProgrammeTile = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        data: UU5.PropTypes.object,
        handleOpen: UU5.PropTypes.func,
        handleUpdate: UU5.PropTypes.func
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        data: null,
        handleOpen: ()=>{},
        handleUpdate: ()=>{}
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        const MENU_ACTIONS = [
            { icon: "mdi-pencil", content: <UU5.Bricks.Lsi lsi={Lsi.menuActions.editProgramme} />, onClick: () => props.handleUpdate(props.data) }
          ];
      

        const prepareRow = (attribute, content) => {
            return (
                <UU5.BlockLayout.Row>
                    <UU5.BlockLayout.Text>
                        <UU5.Bricks.Row>
                            <UU5.Bricks.Column colWidth="xs-6">{attribute}</UU5.Bricks.Column>
                            <UU5.Bricks.Column colWidth="xs-6">{content}</UU5.Bricks.Column>
                        </UU5.Bricks.Row>
                    </UU5.BlockLayout.Text>
                </UU5.BlockLayout.Row>
            )
        };
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
                <UU5.BlockLayout.Tile>
                    <UU5.BlockLayout.Block  actions={MENU_ACTIONS}>
                        <UU5.BlockLayout.Row>
                            <UU5.Bricks.Link>
                                <UU5.BlockLayout.Text weight="primary"><UU5.Bricks.Link onClick={()=>props.handleOpen(props.data.data)}><UU5.Bricks.Lsi lsi={Lsi.tile.header} /></UU5.Bricks.Link></UU5.BlockLayout.Text>
                            </UU5.Bricks.Link>
                        </UU5.BlockLayout.Row>
                    </UU5.BlockLayout.Block>
                    <UU5.BlockLayout.Line />
                    <UU5.BlockLayout.Block>
                        <UU5.BlockLayout.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Column colWidth="xs-6"><UU5.Bricks.Lsi lsi={Lsi.tile.name} /></UU5.Bricks.Column>
                                <UU5.Bricks.Column colWidth="xs-6">{props.data.data?.name}</UU5.Bricks.Column>
                            </UU5.Bricks.Row>
                        </UU5.BlockLayout.Row>

                        <UU5.BlockLayout.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Column colWidth="xs-6"><UU5.Bricks.Lsi lsi={Lsi.tile.description} /></UU5.Bricks.Column>
                                <UU5.Bricks.Column colWidth="xs-6">{props.data.data?.description}</UU5.Bricks.Column>
                            </UU5.Bricks.Row>
                        </UU5.BlockLayout.Row>

                        <UU5.BlockLayout.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Column colWidth="xs-6"><UU5.Bricks.Lsi lsi={Lsi.tile.form} /></UU5.Bricks.Column>
                                <UU5.Bricks.Column colWidth="xs-6">{props.data.data?.forms}</UU5.Bricks.Column>
                            </UU5.Bricks.Row>
                        </UU5.BlockLayout.Row>

                        <UU5.BlockLayout.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Column colWidth="xs-6"><UU5.Bricks.Lsi lsi={Lsi.tile.language} /> </UU5.Bricks.Column>
                                <UU5.Bricks.Column colWidth="xs-6">{props.data.data?.languages}</UU5.Bricks.Column>
                            </UU5.Bricks.Row>
                        </UU5.BlockLayout.Row>

                        <UU5.BlockLayout.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Column colWidth="xs-6"><UU5.Bricks.Lsi lsi={Lsi.tile.degree} /> </UU5.Bricks.Column>
                                <UU5.Bricks.Column colWidth="xs-6">{props.data.data?.degree}</UU5.Bricks.Column>
                            </UU5.Bricks.Row>
                        </UU5.BlockLayout.Row>

                        <UU5.BlockLayout.Row>
                            <UU5.Bricks.Row>
                                <UU5.Bricks.Column colWidth="xs-6"><UU5.Bricks.Lsi lsi={Lsi.tile.created} /></UU5.Bricks.Column>
                                
                                <UU5.Bricks.Column colWidth="xs-6">
                                <UU5.Bricks.DateTime
                                        timeZone={UU5.Environment.dateTimeZone}
                                        value={props.data.data?.sys.cts}
                                    />
                                </UU5.Bricks.Column>
                            </UU5.Bricks.Row>
                        </UU5.BlockLayout.Row>

                    </UU5.BlockLayout.Block>
                </UU5.BlockLayout.Tile>
            </div>
        ) : (
            <UU5.Bricks.LinkModal children="Visual Component" hidden={props.hidden} component={component} />
        );
        //@@viewOff:render
    }
});

//@@viewOn:helpers
//@@viewOff:helpers

export default StudyProgrammeTile;