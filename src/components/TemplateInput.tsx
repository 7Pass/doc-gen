import Preact from "preact";

import { readTextFromFile } from "./file-reader";

export interface TemplateInputProps {
    onChange(template: string): void;
}

export const TemplateInput: Preact.FunctionComponent<TemplateInputProps> = ({
    onChange,
}) => {
    const readFileContent = async (
        e: Preact.JSX.TargetedEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const template = await readTextFromFile(e.currentTarget);
        if (template) {
            onChange(template);
        }
    };

    return (
        <input
            type="file"
            name="template"
            accept="*.liquid"
            onChange={(e) => readFileContent(e)}
        />
    );
};
