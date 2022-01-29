//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../core/config/config";
import Lsi from "./lsi/topic-tile-lsi";

//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const TopicTile = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        data: UU5.PropTypes.object,
        handleOpen: UU5.PropTypes.func,
        handleUpdate: UU5.PropTypes.func,
        handleDigitalContentAdd: UU5.PropTypes.func,
        handleDigitalContentRemove: UU5.PropTypes.func
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        data: null,
        handleOpen: () => { },
        handleUpdate: () => { },
        handleDigitalContentAdd: () => { },
        handleDigitalContentRemove: () => { },
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        const MENU_ACTIONS = [
            { icon: "mdi-plus", content: "Přidej", onClick: () => props.handleDigitalContentAdd(props.data) }
        ];


        const prepareRow = (attribute, content) => {
            return (
                <UU5.BlockLayout.Row>
                    <UU5.BlockLayout.Text>
                        <UU5.Bricks.Row>
                            <UU5.Bricks.Column colWidth="xs-4">{attribute}</UU5.Bricks.Column>
                            <UU5.Bricks.Column colWidth="xs-8">{content}</UU5.Bricks.Column>
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
                    <UU5.BlockLayout.Block actions={MENU_ACTIONS}>
                        <UU5.BlockLayout.Row weight="primary">
                            <UU5.BlockLayout.Column width={150}><UU5.Bricks.Lsi lsi={Lsi.tile.name} /></UU5.BlockLayout.Column>
                            <UU5.BlockLayout.Column width={150}>{props.data.data?.name}</UU5.BlockLayout.Column>
                        </UU5.BlockLayout.Row>
                    </UU5.BlockLayout.Block>
                    <UU5.BlockLayout.Line />
                    <UU5.BlockLayout.Block>
                        {
                            props.data.data?.digitalContents?.map((elemnt) => (
                                <UU5.BlockLayout.Row>
                                    <UU5.BlockLayout.Column width={200}>{elemnt.name}</UU5.BlockLayout.Column>
                                    <UU5.BlockLayout.Column width={200}><UU5.Bricks.Link href={elemnt.link} target="_blank"><UU5.Bricks.Lsi lsi = {Lsi.tile.link} /></UU5.Bricks.Link></UU5.BlockLayout.Column>
                                    {
                                        () => {
                                            if (elemnt.type === "video")
                                                return (
                                                    <>
                                                        <UU5.BlockLayout.Column>
                                                            <UU5.Bricks.Icon icon="plus4u-video" />
                                                        </UU5.BlockLayout.Column>
                                                        <UU5.BlockLayout.Column>
                                                            <UU5.Bricks.YoutubeVideo src={elemnt.link} />
                                                        </UU5.BlockLayout.Column>
                                                    </>
                                                )
                                            else if (elemnt.type === "youtube")
                                                return (
                                                    <>
                                                        <UU5.BlockLayout.Column>
                                                            <UU5.Bricks.Icon icon="plus4u-video" />
                                                        </UU5.BlockLayout.Column>
                                                        <UU5.BlockLayout.Column>
                                                            <UU5.Bricks.YoutubeVideo size="xs" src={elemnt.link} />
                                                        </UU5.BlockLayout.Column>
                                                    </>
                                                )
                                            else if (elemnt.type === "uuBook")
                                                return (
                                                    <>
                                                        <UU5.BlockLayout.Column>
                                                            <UU5.Bricks.Icon icon="plus4u-book" />
                                                        </UU5.BlockLayout.Column>
                                                    </>
                                                )
                                            else if (elemnt.type === "uuCourse")
                                                return (
                                                    <>
                                                        <UU5.BlockLayout.Column>
                                                            <UU5.Bricks.Icon icon="plus4u-do-it" />
                                                        </UU5.BlockLayout.Column>
                                                    </>
                                                )
                                            else if (elemnt.type === "link")
                                                return (
                                                    <>
                                                        <UU5.BlockLayout.Column>
                                                            <UU5.Bricks.Icon icon="plus4u-link" />
                                                        </UU5.BlockLayout.Column>
                                                    </>
                                                )
                                            else
                                                return <UU5.Bricks.Icon icon="plus4u5-close" />
                                        }
                                    }
                                    <UU5.BlockLayout.Column width={150}><UU5.Bricks.Button onClick={()=>{props?.handleDigitalContentRemove(props.data, elemnt.id)}}><UU5.Bricks.Lsi lsi = {Lsi.tile.delete} /></UU5.Bricks.Button></UU5.BlockLayout.Column>
                                </UU5.BlockLayout.Row>
                            ))
                        }
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

export default TopicTile;