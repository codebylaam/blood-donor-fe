import { useState, type FormEvent } from 'react'
import { BLOOD_GROUPS, DISTRICTS, DONORS, type BloodGroup, type District } from '../data/donors'
import { isEligible, toBn } from '../utils/bn'
import { ArrowIcon, ClockIcon, DropIcon, PinIcon, SearchIcon } from './Icons'

interface Props {
  onSearch: (group: BloodGroup | 'all', district: District | 'all') => void
}

export function Hero({ onSearch }: Props) {
  const [group, setGroup] = useState<BloodGroup | 'all'>('all')
  const [district, setDistrict] = useState<District | 'all'>('all')

  const available = DONORS.filter((d) => isEligible(d)).length
  const totalDonations = DONORS.reduce((s, d) => s + d.donations, 0)

  function submit(e: FormEvent) {
    e.preventDefault()
    onSearch(group, district)
  }

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow">
            <span className="pulse" /> এই মুহূর্তে {toBn(available)} জন ডোনার প্রস্তুত
          </span>
          <h1>
            এক ব্যাগ রক্ত,
            <br />
            <em>একটি নতুন জীবন</em>
          </h1>
          <p className="hero__lead">
            আপনার এলাকার স্বেচ্ছাসেবী রক্তদাতাদের সাথে সরাসরি যোগাযোগ করুন। কোনো মধ্যস্থতাকারী নেই, কোনো
            খরচ নেই — শুধু মানুষের পাশে মানুষ।
          </p>

          <form className="quick-search" onSubmit={submit} role="search">
            <label className="field">
              <span className="field__label">রক্তের গ্রুপ</span>
              <select value={group} onChange={(e) => setGroup(e.target.value as BloodGroup | 'all')}>
                <option value="all">সব গ্রুপ</option>
                {BLOOD_GROUPS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
            <span className="quick-search__divider" aria-hidden="true" />
            <label className="field">
              <span className="field__label">জেলা</span>
              <select value={district} onChange={(e) => setDistrict(e.target.value as District | 'all')}>
                <option value="all">সব জেলা</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn--primary quick-search__btn">
              <SearchIcon /> খুঁজুন
            </button>
          </form>

          <dl className="hero__stats">
            <div>
              <dt>নিবন্ধিত ডোনার</dt>
              <dd>{toBn(DONORS.length)}+</dd>
            </div>
            <div>
              <dt>মোট রক্তদান</dt>
              <dd>{toBn(totalDonations)}</dd>
            </div>
            <div>
              <dt>জেলা</dt>
              <dd>{toBn(DISTRICTS.length)}</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="blob" />
          <div className="big-drop">
            <DropIcon size={220} />
            <span>O−</span>
          </div>
          <div className="float-card float-card--request">
            <span className="tag tag--urgent">জরুরি</span>
            <strong>B+ রক্ত প্রয়োজন</strong>
            <span className="muted">
              <PinIcon size={14} /> ঢাকা মেডিকেল কলেজ
            </span>
            <span className="muted">
              <ClockIcon size={14} /> আজ বিকেল ৪টার মধ্যে
            </span>
          </div>
          <div className="float-card float-card--done">
            <span className="avatar">সা</span>
            <div>
              <strong>সাদিয়া রক্ত দিয়েছেন</strong>
              <span className="muted">২ মিনিট আগে · ধানমন্ডি</span>
            </div>
            <ArrowIcon size={16} />
          </div>
        </div>
      </div>
    </section>
  )
}
