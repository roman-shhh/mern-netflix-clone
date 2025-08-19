import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';

export const fetchFromTMDB = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
    }
  };

  const responce = await axios.get(url, options);

  if (responce.status !== 200) {
    throw new Error(`Error fetching data from TMDB: ${responce.statusText}`);
  }

  return responce.data;
}