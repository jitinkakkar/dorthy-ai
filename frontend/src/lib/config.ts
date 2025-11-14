import { StartScreenPrompt } from "@openai/chatkit";

export const CHATKIT_API_URL =
  import.meta.env.VITE_CHATKIT_API_URL ?? "/chatkit";

/**
 * ChatKit still expects a domain key at runtime. Use any placeholder locally,
 * but register your production domain at
 * https://platform.openai.com/settings/organization/security/domain-allowlist
 * and deploy the real key.
 */
export const CHATKIT_API_DOMAIN_KEY =
  import.meta.env.VITE_CHATKIT_API_DOMAIN_KEY ?? "domain_pk_localhost_dev";

export const THEME_STORAGE_KEY = "chatkit-boilerplate-theme";

export const GREETING = "Hi, I'm Dorthy — Your AI guide for first-time home buyers 🏡";

export const MESSAGE = "I help you discover federal, provincial, and municipal housing programs you may qualify for. Everything is anonymous and confidential.";

export const DISCLAIMER = 
  "This chatbot helps you understand Canadian housing assistance programs available for first-time home buyers. Currently trained on Ontario provincial programs and certain municipalities in Ontario.";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "I want to know what housing programs I qualify for",
    prompt: "I want to know what housing programs I qualify for",
    icon: "sparkle",
  },
];

export const getPlaceholder = () => {
  return "Share your details to discover programs you may qualify for...";
};