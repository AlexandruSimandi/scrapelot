import fs from "node:fs";
import ollama from "ollama";

const fetchHtml = async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();
    return text;
};

const WEBSITE = "mazautoglass.com";

async function main() {
    const startTime = Date.now();

    const htmlResp = await fetchHtml(`https://${WEBSITE}`);
    // fs.writeFileSync("output.html", htmlResp);
    // console.log(htmlResp);

    const ollamaResponse = await ollama.generate({
        model: "gemma3:4b",
        system: "You will receive a HTML page, your job is to extract the company phone number, address, location, social media links. Return only the information on these, no extra comments or explanations",
        think: false,
        prompt: htmlResp,
        options: {
            num_ctx: 30000,
        },
    });

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(ollamaResponse.response);
    console.log(`Total time: ${duration.toFixed(5)} seconds`);
}

main();
