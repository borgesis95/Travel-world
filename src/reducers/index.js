import { combineReducers }from 'redux';


import authReducer from './authReducer';
import RegisterReducer from './RegisterReducer';
import AddReducer from './AddReducer';
import ActiveCityReducer from './ActiveCityReducer';

import FetchCityReducer       from './FetchCityReducer.js';
import FetchExperienceReducer       from './FetchExperienceReducer.js';
import ActiveTypeExperienceReducer  from './ActiveTypeExperienceReducer';

import ProfileUpdateReducer from './ProfileUpdateReducer.js'
import ProfileFetchReducer from './ProfileFetchReducer.js'
import PhotoUpdateReducer  from './PhotoUpdateReducer.js'
import ActivityCartReducer from './ActivityCartReducer.js'


const appReducer = combineReducers({
  auth: authReducer,
  Register:RegisterReducer,
  ActiveCity: ActiveCityReducer,

  AddReducer :AddReducer,
  FetchCity: FetchCityReducer,
  FetchExperience: FetchExperienceReducer,
  ActiveTypeExperience : ActiveTypeExperienceReducer,
  ProfileUpdate: ProfileUpdateReducer,
  ProfileFetch: ProfileFetchReducer,
  PhotoUpdate:  PhotoUpdateReducer,
  ActivityCart: ActivityCartReducer ,

});

export default appReducer;
