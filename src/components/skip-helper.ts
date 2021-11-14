import {IChoice, IFlowOutput, IQuestion, ISection} from "../models";

export enum SkipDetectResults {
    NoSkip,
    MaySkipButNoAnswer,
    Skip,
}

export type IDetectSkipResult = {
    result: SkipDetectResults.NoSkip | SkipDetectResults.MaySkipButNoAnswer;
} | {
    result: SkipDetectResults.Skip;
    sectionId: string;
}

export function detectSkip(
    section: ISection,
    output: IFlowOutput,
    question: IQuestion
): IDetectSkipResult {
    const choices = question.choices;
    if (!choices) {
        // No choice that will cause skip
        return {
            result: SkipDetectResults.NoSkip,
        };
    }

    const choicesWithSkip = choices
        .filter(
            (x): x is IChoice => typeof x !== "string" && x.next !== undefined
        );
    if (!choicesWithSkip.length) {
        // No choice that will cause skip
        return {
            result: SkipDetectResults.NoSkip,
        };
    }

    const answer = output[section.id]?.[question.id];
    if (answer === undefined) {
        // No answer provided
        return {
            result: SkipDetectResults.MaySkipButNoAnswer,
        };
    }

    const choiceCausingSkip = choicesWithSkip.find(x => x.text === answer);
    if (!choiceCausingSkip) {
        return {
            result: SkipDetectResults.NoSkip,
        }
    }

    return {
        result: SkipDetectResults.Skip,
        sectionId: choiceCausingSkip.next!,
    };
}