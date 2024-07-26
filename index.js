import 'dotenv/config'; // Importa dotenv y carga las variables de entorno
import OpenAI from "openai";
import { createServiceLayerAgent } from "./modules/assistants/ServiceLayerAgent.js";
import { createRepositoryLayerAgent } from "./modules/assistants/RepositoryLayerAgent.js";
import { createSpringBootCodeAgent } from "./modules/assistants/SpringBootCodeAgent.js";
import { initResults, writeResult } from "./modules/helpers/resultLogWriter.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
    const experimentName = "DDD-Extension";
    initResults(experimentName);

    // Create agents
    const serviceLayerAgent = await createServiceLayerAgent();
    const repositoryLayerAgent = await createRepositoryLayerAgent();
    const springBootCodeAgent = await createSpringBootCodeAgent();

    // Example input UML text
    const umlText = `
        @startuml
        class User {
          +String name
          +String email
          +void login()
        }
        class Order {
          +int orderId
          +Date date
          +void placeOrder()
        }
        User -- Order
        @enduml
    `;

    // Run experiments
    const agents = [serviceLayerAgent, repositoryLayerAgent, springBootCodeAgent];
    for (let step = 0; step < agents.length; step++) {
        const agent = agents[step];
        const thread = await openai.beta.threads.create();
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: [
                { type: "text", text: `I need you to extend this UML diagram:\n${umlText}` }
            ],
        });

        await new Promise((resolve, reject) => {
            const run = openai.beta.threads.runs.stream(thread.id, { assistant_id: agent.id })
                .on('textDelta', (textDelta) => writeResult(experimentName, step, textDelta.value))
                .on('end', resolve)
                .on('error', reject);
        });
    }
}

main();
