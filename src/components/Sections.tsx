import { useState } from 'react'
import { BLOOD_GROUPS, type BloodGroup } from '../data/donors'
import { toBn } from '../utils/bn'
import { ArrowIcon, DropIcon } from './Icons'

/* ---------- How it works ---------- */

const STEPS = [
  { title: 'খুঁজুন', text: 'রক্তের গ্রুপ ও জেলা বেছে নিয়ে কাছাকাছি প্রস্তুত ডোনার খুঁজে নিন।' },
  { title: 'যোগাযোগ করুন', text: 'ডোনারের সাথে সরাসরি ফোনে কথা বলুন, রোগী ও হাসপাতালের তথ্য দিন।' },
  { title: 'জীবন বাঁচান', text: 'ডোনার হাসপাতালে পৌঁছে রক্ত দেবেন। পুরো প্রক্রিয়া সম্পূর্ণ বিনামূল্যে।' },
]

export function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section__head">
          <span className="kicker">তিনটি সহজ ধাপ</span>
          <h2>কীভাবে কাজ করে</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__num">{toBn(i + 1)}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Compatibility ---------- */

const CAN_GIVE_TO: Record<BloodGroup, BloodGroup[]> = {
  'O-': [...BLOOD_GROUPS],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
}

const canReceiveFrom = (g: BloodGroup) => BLOOD_GROUPS.filter((d) => CAN_GIVE_TO[d].includes(g))

export function Compatibility() {
  const [selected, setSelected] = useState<BloodGroup>('O+')
  const giveTo = CAN_GIVE_TO[selected]
  const receiveFrom = canReceiveFrom(selected)

  return (
    <section className="section compat" id="compatibility">
      <div className="container compat__grid">
        <div>
          <span className="kicker">রক্তের মিল</span>
          <h2>কে কাকে রক্ত দিতে পারে?</h2>
          <p className="compat__lead">
            আপনার গ্রুপ বেছে নিন — দেখুন কাদের রক্ত দিতে পারবেন এবং কাদের থেকে নিতে পারবেন।
          </p>
          <div className="compat__picker" role="radiogroup" aria-label="রক্তের গ্রুপ বেছে নিন">
            {BLOOD_GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={g === selected}
                className={`compat__btn ${g === selected ? 'is-active' : ''}`}
                onClick={() => setSelected(g)}
              >
                <DropIcon size={16} />
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="compat__panel">
          <CompatRow title="রক্ত দিতে পারবেন" list={giveTo} />
          <CompatRow title="রক্ত নিতে পারবেন" list={receiveFrom} />
          <p className="compat__note">
            {selected === 'O-' && 'O− হলো সার্বজনীন দাতা — যেকোনো গ্রুপকে রক্ত দিতে পারেন।'}
            {selected === 'AB+' && 'AB+ হলো সার্বজনীন গ্রহীতা — যেকোনো গ্রুপ থেকে রক্ত নিতে পারেন।'}
            {selected !== 'O-' && selected !== 'AB+' && `${selected} গ্রুপ ${toBn(giveTo.length)}টি গ্রুপকে রক্ত দিতে পারে।`}
          </p>
        </div>
      </div>
    </section>
  )
}

function CompatRow({ title, list }: { title: string; list: BloodGroup[] }) {
  return (
    <div className="compat__row">
      <h3>{title}</h3>
      <div className="compat__groups">
        {BLOOD_GROUPS.map((g) => (
          <span key={g} className={`compat__pill ${list.includes(g) ? 'is-match' : ''}`}>
            {g}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: 'কারা রক্ত দিতে পারেন?',
    a: '১৮ থেকে ৬০ বছর বয়সী, ন্যূনতম ৫০ কেজি ওজনের যেকোনো সুস্থ ব্যক্তি রক্ত দিতে পারেন।',
  },
  {
    q: 'কতদিন পর পর রক্ত দেওয়া যায়?',
    a: 'একজন সুস্থ ব্যক্তি প্রতি ৩ মাস (৯০ দিন) পর পর নিরাপদে রক্ত দিতে পারেন।',
  },
  {
    q: 'রক্ত দিলে কি শরীর দুর্বল হয়?',
    a: 'না। দেহ ২৪-৪৮ ঘণ্টার মধ্যে রক্তরস এবং কয়েক সপ্তাহের মধ্যে লোহিত কণিকা পূরণ করে ফেলে। রক্তদানের পর পর্যাপ্ত পানি ও বিশ্রাম নিন।',
  },
  {
    q: 'এই সেবা কি বিনামূল্যে?',
    a: 'হ্যাঁ, সম্পূর্ণ বিনামূল্যে। রক্ত কেনাবেচা আইনত দণ্ডনীয় — কেউ টাকা চাইলে আমাদের জানান।',
  },
]

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <div className="section__head section__head--left">
          <span className="kicker">জিজ্ঞাসা</span>
          <h2>সাধারণ প্রশ্নোত্তর</h2>
          <p>রক্তদান নিয়ে যা জানা দরকার।</p>
        </div>
        <div className="faq__list">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Register CTA ---------- */

export function RegisterCta() {
  return (
    <section className="section" id="register">
      <div className="container">
        <div className="cta">
          <div>
            <h2>আপনিও হতে পারেন কারো জীবনের নায়ক</h2>
            <p>মাত্র ২ মিনিটে ডোনার হিসেবে নিবন্ধন করুন। প্রয়োজনে আমরা আপনার এলাকা থেকেই যোগাযোগ করব।</p>
          </div>
          <a href="#register" className="btn btn--light">
            ডোনার হিসেবে নিবন্ধন <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */

const YEAR = toBn(new Date().getFullYear())

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="brand">
          <span className="brand__mark">
            <DropIcon />
          </span>
          <span className="brand__name">রক্তবন্ধু</span>
        </div>
        <p className="muted">জরুরি হেল্পলাইন: ১৬২৬৩ · © {YEAR} রক্তবন্ধু। সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  )
}
