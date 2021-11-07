export function readTextFromFile(input: HTMLInputElement): Promise<string> {
    return new Promise<string>(resolve => {
        const file = input.files?.[0];
        if (!file) {
            resolve("");
            return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            const result = loadEvent.target?.result;
            const text = typeof result === "string" ? result : "";

            resolve(text);
        };

        reader.readAsText(file);
    });
}