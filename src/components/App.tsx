import { useEffect, useState } from "preact/hooks";

import { ISection } from "../models";
import { useOutput } from "../output";

import { Output } from "./Output";
import { Section } from "./Section";

const DEFAULT_TEMPLATE = "example";

function getTemplateId(): string {
    const PREFIX = "?template=";
    const search = location.search;

    if (!search || !search.startsWith(PREFIX)) {
        return DEFAULT_TEMPLATE;
    }

    return search.substring(PREFIX.length);
}

export function App() {
    const [output, dispatch] = useOutput();
    const [template, setTemplate] = useState("");
    const [sections, setSections] = useState<ISection[]>([]);

    useEffect(() => {
        const id = getTemplateId();

        fetch(`templates/${id}/questions.json`)
            .then((x) => x.json())
            .then((x) => setSections(x.sections));
        fetch(`templates/${id}/template.md`)
            .then((x) => x.text())
            .then(setTemplate);
    }, []);

    return (
        <>
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
