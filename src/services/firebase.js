import { initializeApp, getApps, getApp }
from 'firebase/app';

import { getAuth }
from 'firebase/auth';

import { getDatabase }
from 'firebase/database';

const firebaseConfig = {

    apiKey:
        'AIzaSyAgcTpIGEIb08oY21eCQU9dRGouB_2IAX8',

    authDomain:
        'nearbites-db.firebaseapp.com',

    databaseURL:
        'https://nearbites-db-default-rtdb.europe-west1.firebasedatabase.app',

    projectId:
        'nearbites-db',

    storageBucket:
        'nearbites-db.firebasestorage.app',

    messagingSenderId:
        '811805116371',

    appId:
        '1:811805116371:web:2b5fe645b5df37e12bd126',

    measurementId:
        'G-DL0GFEZG8Y',

};

// 🔥 Evitar inicializar Firebase dos veces
const app =
    getApps().length === 0
        ? initializeApp(firebaseConfig)
        : getApp();

export const auth =
    getAuth(app);

export const database =
    getDatabase(app);

export default app;