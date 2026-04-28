import { signOut as firebaseSignOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

export const signOut = () => firebaseSignOut(auth)

export const signIn = (email: string, pass: string) => 
  signInWithEmailAndPassword(auth, email, pass)
