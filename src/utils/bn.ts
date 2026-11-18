import { ELIGIBLE_AFTER_DAYS, type Donor } from '../data/donors'

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

/** Convert ASCII digits in any value to Bengali digits */
export function toBn(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)])
}

const DAY = 24 * 60 * 60 * 1000

export function daysSince(iso: string, now = new Date()): number {
  return Math.floor((now.getTime() - new Date(iso).getTime()) / DAY)
}

export function isEligible(donor: Donor, now = new Date()): boolean {
  return donor.lastDonation === null || daysSince(donor.lastDonation, now) >= ELIGIBLE_AFTER_DAYS
}

/** Days remaining until the donor can give again (0 if already eligible) */
export function daysUntilEligible(donor: Donor, now = new Date()): number {
  if (donor.lastDonation === null) return 0
  return Math.max(0, ELIGIBLE_AFTER_DAYS - daysSince(donor.lastDonation, now))
}

export function lastDonationLabel(donor: Donor, now = new Date()): string {
  if (donor.lastDonation === null) return 'এখনো রক্তদান করেননি'
  const d = daysSince(donor.lastDonation, now)
  if (d < 1) return 'আজ'
  if (d < 30) return `${toBn(d)} দিন আগে`
  const months = Math.floor(d / 30)
  if (months < 12) return `${toBn(months)} মাস আগে`
  return `${toBn(Math.floor(months / 12))} বছর আগে`
}
