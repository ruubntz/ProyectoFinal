import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from 'firebase/auth';
import { auth } from './firebase';



//  Registro Usuarios
export const registerUser = async (email, password) => {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};


//  Login Usuarios
export const loginUser = async (email, password) => {

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};


//  Logout Usuarios
export const logoutUser = async () => {

    await signOut(auth);
};