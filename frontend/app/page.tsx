'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Home from '@/components/pages/Home'
import RegistrationFlow from '@/components/pages/RegistrationFlow'
import LookupFlow from '@/components/pages/LookupFlow'

type Page = 'home' | 'registration' | 'lookup'

export default function Page() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const goToHome = () => setCurrentPage('home')
  const goToRegistration = () => setCurrentPage('registration')
  const goToLookup = () => setCurrentPage('lookup')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            onRegister={goToRegistration}
            onLookup={goToLookup}
          />
        )}
        {currentPage === 'registration' && (
          <RegistrationFlow onBack={goToHome} />
        )}
        {currentPage === 'lookup' && (
          <LookupFlow onBack={goToHome} />
        )}
      </main>
    </div>
  )
}
