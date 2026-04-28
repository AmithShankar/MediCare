'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from '@medicare-pro/utils'
import { useAuthStore } from '@medicare-pro/store'
import type { AuthUser } from '@medicare-pro/types'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  }
}

function mapFirebaseError(code: string): string {
  const errors: Record<string, string> = {
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/user-disabled': 'This account has been disabled.',
  }
  return errors[code] ?? 'An unexpected error occurred. Please try again.'
}

export function useAuthInit() {
  const { setUser, setInitialized } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUser(firebaseUser ? toAuthUser(firebaseUser) : null)
      setInitialized()
    })
    return unsubscribe
  }, [setUser, setInitialized])
}

export function useAuth() {
  const { user, isLoading, isInitialized, setLoading } = useAuthStore()
  const router = useRouter()

  async function loginWithEmail(email: string, password: string) {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      window.location.href = '/dashboard'
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      console.error(mapFirebaseError(code))
    } finally {
      setLoading(false)
    }
  }

  async function loginWithGoogle() {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      window.location.href = '/dashboard'
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      if (code !== 'auth/cancelled-popup-request' && code !== 'auth/popup-closed-by-user') {
        console.error(mapFirebaseError(code))
      }
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)
    try {
      await firebaseSignOut(auth)
      window.location.href = '/login'
    } catch (err) {
      console.error('Logout error:', err)
      setLoading(false)
    }
  }

  return { user, isLoading, isInitialized, loginWithEmail, loginWithGoogle, logout }
}
