

export const citySelected = (city) => {
console.log("SONO NELL' ACTION: " + city.name)
  return{
     type: 'CITY_SELECTED',
     payload: city
  };
}
