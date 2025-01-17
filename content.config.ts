import { defineCollection, defineContentConfig, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.date(),
        tags: z.array(z.string()),
        related: z.array(z.string()),
        header: z.string(),
        special: z.boolean(),
        indicatorsHidden: z.boolean(),
      }),
    }),
  },
})
