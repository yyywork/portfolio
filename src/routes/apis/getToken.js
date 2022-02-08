import {app, functions} from '../../database/firebase';

import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const getToken = httpsCallable(functions, 'fetchAppCheckToken');

export async function get({ request }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
  const body = await request.json();
	return await getToken()
  // return await signalToMe(JSON.stringify(data))
  .then((result) => {
    // Read result of the Cloud Function.
		console.log('result from gettoken', result)
    const data = result.data;
    return {
      result: data
    };
  }).catch((err)=>{
		console.log('err from gettoken', err)
    return {
      result: -1
    };
  });
};