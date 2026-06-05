export interface LocationData {
  id: string
  name: string
  address: string
  mapQuery: string // Used for Google Maps embed
}

export const locationsData: LocationData[] = [
  {
    id: 'san-franciso',
    name: 'San Francisco',
    address: '4501 Black Haven Drive, Unit 104, Orlando, Florida 32839',
    mapQuery: '4501+Black+Haven+Drive,+Unit+104,+Orlando,+Florida+32839',
  }
]