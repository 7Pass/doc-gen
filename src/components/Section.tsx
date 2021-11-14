import Preact from "preact";

import { IChoiceDispatcher } from "./hooks";
import { IFlowOutput, IQuestion, ISection } from "../models";
import { detectSkip, SkipDetectResults } from "./skip-helper";

import { Question } from "./Question";

export interface SectionProps {
    section: ISection;
    output: IFlowOutput;
    dispatch: IChoiceDispatcher;

    showNext: boolean;
    showPrevious: boolean;

    onNext(): void;
    onPrevious(): void;
}

function getQuestions(section: ISection, output: IFlowOutput): IQuestion[] {
    const index = section.questions.findIndex((question) => {
        const detect = detectSkip(section, output, question);
        return detect.result !== SkipDetectResults.NoSkip;
    });

    if (index === -1) {
        return section.questions;
    }

    return section.questions.slice(0, index + 1);
}

export const Section: Preact.FunctionComponent<SectionProps> = ({
    section,
    dispatch,
    ...props
}) => {
    const questions = getQuestions(section, props.output).map((question) => (
        <Question
            key={question.id}
            section={section}
            dispatch={dispatch}
            question={question}
        />
    ));

    return (
        <div>
            <div>{questions}</div>
            <div>
                <button
                    type="button"
                    class="button button-outline"
                    onClick={props.onPrevious}
                    disabled={!props.showPrevious}
                >
                    Previous
                </button>{" "}
                <button
                    type="button"
                    class="button button-outline"
                    onClick={props.onNext}
                    disabled={!props.showNext}
                >
                    Next
                </button>
                {!props.showNext && (
                    <div class="float-right">
                        <button
                            type="button"
                            class="button"
                            onClick={props.onNext}
                        >
                            Complete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
