import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "wzojjue2", // Find this in travel-cms/sanity.config.ts
  dataset: "production",
  useCdn: true, // Use the fast edge network
  apiVersion: "2026-03-20", 
});

// This helper turns Sanity's "image reference" into a real URL string
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);