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

function setSessionCookie(value: string) {
  if (typeof document === 'undefined') return
  if (value) {
    // 7-day persistent cookie — middleware reads this for server-side routing
    document.cookie = `__session=${value}; path=/; max-age=604800; SameSite=Strict`
  } else {
    document.cookie = '__session=; path=/; max-age=0; SameSite=Strict'
  }
}

export function useAuthInit() {
  const { setUser, setInitialized } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUser(firebaseUser ? toAuthUser(firebaseUser) : null)
      setSessionCookie(firebaseUser ? '1' : '')
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
      // Set cookie before redirect — onAuthStateChanged fires async and would
      // arrive after the navigation, leaving middleware with no cookie to read
      setSessionCookie('1')
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
      setSessionCookie('1')
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
      setSessionCookie('')
      window.location.href = '/auth/login'
    } catch (err) {
      console.error('Logout error:', err)
      setLoading(false)
    }
  }

  return { user, isLoading, isInitialized, loginWithEmail, loginWithGoogle, logout }
}
