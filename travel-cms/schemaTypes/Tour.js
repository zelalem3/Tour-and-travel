import { defineField, defineType } from 'sanity'

export const tourType = defineType({
  name: 'tour',
  title: 'Tour Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tour Title',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
    }),
    defineField({
      name: 'mainImage',
      title: 'Tour Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Tour Description',
      type: 'text',
    }),
  ],
})