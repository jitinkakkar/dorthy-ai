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

export const GREETING = "Welcome! Let's find your dream home in Ontario 🏡";

export const MESSAGE = `
  I'm here to guide you through first-time home buyer programs and help you understand your options.
`;

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Getting started",
    prompt: "I'm interested in buying my first home in Ontario",
    icon: "sparkle",
  },
  {
    label: "Available programs",
    prompt: "What programs are available for first-time buyers?",
    icon: "book-open",
  },
  {
    label: "Learn more",
    prompt: "Help me understand the home buying process",
    icon: "circle-question",
  },
];

export const getPlaceholder = () => {
  return "Ask me anything about buying your first home in Ontario...";
};