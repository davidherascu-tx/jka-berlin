import {defineField, defineType} from 'sanity'

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

export const terminType = defineType({
  name: 'termin',
  title: 'Termin',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'type',
      title: 'Art',
      type: 'string',
      options: {
        list: [
          {title: 'Lehrgang', value: 'Lehrgang'},
          {title: 'Ausbildung', value: 'Ausbildung'},
          {title: 'Turnier', value: 'Turnier'},
          {title: 'Prüfung', value: 'Prüfung'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Lehrgang',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Startdatum',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Enddatum (optional)',
      description: 'Nur bei mehrtägigen Veranstaltungen ausfüllen.',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      validation: (rule) =>
        rule.custom((endDate, ctx) => {
          const start = (ctx.document?.startDate as string | undefined) ?? undefined
          if (!endDate || !start) return true
          return endDate >= start || 'Enddatum darf nicht vor dem Startdatum liegen.'
        }),
    }),
    defineField({
      name: 'startTime',
      title: 'Beginn',
      description: 'Format HH:MM, z. B. 10:00',
      type: 'string',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          return TIME_REGEX.test(value) || 'Bitte im Format HH:MM angeben (z. B. 10:00).'
        }),
    }),
    defineField({
      name: 'endTime',
      title: 'Ende',
      description: 'Format HH:MM, z. B. 15:00',
      type: 'string',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          return TIME_REGEX.test(value) || 'Bitte im Format HH:MM angeben (z. B. 15:00).'
        }),
    }),
    defineField({
      name: 'organizer',
      title: 'Veranstalter',
      type: 'string',
    }),
    defineField({
      name: 'organizerUrl',
      title: 'Veranstalter-URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https'], allowRelative: false}),
    }),
    defineField({
      name: 'location',
      title: 'Ort (Bezeichnung)',
      description: 'z. B. „Honbu Dojo Leidenkan" oder „Berlin-Buch"',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      description: 'Straße, PLZ, Ort — z. B. „Ernst-Busch-Straße 27, 13125 Berlin"',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bild (optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativtext',
          type: 'string',
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Startdatum – früheste zuerst',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
    {
      title: 'Startdatum – späteste zuerst',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'image',
    },
    prepare({title, type, startDate, endDate, media}) {
      const fmt = (iso?: string) =>
        iso
          ? new Date(iso).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : ''
      const dateLabel = endDate
        ? `${fmt(startDate)} – ${fmt(endDate)}`
        : fmt(startDate)
      return {
        title,
        subtitle: [type, dateLabel].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
