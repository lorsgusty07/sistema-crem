'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Stepper from '@/components/ui/Stepper'
import Step1Delegation from '@/components/forms/steps/Step1Delegation'
import Step2Categories from '@/components/forms/steps/Step2Categories'
import Step3Payment from '@/components/forms/steps/Step3Payment'

interface DelegationRegistrationProps {
  onBack: () => void
  onBackHome: () => void
}

export default function DelegationRegistration({
  onBack,
  onBackHome,
}: DelegationRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    institution: {
      codigo: '',
      nombre: '',
      nivel: '',
      telefono: '',
      correo: '',
      director: '',
      celularDirector: '',
      correoDirector: '',
      departamento: '',
      provincia: '',
      distrito: '',
      gestion: 'Pública' as const,
    },
    inscripcion: {
      id: null as number | null,
      clave: '',
      alreadyRegistered: false
    },
    categories: [] as Array<{
      level: string
      advisor: {
        nombres: string
        apellidos: string
        telefono: string
        documentType: 'DNI' | 'Carné de Extranjería'
        documento: string
        correo: string
      }
      students: Array<{
        nombres: string
        apellidos: string
        documentType: 'DNI' | 'Carné de Extranjería'
        documento: string
      }>
    }>,
  })

  const handleStep1Submit = (data: any) => {
    const { idInscripcion, clave, alreadyRegistered, ...institutionData } = data;
    
    setFormData((prev) => ({
      ...prev,
      institution: institutionData,
      inscripcion: {
        id: idInscripcion || prev.inscripcion.id,
        clave: clave || prev.inscripcion.clave,
        alreadyRegistered: alreadyRegistered || false
      }
    }))
    setCurrentStep(2)
  }

  const handleStep2Submit = (categories: typeof formData.categories) => {
    setFormData((prev) => ({
      ...prev,
      categories,
    }))
    setCurrentStep(3)
  }

  const handleStep3Submit = () => {
    // Frontend only - show success message
    alert('¡Inscripción completada exitosamente! Este es un prototipo frontend.')
    onBackHome()
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const handleBackHome = () => {
    if (confirm('¿Estás seguro de que deseas cancelar? Se perderán todos los datos.')) {
      onBackHome()
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Inscripción como Delegación
          </h1>
          <p className="text-muted-foreground">
            Completa los siguientes pasos para registrar tu institución
          </p>
        </div>

        {/* Stepper */}
        <Stepper
          steps={['Información', 'Categorías', 'Pago']}
          currentStep={currentStep}
        />

        {/* Steps */}
        <div className="mt-12">
          {currentStep === 1 && (
            <Step1Delegation
              data={formData.institution}
              onSubmit={handleStep1Submit}
              onCancel={handleBackHome}
            />
          )}
          {currentStep === 2 && (
            <Step2Categories
              data={formData.categories}
              institutionLevel={formData.institution.nivel}
              alreadyRegistered={formData.inscripcion.alreadyRegistered}
              inscripcionId={formData.inscripcion.id}
              onSubmit={handleStep2Submit}
              onCancel={handleBack}
            />
          )}
          {currentStep === 3 && (
            <Step3Payment
              institutionName={formData.institution.nombre}
              institutionGestion={formData.institution.gestion}
              selectedCategories={formData.categories}
              onSubmit={handleStep3Submit}
              onCancel={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  )
}
