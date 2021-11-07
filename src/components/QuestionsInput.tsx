import Preact from "preact";

import { IFlow, ISection } from "../flow/models";
import { readTextFromFile } from "./file-reader";

export interface QuestionsInputProps {
    onChange(sections: ISection[]): void;
}

export const QuestionsInput: Preact.FunctionComponent<QuestionsInputProps> = ({
    onChange,
}) => {
    const readFileContent = async (
        e: Preact.JSX.TargetedEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const json = await readTextFromFile(e.currentTarget);
        if (!json) {
            return;
        }

        const obj = JSON.parse(json) as {} | IFlow;
        if ("sections" in obj) {
            onChange(obj.sections);
        }
    };

    return (
        <input
            type="file"
            name="questions"
            accept="*.json"
            onChange={(e) => readFileContent(e)}
        />
    );
};
