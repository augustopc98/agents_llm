import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const name = "RepositoryLayerAgent";

async function createRepositoryLayerAgent() {
    return async function extendUMLWithRepositoryLayer(umlDescription) {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: `Extend the following UML diagram that has a service layer with a repository layer following Domain-Driven Design (DDD) in PlantUML format. Ensure the output includes all necessary classes, interfaces, methods, and relationships for a repository layer:\n\n${umlDescription}\n\nProvide the output in PlantUML format.` }
            ],
        });

        return response.choices[0].message.content;
    }
}

export { createRepositoryLayerAgent };
