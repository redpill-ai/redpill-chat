import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get model provider icon URL using Google's favicon service
 */
export function getModelProviderIcon(providerName: string): string {
  const getGstaticUrl = (url: string, size = 32) => {
    return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=${size}`;
  };

  const lowercaseName = providerName.toLowerCase();

  switch (lowercaseName) {
    case "openai":
      return getGstaticUrl("https://openai.com/");
    case "anthropic":
      return getGstaticUrl("https://anthropic.com/");
    case "google":
      return getGstaticUrl("https://ai.google/");
    case "mistral":
      return getGstaticUrl("https://mistral.ai/");
    case "cohere":
      return getGstaticUrl("https://cohere.com/");
    case "groq":
      return getGstaticUrl("https://groq.com/");
    case "together":
      return getGstaticUrl("https://www.together.xyz/");
    case "replicate":
      return getGstaticUrl("https://replicate.com/");
    case "deepseek":
      return getGstaticUrl("https://deepseek.com/");
    case "meta-llama":
    case "meta":
      return getGstaticUrl("https://ai.meta.com/");
    case "qwen":
      return getGstaticUrl("https://qwenlm.github.io/");
    case "phala":
      return getGstaticUrl("https://phala.network/");
    default:
      return getGstaticUrl("https://huggingface.co/");
  }
}
