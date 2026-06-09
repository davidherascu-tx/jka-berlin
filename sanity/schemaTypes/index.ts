import {type SchemaTypeDefinition} from 'sanity'

import {newsType} from './news'
import {terminType} from './termin'
import {downloadType} from './download'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [newsType, terminType, downloadType],
}
