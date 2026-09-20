export interface Experience {
  id: string
  title: string
  company: string
  location: {
    city: string
    country: string
    lat: number
    lng: number
    isRemote: boolean
  }
  startDate: string
  endDate: string
  color: "pink" | "yellow" | "green" | "blue"
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Keynote & Founder Pitches",
    company: "Silicon Valley Hub",
    location: {
      city: "San Francisco",
      country: "USA",
      lat: 37.7749,
      lng: -122.4194,
      isRemote: false,
    },
    startDate: "2025-01-15",
    endDate: "2026-09-20",
    color: "green",
  },
  {
    id: "2",
    title: "University & Medical Lectures",
    company: "European Education Network",
    location: {
      city: "Zurich",
      country: "Switzerland",
      lat: 47.3769,
      lng: 8.5417,
      isRemote: false,
    },
    startDate: "2025-03-20",
    endDate: "2026-09-20",
    color: "green",
  },
  {
    id: "3",
    title: "Enterprise Sales & Client Demos",
    company: "Asia Pacific Division",
    location: {
      city: "Tokyo",
      country: "Japan",
      lat: 35.6762,
      lng: 139.6503,
      isRemote: false,
    },
    startDate: "2025-05-10",
    endDate: "2026-09-20",
    color: "blue",
  },
  {
    id: "4",
    title: "Global Leadership Summits",
    company: "London Business Center",
    location: {
      city: "London",
      country: "United Kingdom",
      lat: 51.5074,
      lng: -0.1278,
      isRemote: false,
    },
    startDate: "2025-08-05",
    endDate: "2026-09-20",
    color: "pink",
  },
  {
    id: "5",
    title: "Research & Academic Symposia",
    company: "Boston Academic Cluster",
    location: {
      city: "Boston",
      country: "USA",
      lat: 42.3601,
      lng: -71.0589,
      isRemote: false,
    },
    startDate: "2026-01-18",
    endDate: "2026-09-20",
    color: "yellow",
  },
]
