import {defineField, defineType} from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'Aktuelles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL-Pfad)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Aktuelles', value: 'Aktuelles'},
          {title: 'Lehrgang', value: 'Lehrgang'},
          {title: 'Turnier', value: 'Turnier'},
          {title: 'Prüfung', value: 'Prüfung'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Aktuelles',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Veröffentlichungsdatum',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung',
      description: 'Wird in der News-Übersicht angezeigt (max. 280 Zeichen).',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'image',
      title: 'Titelbild',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativtext',
          type: 'string',
          description: 'Wichtig für Barrierefreiheit und SEO.',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Artikeltext',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alternativtext', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'pdf',
      title: 'PDF-Anhang (optional)',
      description: 'Wird auf der Detailseite als Download-Button angezeigt.',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
  ],
  orderings: [
    {
      title: 'Datum – neueste zuerst',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Datum – älteste zuerst',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', date: 'date', category: 'category', media: 'image'},
    prepare({title, date, category, media}) {
      const formatted = date
        ? new Date(date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : ''
      return {
        title,
        subtitle: [category, formatted].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
