export interface People {
  id: string
  name: string
  address: {
    streetAddress: string
    city: string
    country: string
  }
  email: string
  phone: string
}

export interface NameData {
  name: string
}

export interface PeopleData {
  people: People[]
}

export interface PeopleVars {
  first: number
  offset?: number
  name?: string
}
