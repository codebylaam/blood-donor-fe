import { useState } from 'react'
import { DropIcon } from './Icons'

const LINKS = [
  { href: '#donors', label: 'ডোনার খুঁজুন' },
  { href: '#how', label: 'কীভাবে কাজ করে' },
  { href: '#compatibility', label: 'রক্তের মিল' },
  { href: '#faq', label: 'জিজ্ঞাসা' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="brand" aria-label="রক্তবন্ধু – প্রথম পাতা">
          <span className="brand__mark">
            <DropIcon />
          </span>
          <span className="brand__name">রক্তবন্ধু</span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="প্রধান মেনু">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#register" className="btn btn--primary btn--sm nav__cta" onClick={() => setOpen(false)}>
            ডোনার হোন
          </a>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-label="মেনু খুলুন"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
