import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBzzV02UNYSHF4eyT2shpWlDuT-W3-iy-U",
  authDomain: "caption-this-417921.firebaseapp.com",
  projectId: "caption-this-417921",
  storageBucket: "caption-this-417921.appspot.com",
  messagingSenderId: "873190843516",
  appId: "1:873190843516:web:c796d67583b1d11d7655f9",
  measurementId: "G-W571FK8MVL",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
