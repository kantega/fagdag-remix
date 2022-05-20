export const oslo = {
  name: 'Oslo',
  id: 'SN18700'
}

export const trondheim = {
  name: 'Trondheim',
  id: 'SN68110'
}

export const bergen = {
  name: 'Bergen',
  id: 'SN50540'
}

export const cities = [oslo, bergen, trondheim]

export function getCityById(id: string) {
  return cities.find(city => id.startsWith(city.id));
}