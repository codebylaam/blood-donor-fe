import type { BloodGroup, District } from './data/donors'

export type SortKey = 'eligible' | 'donations' | 'name'

export interface Filters {
  query: string
  group: BloodGroup | 'all'
  district: District | 'all'
  availableOnly: boolean
  sort: SortKey
}

export const DEFAULT_FILTERS: Filters = {
  query: '',
  group: 'all',
  district: 'all',
  availableOnly: false,
  sort: 'eligible',
}
