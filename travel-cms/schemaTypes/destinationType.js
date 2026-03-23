import { defineField, defineType } from 'sanity'

export const destinationType = defineType({
  name: 'destination',
  title: 'Famous Destinations',
  type: 'document',
  icon: () => '📍', // Map pin icon for the sidebar
  fields: [
    defineField({
      name: 'name',
      title: 'Destination Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Region/Location',
      type: 'string',
      placeholder: 'e.g. Amhara Region, Northern Ethiopia',
    }),
    defineField({
      name: 'mainImage',
      title: 'Feature Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief history or why this place is famous.',
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      placeholder: 'e.g. October to March',
    }),
    // ADVANCED: Link this destination to existing tours
    defineField({
      name: 'relatedTours',
      title: 'Tours that visit this place',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tour' }] }],
    }),
  ],
})