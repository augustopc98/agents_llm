import OpenAI from "openai";

export const name = "RepositoryLayerAgent";

const openai = new OpenAI();

async function createRepositoryLayerAgent() {
    const repositoryLayerAgent = await openai.beta.assistants.create({
        instructions:
            "You are an expert in Domain-Driven Design (DDD). Extend the provided PlantUML class diagram by defining the repository layer. Generate the repository interfaces and implementations based on the given domain model.",
        name: "RepositoryLayerAgent",
        model: "gpt-3.5-turbo"
    });
    return repositoryLayerAgent;
}

export { createRepositoryLayerAgent };
