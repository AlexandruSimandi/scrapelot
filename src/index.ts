import fs from "node:fs";
import ollama from "ollama";

const KEYWORDS = ["phone", "address", "location", "social", "contact"];

const fetchHtml = async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();
    return text;
};

const grepContext = (
    text: string,
    keywords: string[],
    contextLines: number = 5,
): string => {
    const lines = text.split("\n");
    const indicesToKeep = new Set<number>();

    lines.forEach((line, index) => {
        if (
            keywords.some((keyword) =>
                line.toLowerCase().includes(keyword.toLowerCase()),
            )
        ) {
            const start = Math.max(0, index - contextLines);
            const end = Math.min(lines.length - 1, index + contextLines);

            for (let i = start; i <= end; i++) {
                indicesToKeep.add(i);
            }
        }
    });

    return Array.from(indicesToKeep)
        .sort((a, b) => a - b)
        .map((i) => lines[i])
        .join("\n");
};

const WEBSITE = "mazautoglass.com";

async function main() {
    const startTime = Date.now();

    const htmlResp = await fetchHtml(`https://${WEBSITE}`);
    const reducedContext = grepContext(htmlResp, KEYWORDS);

    const ollamaResponse = await ollama.generate({
        model: "gemma3:4b",
        system: "You will receive snippets of HTML page, your job is to extract the company phone number, address, location, social media links. Return only the information on these, no extra comments or explanations",
        think: false,
        prompt: reducedContext,
        options: {
            num_ctx: 10000,
        },
    });

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(ollamaResponse.response);
    console.log(`Total time: ${duration.toFixed(5)} seconds`);
}

main();
