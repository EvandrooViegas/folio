"use client"
import React from 'react'
import { AuthProvider } from '../context/auth'
import Auth from './Auth'

export default function AuthWrapper() {
  return (
    <AuthProvider>
        <Auth />
    </AuthProvider>
  )
}
