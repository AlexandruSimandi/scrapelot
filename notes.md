Simple idea:
First crawl for /about and /contact kind of pages to take the quick wins
it usually has address and either phone or email depending on business context
Most websites also have in footer links for contact + social media and almost always address, but this depends a lot on the website's design and layout.

AI idea:
from: https://claude.ai/share/f96342f7-175b-4d51-b624-7623ef364d9b

crawling with AI https://docs.crawl4ai.com/

options: qwen3, mistral nemo, gemma??, deepseek, 
glm 4.7-flash can run on my machine but i am absolutely sure it's cost ineffective given veridion crawls the whole planet.
The claude research is a bit outdated, what i consider top of the line for lightweight AI models:
https://ollama.com/library/ministral-3
qwen3, maybe the coder variant since it might be trained more on html?
qwen3 has mandatory thinking so it's too slow
gemma3 works fine 10-12 seconds per site but since we have almost 1000 sites, that would be 200 minutes, not 10.... it's best to use AI as a fallback when deterministic crawling fails.
Even with a smaller model, it would need to be 20 times faster

I could also do https://ollama.com/library/reader-lm and then process markdown but that's maybe a bit too deep
or: https://ollama.com/Inference/Schematron

it seems nobody made any dedicated open weight html trained models, at least a capable one?
