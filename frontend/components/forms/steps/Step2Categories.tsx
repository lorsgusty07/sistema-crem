'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react'

interface StudentData {
  id: string
  nombres: string
  apellidos: string
  documentType: 'DNI' | 'Carné de Extranjería'
  documento: string
}

interface AdvisorData {
  nombres: string
  apellidos: string
  telefono: string
  documentType: 'DNI' | 'Carné de Extranjería'
  documento: string
  correo: string
}

interface CategoryYearData {
  advisor: AdvisorData
  students: StudentData[]
}

interface AllCategoriesData {
  [category: string]: {
    [year: string]: CategoryYearData
  }
}

interface Step2CategoriesProps {
  data?: Array<any>
  onSubmit: (data: any) => void
  onCancel: () => void
}

const CATEGORIES = [
  { id: 'inicial', name: 'Inicial', years: ['3 años', '4 años', '5 años'], color: 'bg-blue-500' },
  { id: 'primaria', name: 'Primaria', years: ['1°', '2°', '3°', '4°', '5°', '6°'], color: 'bg-green-500' },
  { id: 'secundaria', name: 'Secundaria', years: ['1°', '2°', '3°', '4°', '5°'], color: 'bg-purple-500' },
]

const DEFAULT_ADVISOR = {
  nombres: '',
  apellidos: '',
  telefono: '',
  documentType: 'DNI' as const,
  documento: '',
  correo: '',
}

export default function Step2Categories({
  data,
  onSubmit,
  onCancel,
}: Step2CategoriesProps) {
  const [allCategories, setAllCategories] = useState<AllCategoriesData>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  
  // Advisor form fields
  const [advisorForm, setAdvisorForm] = useState<AdvisorData>(DEFAULT_ADVISOR)
  
  // Student form fields
  const [studentForm, setStudentForm] = useState({
    nombres: '',
    apellidos: '',
    documentType: 'DNI' as const,
    documento: '',
  })

  const getCurrentCategory = () => {
    return CATEGORIES.find(c => c.id === selectedCategory)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedYear(null)
    
    if (!allCategories[categoryId]) {
      setAllCategories({
        ...allCategories,
        [categoryId]: {}
      })
    }
  }

  const handleYearSelect = (year: string) => {
    if (!selectedCategory) return
    
    setSelectedYear(year)

    if (!allCategories[selectedCategory][year]) {
      setAllCategories({
        ...allCategories,
        [selectedCategory]: {
          ...allCategories[selectedCategory],
          [year]: {
            advisor: DEFAULT_ADVISOR,
            students: []
          }
        }
      })
      setAdvisorForm(DEFAULT_ADVISOR)
      setStudentForm({ nombres: '', apellidos: '', documentType: 'DNI', documento: '' })
    } else {
      setAdvisorForm(allCategories[selectedCategory][year].advisor)
    }
  }

  const updateAdvisor = (field: keyof AdvisorData, value: any) => {
    if (!selectedCategory || !selectedYear) return
    
    const newAdvisor = { ...advisorForm, [field]: value }
    setAdvisorForm(newAdvisor)

    setAllCategories({
      ...allCategories,
      [selectedCategory]: {
        ...allCategories[selectedCategory],
        [selectedYear]: {
          ...allCategories[selectedCategory][selectedYear],
          advisor: newAdvisor
        }
      }
    })
  }

  const addStudent = () => {
    if (!selectedCategory || !selectedYear) return

    if (!studentForm.nombres.trim() || !studentForm.apellidos.trim() || !studentForm.documento.trim()) {
      alert('Por favor completa todos los campos del estudiante')
      return
    }

    const categoryData = allCategories[selectedCategory]
    const yearData = categoryData[selectedYear]

    setAllCategories({
      ...allCategories,
      [selectedCategory]: {
        ...categoryData,
        [selectedYear]: {
          ...yearData,
          students: [
            ...yearData.students,
            {
              id: Date.now().toString(),
              ...studentForm
            }
          ]
        }
      }
    })

    setStudentForm({ nombres: '', apellidos: '', documentType: 'DNI', documento: '' })
  }

  const removeStudent = (studentId: string) => {
    if (!selectedCategory || !selectedYear) return

    const categoryData = allCategories[selectedCategory]
    const yearData = categoryData[selectedYear]

    setAllCategories({
      ...allCategories,
      [selectedCategory]: {
        ...categoryData,
        [selectedYear]: {
          ...yearData,
          students: yearData.students.filter(s => s.id !== studentId)
        }
      }
    })
  }

  const deleteCategory = () => {
    if (!selectedCategory || !selectedYear) return

    const categoryData = { ...allCategories[selectedCategory] }
    delete categoryData[selectedYear]

    if (Object.keys(categoryData).length === 0) {
      const newCategories = { ...allCategories }
      delete newCategories[selectedCategory]
      setAllCategories(newCategories)
      setSelectedCategory(null)
      setSelectedYear(null)
    } else {
      setAllCategories({
        ...allCategories,
        [selectedCategory]: categoryData
      })
      setSelectedYear(null)
    }
  }

  const handleNext = () => {
    // Transform data to match expected format
    const formattedCategories = []
    
    for (const [categoryId, years] of Object.entries(allCategories)) {
      for (const [year, data] of Object.entries(years)) {
        const categoryObj = CATEGORIES.find(c => c.id === categoryId)
        const categoryName = categoryObj ? categoryObj.name : categoryId

        if (!data.advisor.nombres?.trim() || !data.advisor.apellidos?.trim() || !data.advisor.documento?.trim()) {
          alert(`Por favor completa la información del asesor para ${categoryName} - ${year}`)
          return
        }
        if (data.students.length === 0) {
          alert(`Por favor agrega al menos un estudiante para ${categoryName} - ${year}`)
          return
        }

        formattedCategories.push({
          level: `${categoryName} ${year}`,
          advisor: data.advisor,
          students: data.students
        })
      }
    }

    if (formattedCategories.length === 0) {
      alert('Por favor selecciona al menos una categoría y año')
      return
    }

    onSubmit(formattedCategories)
  }

  const currentCategory = getCurrentCategory()
  const hasAnyCategory = Object.keys(allCategories).length > 0
  const currentYearData = selectedCategory && selectedYear ? allCategories[selectedCategory]?.[selectedYear] : null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Selecciona una categoría</h2>
        <p className="text-muted-foreground">
          Elige las categorías y años en los que deseas participar, luego completa la información del asesor y estudiantes
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`flex items-center gap-3 p-3 rounded-lg ${hasAnyCategory ? 'bg-green-50 border border-green-200' : 'bg-muted border border-border'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hasAnyCategory ? 'bg-green-500 text-white' : 'bg-muted-foreground text-white'}`}>
            {hasAnyCategory ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">1</span>}
          </div>
          <span className={`text-sm font-medium ${hasAnyCategory ? 'text-green-700' : 'text-muted-foreground'}`}>Categoría</span>
        </div>
        
        <div className={`flex items-center gap-3 p-3 rounded-lg ${currentYearData?.advisor.nombres ? 'bg-green-50 border border-green-200' : 'bg-muted border border-border'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentYearData?.advisor.nombres ? 'bg-green-500 text-white' : 'bg-muted-foreground text-white'}`}>
            {currentYearData?.advisor.nombres ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">2</span>}
          </div>
          <span className={`text-sm font-medium ${currentYearData?.advisor.nombres ? 'text-green-700' : 'text-muted-foreground'}`}>Asesor</span>
        </div>
        
        <div className={`flex items-center gap-3 p-3 rounded-lg ${currentYearData?.students.length && currentYearData.students.length > 0 ? 'bg-green-50 border border-green-200' : 'bg-muted border border-border'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentYearData?.students.length && currentYearData.students.length > 0 ? 'bg-green-500 text-white' : 'bg-muted-foreground text-white'}`}>
            {currentYearData?.students.length && currentYearData.students.length > 0 ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">3</span>}
          </div>
          <span className={`text-sm font-medium ${currentYearData?.students.length && currentYearData.students.length > 0 ? 'text-green-700' : 'text-muted-foreground'}`}>Estudiantes</span>
        </div>
      </div>

      {/* Categories Selection */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Paso 1: Selecciona una categoría</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full ${category.color} mt-1 flex-shrink-0`}></div>
                <div>
                  <h3 className="font-bold text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {allCategories[category.id]
                      ? `${Object.keys(allCategories[category.id]).length} año(s) seleccionado(s)`
                      : 'Sin seleccionar'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Years Selection */}
      {selectedCategory && currentCategory && (
        <div className="border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Paso 2: Selecciona un año de {currentCategory.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {currentCategory.years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                  selectedYear === year
                    ? 'border-primary bg-primary/5 text-primary'
                    : allCategories[selectedCategory]?.[year]
                    ? 'border-primary/30 bg-primary/5 text-foreground'
                    : 'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form Area */}
      {selectedCategory && selectedYear && currentYearData && (
        <div className="border border-primary rounded-lg p-6 space-y-6 bg-primary/2">
          <div className="flex justify-between items-center pb-4 border-b border-primary/20">
            <h3 className="font-bold text-foreground text-lg">
              {currentCategory?.name} - {selectedYear}
            </h3>
            <Button
              onClick={deleteCategory}
              variant="outline"
              className="text-destructive hover:text-destructive hover:bg-destructive/5"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar
            </Button>
          </div>

          {/* Advisor Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold bg-primary text-white px-2 py-1 rounded">Paso 2</span>
              <h4 className="font-semibold text-foreground">Información del Asesor/Docente</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Nombres</label>
                <input
                  type="text"
                  value={advisorForm.nombres}
                  onChange={(e) => updateAdvisor('nombres', e.target.value)}
                  placeholder="Ej. Juan Carlos"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Apellidos</label>
                <input
                  type="text"
                  value={advisorForm.apellidos}
                  onChange={(e) => updateAdvisor('apellidos', e.target.value)}
                  placeholder="Ej. García López"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={advisorForm.telefono}
                  onChange={(e) => updateAdvisor('telefono', e.target.value)}
                  placeholder="Ej. 999999999"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Correo</label>
                <input
                  type="email"
                  value={advisorForm.correo}
                  onChange={(e) => updateAdvisor('correo', e.target.value)}
                  placeholder="Ej. asesor@ejemplo.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Tipo de Documento</label>
                <select
                  value={advisorForm.documentType}
                  onChange={(e) => updateAdvisor('documentType', e.target.value as 'DNI' | 'Carné de Extranjería')}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option>DNI</option>
                  <option>Carné de Extranjería</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Número de Documento</label>
                <input
                  type="text"
                  value={advisorForm.documento}
                  onChange={(e) => updateAdvisor('documento', e.target.value)}
                  placeholder="Ej. 12345678"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Students Section */}
          <div className="space-y-4 pt-4 border-t border-primary/20">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold bg-primary text-white px-2 py-1 rounded">Paso 3</span>
              <h4 className="font-semibold text-foreground">Agregar Estudiantes</h4>
            </div>

            <div className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Nombres</label>
                  <input
                    type="text"
                    value={studentForm.nombres}
                    onChange={(e) => setStudentForm({ ...studentForm, nombres: e.target.value })}
                    placeholder="Ej. María"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Apellidos</label>
                  <input
                    type="text"
                    value={studentForm.apellidos}
                    onChange={(e) => setStudentForm({ ...studentForm, apellidos: e.target.value })}
                    placeholder="Ej. Rodríguez Sánchez"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Tipo de Documento</label>
                  <select
                    value={studentForm.documentType}
                    onChange={(e) => setStudentForm({ ...studentForm, documentType: e.target.value as 'DNI' | 'Carné de Extranjería' })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    <option>DNI</option>
                    <option>Carné de Extranjería</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Número de Documento</label>
                  <input
                    type="text"
                    value={studentForm.documento}
                    onChange={(e) => setStudentForm({ ...studentForm, documento: e.target.value })}
                    placeholder="Ej. 87654321"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              <Button
                onClick={addStudent}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Estudiante
              </Button>
            </div>

            {/* Students Table */}
            {currentYearData.students.length > 0 && (
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted/50 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">Estudiantes Agregados: {currentYearData.students.length}</p>
                </div>
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="text-left px-4 py-2 font-semibold text-xs">Nombres</th>
                      <th className="text-left px-4 py-2 font-semibold text-xs">Apellidos</th>
                      <th className="text-left px-4 py-2 font-semibold text-xs">Documento</th>
                      <th className="text-right px-4 py-2 font-semibold text-xs">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentYearData.students.map((student) => (
                      <tr key={student.id} className="border-b border-border hover:bg-muted/30">
                        <td className="px-4 py-2">{student.nombres}</td>
                        <td className="px-4 py-2">{student.apellidos}</td>
                        <td className="px-4 py-2 text-xs text-muted-foreground">{student.documentType}: {student.documento}</td>
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => removeStudent(student.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4 pt-6">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Atrás
        </Button>
        <Button
          onClick={handleNext}
          disabled={!hasAnyCategory}
          className="flex-1 bg-primary hover:bg-primary/90 text-white disabled:bg-muted disabled:text-muted-foreground"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
