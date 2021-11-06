import { useState } from "preact/hooks";
import { ISection } from "./flow/models";

import { Logo } from "./logo";
import { Section } from "./Section";
import { TemplateInput } from "./TemplateInput";
import { QuestionsInput } from "./QuestionsInput";
import { useOutput } from "./output";

export function App() {
    const [output, dispatch] = useOutput();
    const [template, setTemplate] = useState("");
    const [sections, setSections] = useState<ISection[]>([]);

    return (
        <>
            <Logo />
            <p>Hello Vite + Preact!</p>
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
        </>
    );
}
