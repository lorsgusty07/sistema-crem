'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Step1DelegationProps {
  data: {
    codigo: string
    nombre: string
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

  const handleSelectColegio = (colegio: any) => {
    setFormData({
      ...formData,
      codigo: colegio.codLocal || '',
      nombre: colegio.nombre || '',
      telefono: colegio.telefono || '',
      correo: colegio.correo || '',
      director: colegio.nomDirector || '',
      departamento: colegio.departamento || '',
      provincia: colegio.provincia || '',
      distrito: colegio.distrito || '',
      gestion: colegio.tipGestion === 'Privada' ? 'Privada' : 'Pública'
    })
    setSuggestions([])
  }

  const handleSubmit = (e: React.FormEvent) => {
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
      onSubmit(formData)
    } else {
      alert('Por favor completa todos los campos requeridos')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Información de la Institución
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
              Código Local *
            </label>
            <input
              type="text"
              value={formData.codigo}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: 001234"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-card border border-border rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
                {suggestions.map((colegio) => (
                  <li
                    key={colegio.id || colegio.codLocal}
                    onClick={() => handleSelectColegio(colegio)}
                    className="px-4 py-2 hover:bg-muted cursor-pointer text-sm border-b border-border last:border-0"
                  >
                    <span className="font-bold">{colegio.codLocal}</span> - {colegio.nombre}
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
            <input
              type="text"
              value={formData.nombre}
              readOnly
              className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Colegio Nacional"
            />
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
          <h3 className="text-lg font-bold text-foreground mb-6">
            Información del Director
          </h3>
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
        </div>

        <div className="border-t border-border pt-8">
          <h3 className="text-lg font-bold text-foreground mb-6">Ubicación</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Departamento *
              </label>
              <input
                type="text"
                value={formData.departamento}
                readOnly
                className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: Lima"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Provincia *
              </label>
              <input
                type="text"
                value={formData.provincia}
                readOnly
                className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: Lima"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Distrito *
              </label>
              <input
                type="text"
                value={formData.distrito}
                readOnly
                className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ej: San Isidro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo de Gestión *
              </label>
              <select
                value={formData.gestion}
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Pública</option>
                <option>Privada</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel} variant="outline" className="px-8">
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white px-8"
        >
          Siguiente
        </Button>
      </div>
    </form>
  )
}
