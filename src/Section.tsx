import Preact from "preact";

import { Question } from "./Question";
import { ISection } from "./flow/models";
import { IChoiceDispatcher } from "./output";

export interface SectionProps {
    section: ISection;
    dispatch: IChoiceDispatcher;
}

export const Section: Preact.FunctionComponent<SectionProps> = ({
    section,
    dispatch,
}) => {
    const questions = section.questions.map((question) => (
        <Question
            key={question.id}
            section={section}
            dispatch={dispatch}
            question={question}
        />
    ));

    return <div>{questions}</div>;
};
