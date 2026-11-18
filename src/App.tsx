import { useState } from 'react'
import { DonorSearch } from './components/DonorSearch'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Compatibility, Faq, Footer, HowItWorks, RegisterCta } from './components/Sections'
import type { BloodGroup, District } from './data/donors'
import { DEFAULT_FILTERS, type Filters } from './types'
import './App.css'

export default function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  function quickSearch(group: BloodGroup | 'all', district: District | 'all') {
    setFilters({ ...DEFAULT_FILTERS, group, district })
    document.getElementById('donors')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero onSearch={quickSearch} />
        <DonorSearch filters={filters} onChange={setFilters} />
        <HowItWorks />
        <Compatibility />
        <Faq />
        <RegisterCta />
      </main>
      <Footer />
    </>
  )
}
