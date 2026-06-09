import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalte')
    .items([
      S.listItem()
        .title('Aktuelles')
        .child(
          S.documentTypeList('news')
            .title('Aktuelles')
            .defaultOrdering([{field: 'date', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Termine')
        .child(
          S.documentTypeList('termin')
            .title('Termine')
            .defaultOrdering([{field: 'startDate', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Downloads')
        .child(
          S.documentTypeList('download')
            .title('Downloads')
            .defaultOrdering([{field: 'updatedAt', direction: 'desc'}]),
        ),
    ])
