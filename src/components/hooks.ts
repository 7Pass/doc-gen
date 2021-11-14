import {useReducer} from "preact/hooks";
import {IChoice, IFlowOutput, IQuestion, ISection} from "../models";

export interface ChoiceArguments {
    choice: IChoice;
    section: ISection;
    question: IQuestion;
}

export type IChoiceDispatcher = (args: ChoiceArguments) => void;

export function updateChoice(
    current: IFlowOutput,
    {choice, question, section}: ChoiceArguments,
): IFlowOutput {
    const sectionOutput = current[section.id] || {};

    return {
        ...current,
        [section.id]: {
            ...sectionOutput,
            [question.id]: choice.text,
        },
    };
}

export function useOutput() {
    return useReducer(updateChoice, {});
}