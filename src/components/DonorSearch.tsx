import { useMemo } from 'react'
import { BLOOD_GROUPS, DISTRICTS, DONORS, type BloodGroup, type District, type Donor } from '../data/donors'
import { DEFAULT_FILTERS, type Filters, type SortKey } from '../types'
import { daysUntilEligible, isEligible, lastDonationLabel, toBn } from '../utils/bn'
import { ClockIcon, HeartIcon, PhoneIcon, PinIcon, SearchIcon } from './Icons'

interface Props {
  filters: Filters
  onChange: (next: Filters) => void
}

const SORT_LABELS: Record<SortKey, string> = {
  eligible: 'প্রস্তুত ডোনার আগে',
  donations: 'সর্বাধিক রক্তদান',
  name: 'নাম অনুসারে',
}

function applyFilters(donors: Donor[], f: Filters): Donor[] {
  const q = f.query.trim().toLowerCase()
  const list = donors.filter((d) => {
    if (f.group !== 'all' && d.group !== f.group) return false
    if (f.district !== 'all' && d.district !== f.district) return false
    if (f.availableOnly && !isEligible(d)) return false
    if (q && !`${d.name} ${d.area} ${d.district}`.toLowerCase().includes(q)) return false
    return true
  })

  return list.sort((a, b) => {
    if (f.sort === 'donations') return b.donations - a.donations
    if (f.sort === 'name') return a.name.localeCompare(b.name, 'bn')
    // eligible first, then the ones who become eligible soonest
    return daysUntilEligible(a) - daysUntilEligible(b) || b.donations - a.donations
  })
}

export function DonorSearch({ filters, onChange }: Props) {
  const results = useMemo(() => applyFilters(DONORS, filters), [filters])
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value })
  const isDirty = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)

  return (
    <section className="section donors" id="donors">
      <div className="container">
        <div className="section__head">
          <span className="kicker">ডোনার তালিকা</span>
          <h2>আপনার প্রয়োজনীয় রক্তদাতা খুঁজুন</h2>
          <p>গ্রুপ, জেলা বা নাম দিয়ে খুঁজুন। শেষ রক্তদানের ৯০ দিন পার হলে ডোনার আবার রক্ত দিতে পারেন।</p>
        </div>

        <div className="filters">
          <div className="filters__row">
            <label className="search-input">
              <SearchIcon />
              <input
                type="search"
                placeholder="নাম বা এলাকা লিখুন…"
                value={filters.query}
                onChange={(e) => set('query', e.target.value)}
                aria-label="নাম বা এলাকা দিয়ে খুঁজুন"
              />
            </label>

            <select
              className="select"
              value={filters.district}
              onChange={(e) => set('district', e.target.value as District | 'all')}
              aria-label="জেলা"
            >
              <option value="all">সব জেলা</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={filters.sort}
              onChange={(e) => set('sort', e.target.value as SortKey)}
              aria-label="সাজান"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                <option key={k} value={k}>
                  {SORT_LABELS[k]}
                </option>
              ))}
            </select>
          </div>

          <div className="filters__row filters__row--chips">
            <div className="chips" role="radiogroup" aria-label="রক্তের গ্রুপ">
              {(['all', ...BLOOD_GROUPS] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  role="radio"
                  aria-checked={filters.group === g}
                  className={`chip ${filters.group === g ? 'is-active' : ''}`}
                  onClick={() => set('group', g as BloodGroup | 'all')}
                >
                  {g === 'all' ? 'সব' : g}
                </button>
              ))}
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={filters.availableOnly}
                onChange={(e) => set('availableOnly', e.target.checked)}
              />
              <span className="switch__track" />
              শুধু প্রস্তুত ডোনার
            </label>
          </div>
        </div>

        <div className="results-bar">
          <p>
            <strong>{toBn(results.length)}</strong> জন ডোনার পাওয়া গেছে
          </p>
          {isDirty && (
            <button type="button" className="link-btn" onClick={() => onChange(DEFAULT_FILTERS)}>
              ফিল্টার মুছুন
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="donor-grid">
            {results.map((d) => (
              <DonorCard key={d.id} donor={d} />
            ))}
          </ul>
        ) : (
          <div className="empty">
            <div className="empty__icon">
              <SearchIcon size={28} />
            </div>
            <h3>কোনো ডোনার পাওয়া যায়নি</h3>
            <p>ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন, অথবা পাশের জেলায় খুঁজুন।</p>
            <button type="button" className="btn btn--ghost" onClick={() => onChange(DEFAULT_FILTERS)}>
              সব ডোনার দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function DonorCard({ donor }: { donor: Donor }) {
  const eligible = isEligible(donor)
  const wait = daysUntilEligible(donor)
  const initials = donor.name.replace('মোঃ ', '').slice(0, 2)

  return (
    <li className={`donor-card ${eligible ? '' : 'is-resting'}`}>
      <div className="donor-card__top">
        <span className="avatar avatar--lg">{initials}</span>
        <div className="donor-card__id">
          <h3>{donor.name}</h3>
          <span className="muted">
            <PinIcon size={14} /> {donor.area}, {donor.district}
          </span>
        </div>
        <span className="group-badge">{donor.group}</span>
      </div>

      <div className="donor-card__meta">
        <span>
          <ClockIcon size={14} /> {lastDonationLabel(donor)}
        </span>
        <span>
          <HeartIcon size={14} /> {toBn(donor.donations)} বার
        </span>
      </div>

      <div className="donor-card__foot">
        {eligible ? (
          <span className="status status--ok">রক্তদানে প্রস্তুত</span>
        ) : (
          <span className="status status--wait">{toBn(wait)} দিন পর প্রস্তুত</span>
        )}
        <a
          href={`tel:${donor.phone.replace(/-/g, '')}`}
          className={`btn btn--sm ${eligible ? 'btn--primary' : 'btn--ghost'}`}
          aria-label={`${donor.name}-কে কল করুন`}
        >
          <PhoneIcon size={14} /> কল করুন
        </a>
      </div>
    </li>
  )
}
