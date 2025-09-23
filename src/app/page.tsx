import { ChatInterface } from "@/components/chat-interface";
import type { Model } from "@/types/model";

async function getModels(): Promise<Model[]> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      console.warn("API_URL environment variable is not set");
      return [];
    }

    const response = await fetch(`${apiUrl}/api/models`, {
      next: { revalidate: 7200 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
}

export default async function Home() {
  const models = await getModels();

  return <ChatInterface models={models} />;
}
