'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import DelegationRegistration from '@/components/forms/DelegationRegistration'
import FreeStudentRegistration from '@/components/forms/FreeStudentRegistration'

interface RegistrationFlowProps {
  onBack: () => void
}

type RegistrationType = 'select' | 'delegation' | 'free-student'

export default function RegistrationFlow({ onBack }: RegistrationFlowProps) {
  const [type, setType] = useState<RegistrationType>('select')

  if (type === 'delegation') {
    return (
      <DelegationRegistration
        onBack={() => setType('select')}
        onBackHome={onBack}
      />
    )
  }

  if (type === 'free-student') {
    return (
      <FreeStudentRegistration
        onBack={() => setType('select')}
        onBackHome={onBack}
      />
    )
  }

  // Selection screen
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver al inicio</span>
        </button>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Selecciona tu tipo de inscripción
          </h1>
          <p className="text-muted-foreground">
            Elige cómo deseas registrarte en el XIX CREM 2026
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          {/* Option 1: Delegation */}
          <button
            onClick={() => setType('delegation')}
            className="text-left bg-card border-2 border-transparent rounded-2xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <span className="text-2xl font-bold text-primary">🏫</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Inscribirse como Delegación
            </h2>
            <p className="text-muted-foreground mb-6">
              Registra una institución educativa con varios estudiantes y asesor.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <span>Continuar</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>

          {/* Option 2: Free Student */}
          <button
            onClick={() => setType('free-student')}
            className="text-left bg-card border-2 border-transparent rounded-2xl p-8 hover:border-secondary hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <span className="text-2xl font-bold text-secondary">👤</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Inscribirse como Alumno Libre
            </h2>
            <p className="text-muted-foreground mb-6">
              Regístrate como estudiante individual con o sin asesor.
            </p>
            <div className="flex items-center gap-2 text-secondary font-semibold">
              <span>Continuar</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
