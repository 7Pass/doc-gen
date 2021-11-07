import { useState } from "preact/hooks";

import { Section } from "./Section";
import { useOutput } from "../output";
import { ISection } from "../flow/models";

import { Output } from "./Output";
import { TemplateInput } from "./TemplateInput";
import { QuestionsInput } from "./QuestionsInput";

export function App() {
    const [output, dispatch] = useOutput();
    const [template, setTemplate] = useState("");
    const [sections, setSections] = useState<ISection[]>([]);

    return (
        <>
            <p>Select questions and output template</p>
            <form>
                <QuestionsInput onChange={setSections} />
                <TemplateInput onChange={setTemplate} />
            </form>
            {sections.map((section) => (
                <Section
                    key={section.id}
                    section={section}
                    dispatch={dispatch}
                />
            ))}
            <Output template={template} output={output} />
        </>
    );
}
