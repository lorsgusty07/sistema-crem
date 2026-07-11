'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Building2, User } from 'lucide-react'

interface LookupFlowProps {
  onBack: () => void
}

type LookupType = 'select' | 'delegation' | 'student'

interface DelegationResult {
  codigo: string
  estado: string
  colegio: string
  participantes: number
  fecha: string
}

interface StudentResult {
  nombre: string
  institucion: string
  estado: string
  nivel: string
  grado: string
}

export default function LookupFlow({ onBack }: LookupFlowProps) {
  const [type, setType] = useState<LookupType>('select')
  const [delegationCode, setDelegationCode] = useState('')
  const [studentDocument, setStudentDocument] = useState('')
  const [delegationResult, setDelegationResult] = useState<DelegationResult | null>(null)
  const [studentResult, setStudentResult] = useState<StudentResult | null>(null)
  const [searched, setSearched] = useState(false)

  const handleDelegationSearch = () => {
    if (delegationCode.trim()) {
      // Mock data
      setDelegationResult({
        codigo: delegationCode,
        estado: 'Registrado',
        colegio: 'Colegio San Martín',
        participantes: 18,
        fecha: '12/04/2026',
      })
      setSearched(true)
    }
  }

  const handleStudentSearch = () => {
    if (studentDocument.trim()) {
      // Mock data
      setStudentResult({
        nombre: 'Juan Pérez',
        institucion: 'Colegio Nacional',
        estado: 'Registrado',
        nivel: 'Secundaria',
        grado: '5°',
      })
      setSearched(true)
    }
  }

  const handleReset = () => {
    setDelegationCode('')
    setStudentDocument('')
    setDelegationResult(null)
    setStudentResult(null)
    setSearched(false)
  }

  if (type === 'delegation') {
    return (
      <div className="min-h-screen bg-background py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => {
              handleReset()
              setType('select')
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Consultar Inscripción - Delegación
            </h1>
            <p className="text-muted-foreground">
              Ingresa el código de inscripción de tu delegación
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 max-w-md">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Código de Inscripción
                </label>
                <input
                  type="text"
                  value={delegationCode}
                  onChange={(e) => setDelegationCode(e.target.value)}
                  placeholder="Ej: DEL-2026-001"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                onClick={handleDelegationSearch}
                className="w-full bg-primary hover:bg-primary/90 text-white h-10"
              >
                Consultar
              </Button>
            </div>

            {searched && delegationResult && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Estado
                    </p>
                    <p className="text-lg font-semibold text-green-600">
                      {delegationResult.estado}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Colegio
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {delegationResult.colegio}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Participantes
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {delegationResult.participantes}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Fecha de Registro
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {delegationResult.fecha}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full mt-6"
                >
                  Nueva Búsqueda
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'student') {
    return (
      <div className="min-h-screen bg-background py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => {
              handleReset()
              setType('select')
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Consultar Inscripción - Estudiante
            </h1>
            <p className="text-muted-foreground">
              Ingresa tu número de documento
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 max-w-md">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Documento
                </label>
                <input
                  type="text"
                  value={studentDocument}
                  onChange={(e) => setStudentDocument(e.target.value)}
                  placeholder="Ej: 12345678"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                onClick={handleStudentSearch}
                className="w-full bg-secondary hover:bg-secondary/90 text-white h-10"
              >
                Consultar
              </Button>
            </div>

            {searched && studentResult && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Nombre
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {studentResult.nombre}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Institución
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {studentResult.institucion}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Estado
                    </p>
                    <p className="text-lg font-semibold text-green-600">
                      {studentResult.estado}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Nivel
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {studentResult.nivel}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Grado
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {studentResult.grado}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full mt-6"
                >
                  Nueva Búsqueda
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Selection screen
  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver al inicio</span>
        </button>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Consultar inscripción
          </h1>
          <p className="text-muted-foreground">
            Selecciona cómo deseas consultar tu inscripción
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          {/* Option 1: Delegation */}
          <button
            onClick={() => setType('delegation')}
            className="text-left bg-card border-2 border-transparent rounded-2xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Delegación</h2>
            <p className="text-muted-foreground">
              Consulta la inscripción de tu institución por código.
            </p>
          </button>

          {/* Option 2: Student */}
          <button
            onClick={() => setType('student')}
            className="text-left bg-card border-2 border-transparent rounded-2xl p-8 hover:border-secondary hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <User className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Estudiante</h2>
            <p className="text-muted-foreground">
              Consulta tu inscripción individual por documento.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
