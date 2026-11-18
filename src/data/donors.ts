export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const
export type BloodGroup = (typeof BLOOD_GROUPS)[number]

export const DISTRICTS = [
  'ঢাকা',
  'চট্টগ্রাম',
  'রাজশাহী',
  'খুলনা',
  'সিলেট',
  'বরিশাল',
  'রংপুর',
  'ময়মনসিংহ',
  'কুমিল্লা',
  'গাজীপুর',
] as const
export type District = (typeof DISTRICTS)[number]

export interface Donor {
  id: number
  name: string
  group: BloodGroup
  district: District
  area: string
  phone: string
  /** ISO date of the last donation, or null if never donated */
  lastDonation: string | null
  donations: number
}

/** Minimum gap between two whole-blood donations */
export const ELIGIBLE_AFTER_DAYS = 90

export const DONORS: Donor[] = [
  { id: 1, name: 'মোঃ রাকিবুল হাসান', group: 'O+', district: 'ঢাকা', area: 'মিরপুর-১০', phone: '01711-234567', lastDonation: '2026-06-12', donations: 14 },
  { id: 2, name: 'সাদিয়া আফরিন', group: 'A+', district: 'ঢাকা', area: 'ধানমন্ডি', phone: '01819-445566', lastDonation: '2026-09-28', donations: 6 },
  { id: 3, name: 'তানভীর আহমেদ', group: 'B+', district: 'চট্টগ্রাম', area: 'আগ্রাবাদ', phone: '01912-778899', lastDonation: '2026-03-04', donations: 21 },
  { id: 4, name: 'নুসরাত জাহান', group: 'AB+', district: 'সিলেট', area: 'জিন্দাবাজার', phone: '01556-123890', lastDonation: null, donations: 0 },
  { id: 5, name: 'আরিফুল ইসলাম', group: 'O-', district: 'রাজশাহী', area: 'সাহেব বাজার', phone: '01733-901234', lastDonation: '2026-07-01', donations: 9 },
  { id: 6, name: 'ফারহানা ইয়াসমিন', group: 'A-', district: 'খুলনা', area: 'সোনাডাঙ্গা', phone: '01611-567432', lastDonation: '2026-10-10', donations: 3 },
  { id: 7, name: 'মাহমুদুল হক', group: 'B-', district: 'ঢাকা', area: 'উত্তরা', phone: '01822-334455', lastDonation: '2026-05-20', donations: 11 },
  { id: 8, name: 'শারমিন সুলতানা', group: 'O+', district: 'বরিশাল', area: 'নথুল্লাবাদ', phone: '01715-889900', lastDonation: '2026-08-15', donations: 5 },
  { id: 9, name: 'ইমরান হোসেন', group: 'AB-', district: 'ঢাকা', area: 'মোহাম্মদপুর', phone: '01933-221100', lastDonation: '2026-02-14', donations: 17 },
  { id: 10, name: 'রুমানা পারভীন', group: 'A+', district: 'রংপুর', area: 'জাহাজ কোম্পানি মোড়', phone: '01744-556677', lastDonation: '2026-04-22', donations: 8 },
  { id: 11, name: 'সাকিব আল মামুন', group: 'B+', district: 'ময়মনসিংহ', area: 'চরপাড়া', phone: '01866-112233', lastDonation: '2026-10-01', donations: 4 },
  { id: 12, name: 'জান্নাতুল ফেরদৌস', group: 'O+', district: 'কুমিল্লা', area: 'কান্দিরপাড়', phone: '01577-998877', lastDonation: '2026-01-30', donations: 12 },
  { id: 13, name: 'হাসিবুর রহমান', group: 'A+', district: 'গাজীপুর', area: 'টঙ্গী', phone: '01788-665544', lastDonation: '2026-07-19', donations: 7 },
  { id: 14, name: 'তাসনিম বিনতে কবির', group: 'B+', district: 'ঢাকা', area: 'বনানী', phone: '01899-443322', lastDonation: null, donations: 0 },
  { id: 15, name: 'মেহেদী হাসান', group: 'O-', district: 'চট্টগ্রাম', area: 'নাসিরাবাদ', phone: '01711-009988', lastDonation: '2026-09-05', donations: 19 },
  { id: 16, name: 'আফসানা মিমি', group: 'AB+', district: 'ঢাকা', area: 'বাড্ডা', phone: '01622-778811', lastDonation: '2026-06-30', donations: 2 },
  { id: 17, name: 'রিয়াদ চৌধুরী', group: 'A-', district: 'সিলেট', area: 'আম্বরখানা', phone: '01933-445512', lastDonation: '2026-03-18', donations: 10 },
  { id: 18, name: 'সুমাইয়া আক্তার', group: 'O+', district: 'খুলনা', area: 'খালিশপুর', phone: '01755-332211', lastDonation: '2026-10-20', donations: 6 },
  { id: 19, name: 'কামরুল হাসান', group: 'B-', district: 'রাজশাহী', area: 'উপশহর', phone: '01811-224466', lastDonation: '2026-05-02', donations: 13 },
  { id: 20, name: 'নাফিসা তাবাসসুম', group: 'A+', district: 'চট্টগ্রাম', area: 'হালিশহর', phone: '01988-776655', lastDonation: '2026-07-25', donations: 5 },
]
