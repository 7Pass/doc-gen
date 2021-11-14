import { render } from "preact";

import { IFlowOutput } from "./models";
import { Output } from "./components/Output";
import { Questionair } from "./components/Questionair";

function getTemplateId(): string {
    const url = new URL(location.href);
    return url.searchParams.get("template") || "example";
}

const templateId = getTemplateId();
const target = document.getElementById("app")!;

const onComplete = (output: IFlowOutput) => {
    render(<Output templateId={templateId} output={output} />, target);
};

render(<Questionair templateId={templateId} onComplete={onComplete} />, target);
