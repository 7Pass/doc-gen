export interface IChoice {
    text: string;

    /**
     * A matching @see {IQuestion.id} to jump to if this question is selected.
     */
    next?: string;
}

export interface IQuestion {
    id: string;
    text: string;

    /**
     * Choices for multiple choice questions.
     */
    choices?: Array<IChoice | string>;
}

export interface ISection {
    id: string;
    questions: IQuestion[];
}

export type ISectionOutput = Record<string, string>;
export type IFlowOutput = Record<string, ISectionOutput>;