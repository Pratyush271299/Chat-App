// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyA2A_TxSh83lxlkLrkxq6PQBqZ28h6jFig",
  authDomain: "chat-app-js-c9b29.firebaseapp.com",
  projectId: "chat-app-js-c9b29",
  storageBucket: "chat-app-js-c9b29.appspot.com",
  messagingSenderId: "98611110007",
  appId: "1:98611110007:web:d66f93fe37f88cdc726672",
  measurementId: "G-47LH1EJZY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar:"",
            bio: "Hey there, I am using Chat app",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatData: []
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = async () => {
    try{
        await signOut(auth)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

export {signup, login, logout, auth, db}