import OpenAI from "openai";

export const name = "SpringBootCodeAgent";

const openai = new OpenAI();

async function createSpringBootCodeAgent() {
    const springBootCodeAgent = await openai.beta.assistants.create({
        instructions:
            "You are an expert in Spring Boot and Domain-Driven Design (DDD). Generate Spring Boot code for the provided PlantUML class diagram. Implement the service, repository layers, and necessary configurations.",
        name: "SpringBootCodeAgent",
        model: "gpt-3.5-turbo"
    });
    return springBootCodeAgent;
}

export { createSpringBootCodeAgent };
