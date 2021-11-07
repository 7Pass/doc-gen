import Preact from "preact";
import { useState } from "preact/hooks";

import { IChoiceDispatcher } from "../output";
import { IChoice, IQuestion, ISection } from "../flow/models";

export interface QuestionProps {
    section: ISection;
    question: IQuestion;
    dispatch: IChoiceDispatcher;
}

export const Question: Preact.FunctionComponent<QuestionProps> = ({
    section,
    question,
    dispatch,
}) => {
    const onChange = (choice: IChoice) => {
        dispatch({
            section,
            question,
            choice,
        });
    };

    return (
        <div>
            <h3>{question.text}</h3>
            <Choices question={question} onChange={onChange} />
        </div>
    );
};

interface FreetextChoiceProps {
    onChange(value: string): void;
}

const FreetextChoice: Preact.FunctionComponent<FreetextChoiceProps> = ({
    onChange,
}) => {
    return (
        <input
            onInput={(e) => {
                onChange(e.currentTarget.value);
            }}
        />
    );
};

interface ChoiceProps {
    choice: IChoice;
    questionId: string;
    onChange(choice: IChoice): void;
}

const Choice: Preact.FunctionComponent<ChoiceProps> = ({
    choice,
    questionId,
    onChange,
}) => {
    return (
        <div>
            <input
                type="radio"
                id={choice.text}
                name={questionId}
                value={choice.text}
                onChange={(e) => {
                    if (!e.currentTarget.checked) {
                        return;
                    }

                    onChange({
                        text: choice.text,
                    });
                }}
            />
            <label for={choice.text}>{choice.text}</label>
        </div>
    );
};

interface ChoicesProps {
    question: IQuestion;
    onChange(choice: IChoice): void;
}

const Choices: Preact.FunctionComponent<ChoicesProps> = ({
    question,
    onChange,
}) => {
    if (!question.choices) {
        return (
            <FreetextChoice
                onChange={(value) => {
                    onChange({ text: value });
                }}
            />
        );
    }

    const id = question.id;
    const choices = question.choices
        .map((choice) =>
            typeof choice !== "string"
                ? choice
                : {
                      text: choice,
                  }
        )
        .map((x) => (
            <Choice
                key={x.text}
                choice={x}
                questionId={id}
                onChange={onChange}
            />
        ));

    return <ul>{choices}</ul>;
};
