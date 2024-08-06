import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const name = "SpringBootCodeAgent";

async function createSpringBootCodeAgent() {
    return async function generateSpringBootCode(umlDescription) {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: `Generate comprehensive Spring Boot code for the following UML diagram extended with Domain-Driven Design (DDD). Ensure the code includes well-defined interfaces, repositories, services, and necessary configurations:\n\n${umlDescription}\n\nProvide the output in PlantUML format.` }
            ],
        });

        return response.choices[0].message.content;
    }
}

export { createSpringBootCodeAgent };
