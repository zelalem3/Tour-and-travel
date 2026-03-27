import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// 1. The Public Client: Used for fetching tours and images.
// No token needed here. useCdn is true for fast performance.
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "wzojjue2",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true, 
  apiVersion: "2023-01-01",
});

// 2. The Write Client: Used ONLY for submitting contact forms.
// This uses the private token. useCdn must be false to see new leads immediately.
export const writeClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "wzojjue2",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: false, 
  apiVersion: "2023-01-01",
  token: import.meta.env.VITE_SANITY_TOKEN, // This comes from your .env
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}