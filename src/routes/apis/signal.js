import {app, analytics} from '../../database/firebase';

import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);
const signalToMe = httpsCallable(functions, 'signalToMe');


export async function post({ request }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
  const body = await request.json();
  let {contactAns, nameAns, orgAns} = body
  
  if (!nameAns) {
    return {
      result: -1
    };
  }

  nameAns += ""
  contactAns = contactAns? contactAns + "": ""
  orgAns = orgAns? orgAns + "": ""
  const data = {
    data: { inputnameRequest: nameAns, inputorganizationRequest: orgAns, inputcontactRequest: contactAns }
  }
  return await signalToMe(data)
  // return await signalToMe(JSON.stringify(data))
  .then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const data = result.data;
    return {
      result: data
    };
  }).catch((err)=>{
    return {
      result: -1
    };
  });

}