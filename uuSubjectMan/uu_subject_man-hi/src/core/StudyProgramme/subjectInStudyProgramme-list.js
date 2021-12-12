//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList, useRef, useUnmountedRef, useCallback } from "uu5g04-hooks";
import Calls from "../../calls";
import Config from "../config/config";
import Lsi from "./lsi/subjectInStudyProgramme-list-lsi"
import SubjectInStudyProgrammeListReady from "./subjectInStudyProgramme-list-ready";

import SubjectsSelectModal from "../../bricks/Subjects/subjects-select-modal"

//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const SubjectInStudyProgrammeList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        studyProgrammeId: UU5.PropTypes.string
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        studyProgrammeId: ""
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
                            <SubjectInStudyProgrammeListReady data={data}
                                handleSubjectAdd={handleSelectSubject}
                                handleSubjectRemove={handleRemoveSubject}
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
                load: Calls.listSubjectsByStudyProgramme,
                asignSubject: Calls.asignSubject,
                removeSubject: Calls.removeSubject
            },
            itemHandlerMap: {
            },
            initialDtoIn: { pageInfo: {}, studyProgrammeId: props.studyProgrammeId }
        });

        const alertBusRef = useRef();
        const modalRef = useRef();
        const unmountedRef = useRef();


        const showModal = useCallback((subject, onSave) => {
            const modal = modalRef.current;
            modal.open({
                header: "Vyber předmět",
                content: <SubjectsSelectModal
                    onSave={onSave}
                    onSaveDone={(opt) => {
                        modal.close();
                        opt.component.getAlertBus().setAlert({
                            content: (subject ? <UU5.Bricks.Lsi lsi={Lsi.modal.onSaveDone.edit} /> : <UU5.Bricks.Lsi lsi={Lsi.modal.onSaveDone.creation} />),
                            colorSchema: "success",
                        });
                    }}
                    onSaveFail={(opt) => {
                        console.debug(opt);
                        opt.component.getAlertBus().setAlert({
                            content: (subject ? <UU5.Bricks.Lsi lsi={Lsi.modal.onSaveFail.edit} /> : <UU5.Bricks.Lsi lsi={Lsi.modal.onSaveFail.creation} />),
                            colorSchema: "danger",
                        });
                    }}
                    onCancel={() => modal.close()}
                />,
            });
        }, []);

        const handleSelectSubject = useCallback(() => {
            showModal(null, async ({ component, values }) => {
                let data, error;
                try {
                    const dataToAsign = {
                        id: values.subject,
                        studyProgrammeId: props.studyProgrammeId
                    }
                    data = await handlerMap.asignSubject(dataToAsign);
                } catch (e) {
                    error = e;
                    console.error(error);
                }
                if (unmountedRef.current) return;
                if (error) component.saveFail(error);
                else component.saveDone(data);
            });
        }, [showModal, handlerMap.asignSubject, handlerMap.load, unmountedRef]);


        const handleRemoveSubject = useCallback(async (subjectId) => {
            try {
                const dataToAsign = {
                    id: subjectId,
                    studyProgrammeId: props.studyProgrammeId
                }
                let data = await handlerMap.removeSubject(dataToAsign);
                await handlerMap.load({studyProgrammeId: props.studyProgrammeId});
            } catch (e) {
                let error = e;
                console.error(error);
            }
        }, [handlerMap.load, unmountedRef]);

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

export default SubjectInStudyProgrammeList;