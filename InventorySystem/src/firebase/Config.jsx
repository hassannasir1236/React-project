import conf from "@/Config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: conf.apikey,
  authDomain: conf.authdomain,
  projectId: conf.projectid,
  appId: conf.appid,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);