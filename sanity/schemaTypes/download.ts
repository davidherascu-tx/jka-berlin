import {defineField, defineType} from 'sanity'

export const downloadType = defineType({
  name: 'download',
  title: 'Download',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Lehrgang', value: 'Lehrgang'},
          {title: 'Allgemeine', value: 'Allgemeine'},
          {title: 'Technisches', value: 'Technisches'},
          {title: 'Prüfungen', value: 'Prüfungen'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Datei',
      description: 'PDF, Excel oder andere Dokumente.',
      type: 'file',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Aktualisiert am',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Kurzbeschreibung (optional)',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Aktualisiert – neueste zuerst',
      name: 'updatedAtDesc',
      by: [{field: 'updatedAt', direction: 'desc'}],
    },
    {
      title: 'Kategorie',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'updatedAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', category: 'category', updatedAt: 'updatedAt'},
    prepare({title, category, updatedAt}) {
      const formatted = updatedAt
        ? new Date(updatedAt).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : ''
      return {
        title,
        subtitle: [category, formatted].filter(Boolean).join(' · '),
      }
    },
  },
})
