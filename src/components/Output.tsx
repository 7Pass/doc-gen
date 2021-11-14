import Preact from "preact";
import MarkdownIt from "markdown-it";
import { Liquid, Template } from "liquidjs";
import { useEffect, useState } from "preact/hooks";

import { IFlowOutput } from "../models";

export interface OutputProps {
    templateId: string;
    output: IFlowOutput;
}

const liquid = new Liquid();
const markdown = new MarkdownIt();

export const Output: Preact.FunctionComponent<OutputProps> = ({
    templateId,
    output,
}) => {
    const [html, setHtml] = useState("");
    const [parsed, setParsed] = useState<Template[]>([]);

    useEffect(() => {
        fetch(`templates/${templateId}/template.md`)
            .then((x) => x.text())
            .then((template) => {
                if (!template) {
                    setParsed([]);
                    return;
                }

                setParsed(liquid.parse(template));
            });
    }, []);

    useEffect(() => {
        if (!parsed.length) {
            setHtml("");
            return;
        }

        liquid.render(parsed, output).then((md) => {
            setHtml(markdown.render(md));
        });
    }, [parsed, output]);

    if (!parsed.length) {
        return <div>Loading...</div>;
    }

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
