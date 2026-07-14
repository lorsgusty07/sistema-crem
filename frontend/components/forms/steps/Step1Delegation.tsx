'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/Dialog'

interface Step1DelegationProps {
  data: {
    codigo: string
    nombre: string
    nivel?: string
    telefono: string
    correo: string
    director: string
    celularDirector: string
    correoDirector: string
    departamento: string
    provincia: string
    distrito: string
    gestion: 'Pública' | 'Privada'
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function Step1Delegation({
  data,
  onSubmit,
  onCancel,
}: Step1DelegationProps) {
  const [formData, setFormData] = useState(data)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = async (value: string) => {
    setFormData({ ...formData, codigo: value })
    if (value.length >= 2) {
      setIsSearching(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
        const res = await fetch(`${apiUrl}/colegios/search?q=${value}`)
        if (res.ok) {
          const fetchedData = await res.json()
          setSuggestions(fetchedData)
        }
      } catch (error) {
        console.error('Error fetching colegios:', error)
      } finally {
        setIsSearching(false)
      }
    } else {
      setSuggestions([])
    }
  }

  const formatNivel = (rawNivel: string) => {
    if (!rawNivel) return ''
    const codes = rawNivel.split(',').map(c => c.trim())
    const mapped = codes.map(code => {
      if (['A2', 'A3', 'A5'].includes(code)) return 'Inicial'
      if (code === 'B0') return 'Primaria'
      if (code === 'F0') return 'Secundaria'
      return code
    })
    // Remover duplicados por si hay varios tipos de inicial
    return Array.from(new Set(mapped)).join(', ')
  }

  const handleSelectColegio = (colegio: any) => {
    setFormData({
      ...formData,
      codigo: colegio.codLocal || '',
      nombre: colegio.nombre || '',
      nivel: formatNivel(colegio.nivel || ''),
      telefono: colegio.telefono || '',
      correo: colegio.correo || '',
      director: colegio.nomDirector || '',
      celularDirector: colegio.telDirector || '',
      correoDirector: colegio.correoDirector || '',
      departamento: colegio.departamento || '',
      provincia: colegio.provincia || '',
      distrito: colegio.distrito || '',
      gestion: colegio.tipGestion === 'Privada' ? 'Privada' : 'Pública'
    })
    setSuggestions([])
  }

  const hasChanges = () => {
    return JSON.stringify(data) !== JSON.stringify(formData)
  }

  const handleNextStep = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const currentYear = new Date().getFullYear().toString()

      const res = await fetch(`${apiUrl}/inscripciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          idColegio: formData.codigo,
          modalidad: 'Delegacion',
          edicion: currentYear
        })
      })

      if (res.ok) {
        const data = await res.json()
        onSubmit({
          ...formData,
          idInscripcion: data.idInscripcion,
          clave: data.clave
        })
      } else {
        alert('Error al crear la inscripción')
      }
    } catch (error) {
      console.error('Error creando la inscripción:', error)
      alert('Error de conexión al crear la inscripción')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.codigo &&
      formData.nombre &&
      formData.telefono &&
      formData.correo &&
      formData.director &&
      formData.celularDirector &&
      formData.correoDirector &&
      formData.departamento &&
      formData.provincia &&
      formData.distrito
    ) {
      if (hasChanges()) {
        setIsModalOpen(true)
      } else {
        await handleNextStep()
      }
    } else {
      alert('Por favor completa todos los campos requeridos')
    }
  }

  const handleConfirmUpdate = async () => {
    setIsModalOpen(false)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      await fetch(`${apiUrl}/colegios/${formData.codigo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      })
    } catch (error) {
      console.error('Error actualizando la información:', error)
    }
    await handleNextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Información de la Institución
        </h2>

        <div className="mb-6 p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg text-sm text-foreground">
          <p className="mb-2">
            <strong>Paso 1:</strong> Digite primero el <strong>Código Local</strong> de la institución.
          </p>
          <p>
            Si no conoce el código local, puede buscarlo en el siguiente enlace:{' '}
            <a
              href="https://escale.minedu.gob.pe/web/inicio/padron-de-iiee;jsessionid=c96c6d4ca5edd7c036fa9be3eccf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold underline hover:text-primary/80 transition-colors"
            >
              Padrón de IIEE (Escale)
            </a>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <label className="block text-sm font-medium text-primary mb-2 flex items-center gap-2">
              <span>Código Local *</span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </label>
            <input
              type="text"
              value={formData.codigo}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 border-2 border-primary bg-primary/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm font-medium transition-all"
              placeholder="Ej: 001234"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-card border border-border rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
                {suggestions.map((colegio) => (
                  <li
                    key={colegio.id || colegio.codLocal}
                    onClick={() => handleSelectColegio(colegio)}
                    className="px-4 py-3 hover:bg-muted cursor-pointer border-b border-border last:border-0 flex flex-col"
                  >
                    <div className="text-sm text-foreground">
                      <span className="font-bold text-primary">{colegio.codLocal}</span> - {colegio.nombre}
                    </div>
                    {colegio.nivel && (
                      <span className="text-xs text-muted-foreground mt-0.5 font-medium">
                        Niveles: {formatNivel(colegio.nivel)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {isSearching && (
              <div className="absolute right-3 top-10 w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre del Colegio *
            </label>
            <div className="w-full px-4 py-3 border border-border rounded-lg bg-muted/30 text-muted-foreground min-h-[46px] flex items-center">
              <span className={formData.nombre ? 'text-foreground font-medium' : ''}>
                {formData.nombre || 'Esperando código local...'}
              </span>
            </div>
          </div>

          {/* Ubicación y Gestión recuperada */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-muted/20 border border-border rounded-xl">
            <div>
              <span className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Departamento</span>
              <span className="text-sm font-medium text-foreground">{formData.departamento || '-'}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Provincia</span>
              <span className="text-sm font-medium text-foreground">{formData.provincia || '-'}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Distrito</span>
              <span className="text-sm font-medium text-foreground">{formData.distrito || '-'}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Tipo de Gestión</span>
              <span className="text-sm font-medium text-foreground">{formData.gestion || '-'}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Correo Institucional *
            </label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) =>
                setFormData({ ...formData, correo: e.target.value })
              }
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="border-t border-border pt-8 mb-8">
          <div className="mb-6 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-foreground">
              Información del Director
            </h3>
            <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-sm text-blue-800 flex items-center gap-3 shadow-sm w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Nota:</strong> Estos datos son de registros del <strong>2025</strong>. Actualícelos si es necesario.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre del Director *
              </label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) =>
                  setFormData({ ...formData, director: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Celular del Director *
              </label>
              <input
                type="tel"
                value={formData.celularDirector}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    celularDirector: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Correo del Director *
              </label>
              <input
                type="email"
                value={formData.correoDirector}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    correoDirector: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm">
            <p className="font-bold flex items-center gap-2 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Importante
            </p>
            <p>
              Es muy importante que estos datos de contacto sean correctos, ya que se utilizarán para que reciba su clave de acceso y futuras comunicaciones oficiales.
            </p>
          </div>
        </div>

      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" onClick={onCancel} variant="outline" className="px-8">
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white px-8"
        >
          Siguiente
        </Button>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Confirmar Actualización"
      >
        <div className="space-y-6">
          <p className="text-foreground">
            ¿Está seguro de que la información ingresada es correcta?
          </p>
          <p className="text-muted-foreground text-sm">
            La información se guardará en la base de datos y se actualizará el registro de la institución.
          </p>
          <div className="flex gap-4 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={handleConfirmUpdate}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Dialog>
    </form>
  )
}
