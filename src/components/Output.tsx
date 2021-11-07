import Preact from "preact";
import MarkdownIt from "markdown-it";
import { Liquid, Template } from "liquidjs";
import { useEffect, useState } from "preact/hooks";

import { IFlowOutput } from "../flow/models";

export interface OutputProps {
    template: string;
    output: IFlowOutput;
}

const liquid = new Liquid();
const markdown = new MarkdownIt();

export const Output: Preact.FunctionComponent<OutputProps> = ({
    template,
    output,
}) => {
    const [html, setHtml] = useState("");
    const [parsed, setParsed] = useState<Template[]>([]);

    useEffect(() => {
        if (!template) {
            setParsed([]);
            return;
        }

        setParsed(liquid.parse(template));
    }, [template]);

    useEffect(() => {
        if (!parsed.length) {
            setHtml("");
            return;
        }

        liquid.render(parsed, output).then((md) => {
            setHtml(markdown.render(md));
        });
    }, [parsed, output]);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
