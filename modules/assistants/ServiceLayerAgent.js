import OpenAI from "openai";

export const name = "ServiceLayerAgent";

const openai = new OpenAI();

async function createServiceLayerAgent() {
    const serviceLayerAgent = await openai.beta.assistants.create({
        instructions:
            "You are an expert in Domain-Driven Design (DDD). Extend the provided PlantUML class diagram by defining the service layer. Generate the service interfaces and implementations based on the given domain model.",
        name: "ServiceLayerAgent",
        model: "gpt-3.5-turbo"
    });
    return serviceLayerAgent;
}

export { createServiceLayerAgent };
