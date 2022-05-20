export const oslo = {
  name: 'Oslo',
  id: 'SN18700:0'
}

export const trondheim = {
  name: 'Trondheim',
  id: 'SN68110:0'
}

export const bergen = {
  name: 'Bergen',
  id: 'SN50540:0'
}

export const cities = [oslo, bergen, trondheim]

export function getCityById(id: string) {
  return cities.find(city => city.id === id);
}