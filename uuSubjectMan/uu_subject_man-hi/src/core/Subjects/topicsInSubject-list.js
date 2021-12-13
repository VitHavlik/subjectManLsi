//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList, useRef, useUnmountedRef, useCallback } from "uu5g04-hooks";
import Calls from "../../calls";
import Config from "../config/config";
import Lsi from "./lsi/topicsInSubject-list-lsi"

import TopicsInSubjectListReady from "./topicsInSubject-list-ready"

import TopicCreateModal from "../../bricks/Topics/topic-create-modal"
import DigitalContentCreateModal from "../../bricks/DigitalContent/digitalContent-create-modal"

//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const TopicsInSubjectList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        subjectId: UU5.PropTypes.string
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        subjectId: ""
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

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
                            <TopicsInSubjectListReady data={data}
                            handleTopicAdd={handleTopicAdd}
                            handleDigitalContentAdd={handleDigitalContentAdd}
                            handleDigitalContentRemove={handleDigitalContentRemove}
                            />
                        </>
                    );
                    break;
                case "error":
                case "errorNoData":
                    child = <UU5.Common.Error errorData={errorData} />
                    break;
            };
            return child;
        };

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const className = Config.Css.css``;
        // { id, className, style, disabled, hidden }
        const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
        const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

        const { state, data, newData, pendingData, errorData, handlerMap } = useDataList({
            handlerMap: {
                load: Calls.listTopicsInSubject,
                addTopic: Calls.addTopic,
                addDigitalContent: Calls.addDigitalContent,
                removeDigitalContent: Calls.removeDigitalContent
            },
            itemHandlerMap: {
            },
            initialDtoIn: { pageInfo: {}, subjectId: props.subjectId }
        });

        const alertBusRef = useRef();
        const modalRef = useRef();
        const unmountedRef = useRef();

        const showModalTopic = useCallback((onSave) => {
            const modal = modalRef.current;
            modal.open({
                header: "Přidej téma",
                content: <TopicCreateModal
                    onSave={onSave}
                    onSaveDone={(opt) => {
                        modal.close();
                        opt.component.getAlertBus().setAlert({
                            content: (<UU5.Bricks.Lsi lsi={Lsi.modal.onSaveDone.creation} />),
                            colorSchema: "success",
                        });
                    }}
                    onSaveFail={(opt) => {
                        console.debug(opt);
                        opt.component.getAlertBus().setAlert({
                            content: (<UU5.Bricks.Lsi lsi={Lsi.modal.onSaveFail.creation} />),
                            colorSchema: "danger",
                        });
                    }}
                    onCancel={() => modal.close()}
                     />,
            });
        }, []);

        
        const handleTopicAdd = useCallback((topicData) => {
            showModalTopic(async ({ component, values }) => {
                let data, error;
                const dataToSend={
                    ...values,
                    subjectId: props.subjectId
                }
                try {
                    data = await handlerMap.addTopic(dataToSend);
                } catch (e) {
                    error = e;
                    console.error(error);
                }
                if (unmountedRef.current) return;
                if (error) component.saveFail(error);
                else component.saveDone(data);
            });
        }, [showModalTopic, handlerMap.addTopic, handlerMap.load, unmountedRef]);


        const showModalDigitalContent = useCallback((onSave) => {
            const modal = modalRef.current;
            modal.open({
                header: "Přidej digitální obsah",
                content: <DigitalContentCreateModal
                    onSave={onSave}
                    onSaveDone={(opt) => {
                        modal.close();
                        opt.component.getAlertBus().setAlert({
                            content: (<UU5.Bricks.Lsi lsi={Lsi.modal.onSaveDone.creation} />),
                            colorSchema: "success",
                        });
                    }}
                    onSaveFail={(opt) => {
                        console.debug(opt);
                        opt.component.getAlertBus().setAlert({
                            content: (<UU5.Bricks.Lsi lsi={Lsi.modal.onSaveFail.creation} />),
                            colorSchema: "danger",
                        });
                    }}
                    onCancel={() => modal.close()}
                     />,
            });
        }, []);

        const handleDigitalContentAdd = useCallback((topicData) => {
            showModalDigitalContent(async ({ component, values }) => {
                let data, error;
                const dataToSend={
                    ...values,
                    id: topicData.data.id
                }
                try {
                    data = await handlerMap.addDigitalContent(dataToSend);
                } catch (e) {
                    error = e;
                    console.error(error);
                }
                if (unmountedRef.current) return;
                if (error) component.saveFail(error);
                else component.saveDone(data);
            });
        }, [showModalDigitalContent, handlerMap.addDigitalContent, handlerMap.load, unmountedRef]);


        const handleDigitalContentRemove = useCallback(async (topicData, digitalContentId) => {
            try {
                const dataToSend = {
                    id: topicData.data.id,
                    digitalContentId: digitalContentId
                }
                let data = await handlerMap.removeDigitalContent(dataToSend);
                await handlerMap.load({subjectId: props.subjectId});
            } catch (e) {
                let error = e;
                console.error(error);
            }
        }, [handlerMap.load]);

        const component = (
            <div {...attrs}>
                {UU5.Utils.Content.getChildren(props.children, props, STATICS)}
            </div>
        );

        return currentNestingLevel ? (
            <div {...attrs}>
                <UU5.Bricks.Section header={<UU5.Bricks.Lsi lsi={Lsi.header} />}>
                    {renderChild()}
                </UU5.Bricks.Section>

                <UU5.Bricks.AlertBus ref_={alertBusRef} />
                <UU5.Bricks.Modal controlled={false} ref_={modalRef} mountContent="onEachOpen" overflow />
            </div>
        ) : (
            <UU5.Bricks.LinkModal children="Visual Component" hidden={props.hidden} component={component} />
        );
        
        //@@viewOff:render
    }
});

//@@viewOn:helpers
//@@viewOff:helpers

export default TopicsInSubjectList;