import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWP3myT6bSjmwqof3XvHlsg2QYtAcY-ec",
    authDomain: "snooker-pocket-49515.firebaseapp.com",
    projectId: "snooker-pocket-49515",
    storageBucket: "snooker-pocket-49515.appspot.com",
    messagingSenderId: "136704129295",
    appId: "1:136704129295:web:8efecd3c710ffbd66de67a",
    measurementId: "G-L2KXEYHHHV"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
