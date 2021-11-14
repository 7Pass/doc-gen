import Preact from "preact";
import { useEffect, useState } from "preact/hooks";

import { useOutput } from "./hooks";
import { IFlowOutput, ISection } from "../models";
import { detectSkip, SkipDetectResults } from "./skip-helper";

import { Section } from "./Section";

export interface QuestionairProps {
    templateId: string;
    onComplete(output: IFlowOutput): void;
}

export const Questionair: Preact.FunctionComponent<QuestionairProps> = ({
    templateId,
    onComplete,
}) => {
    const [output, dispatch] = useOutput();
    const [title, setTitle] = useState("");
    const [sections, setSections] = useState<ISection[]>([]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

    useEffect(() => {
        setCurrentSectionIndex(0);
        import("milligram/dist/milligram.min.css");

        fetch(`templates/${templateId}/questions.json`)
            .then((x) => x.json())
            .then((x) => {
                setTitle(x.title);
                setSections(x.sections);
            });
    }, []);

    const section = sections[currentSectionIndex];
    if (!section) {
        return <div>Loading...</div>;
    }

    const goNext = () => {
        for (const question of section.questions) {
            const detect = detectSkip(section, output, question);
            if (detect.result !== SkipDetectResults.Skip) {
                continue;
            }

            if (detect.sectionId === "") {
                // Completed
                onComplete(output);
                return;
            }

            const next = sections.findIndex((x) => x.id === detect.sectionId);

            if (next) {
                setCurrentSectionIndex(next);
                return;
            }
        }

        if (currentSectionIndex === sections.length - 1) {
            onComplete(output);
        }

        setCurrentSectionIndex(currentSectionIndex + 1);
    };

    return (
        <div class="container">
            <h1>{title}</h1>
            <hr />

            <Section
                output={output}
                section={section}
                dispatch={dispatch}
                showNext={currentSectionIndex < sections.length - 1}
                showPrevious={currentSectionIndex > 0}
                onNext={goNext}
                onPrevious={() =>
                    setCurrentSectionIndex(currentSectionIndex - 1)
                }
            />
        </div>
    );
};
