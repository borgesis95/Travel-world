

export const typeExperienceSelected = (type_experience) => {
console.log("SONO NELL' ACTION: " + type_experience)
  return{
     type: 'TYPE_EXPERIENCE_SELECTED',
     payload: type_experience
  };
}
