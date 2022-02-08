
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'dotenv/config';
import { initializeAppCheck, CustomProvider } from "firebase/app-check";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import {  reCAPTCHA_site_key  } from '../const';
import type {  tokeninData  } from '../data';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

export const app = initializeApp(firebaseConfig);

export const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);
const getTokenAPI = httpsCallable(functions, 'fetchAppCheckToken');


const appCheckCustomProvider = new CustomProvider({
  getToken: async () => {
    return new Promise((resolve, _reject) => {
      //to-do: from api
      const appCheckToken = getTokenAPI() 
      .then((result) => {
        //to-do: from api
        console.log('result from gettoken', result)
        const data: tokeninData= result.data as tokeninData;
        const tokenFromServer: string = data.tokenFromServer + ""
        const expirationFromServer: number = data.expirationFromServer
  
          const tempToken = {
            token: tokenFromServer + "",
            expireTimeMillis: expirationFromServer * 1000
          }
          // return tempToken;
          resolve(tempToken);
        }).catch((err)=>{
          console.log('err in getToken', err)
          _reject(err)
        })

      });

    }
  })

// Initialize Firebase
export const appCheck = initializeAppCheck(app, {
  provider: appCheckCustomProvider,
  ...firebaseConfig,
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});
