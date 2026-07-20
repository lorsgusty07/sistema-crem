'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, AlertCircle, CheckCircle2, Info, Save, Edit2 } from 'lucide-react'

interface StudentData {
  id: string
  dbId?: number
  nombres: string
  apellidos: string
  documentType: 'DNI' | 'Carné de Extranjería'
  documento: string
  fechaNacimiento: string
  isEditing?: boolean
  isSaved?: boolean
}

interface AdvisorData {
  dbId?: number
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
  isYearSaved?: boolean
}

interface AllCategoriesData {
  [category: string]: {
    [year: string]: CategoryYearData
  }
}

interface Step2CategoriesProps {
  data?: Array<any>
  institutionLevel?: string
  alreadyRegistered?: boolean
  inscripcionId?: number | null
  onSubmit: (data: any) => void
  onCancel: () => void
}

const ALL_CATEGORIES = [
  { id: 'inicial', name: 'Inicial', years: ['5 años'], color: 'bg-blue-500' },
  { id: 'primaria', name: 'Primaria', years: ['1°', '2°', '3°', '4°', '5°', '6°'], color: 'bg-green-500' },
  { id: 'secundaria', name: 'Secundaria', years: ['1°', '2°', '3°', '4°', '5°'], color: 'bg-purple-500' },
]

const DEFAULT_ADVISOR: AdvisorData = {
  nombres: '',
  apellidos: '',
  telefono: '',
  documentType: 'DNI',
  documento: '',
  correo: '',
}

export default function Step2Categories({
  data,
  institutionLevel,
  alreadyRegistered,
  inscripcionId,
  onSubmit,
  onCancel,
}: Step2CategoriesProps) {
  const [allCategories, setAllCategories] = useState<AllCategoriesData>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [showRegisteredAlert, setShowRegisteredAlert] = useState(alreadyRegistered || false)
  
  const [advisorForm, setAdvisorForm] = useState<AdvisorData>(DEFAULT_ADVISOR)
  const [isAdvisorSaved, setIsAdvisorSaved] = useState(false)
  const [unsavedModal, setUnsavedModal] = useState({ show: false, message: '' })

  useEffect(() => {
    if (showRegisteredAlert) {
      const timer = setTimeout(() => {
        setShowRegisteredAlert(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showRegisteredAlert])

  const availableCategories = ALL_CATEGORIES.filter(cat => 
    !institutionLevel || institutionLevel.toLowerCase().includes(cat.name.toLowerCase())
  )

  const getCurrentCategory = () => {
    return availableCategories.find(c => c.id === selectedCategory)
  }

  const getAnioId = (category: string, year: string) => {
    if (category === 'inicial' && year === '5 años') return 1
    if (category === 'primaria') {
      if (year === '1°') return 2
      if (year === '2°') return 3
      if (year === '3°') return 4
      if (year === '4°') return 5
      if (year === '5°') return 6
      if (year === '6°') return 7
    }
    if (category === 'secundaria') {
      if (year === '1°') return 8
      if (year === '2°') return 9
      if (year === '3°') return 10
      if (year === '4°') return 11
      if (year === '5°') return 12
    }
    return 0
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedYear(null)
    
    if (!allCategories[categoryId]) {
      setAllCategories(prev => ({
        ...prev,
        [categoryId]: {}
      }))
    }
  }

  const loadYearDetails = async (category: string, year: string) => {
    if (!inscripcionId) return null;
    
    const anio_id = getAnioId(category, year);
    if (!anio_id) return null;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const res = await fetch(`${apiUrl}/inscripciones/detalle?inscripcion_cabecera_id=${inscripcionId}&anio_id=${anio_id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.exists) {
          return data;
        }
      }
    } catch (error) {
      console.error('Error cargando detalles del año:', error)
    }
    return null;
  }

  const handleYearSelect = async (year: string) => {
    if (!selectedCategory) return
    
    setSelectedYear(year)

    if (!allCategories[selectedCategory][year]) {
      // Intenta cargar datos existentes de la BD
      const dbData = await loadYearDetails(selectedCategory, year)

      let newAdvisor = DEFAULT_ADVISOR
      let newStudents: StudentData[] = []
      let advisorSavedState = false

      if (dbData) {
        if (dbData.asesor) {
          newAdvisor = {
            dbId: dbData.asesor.id,
            nombres: dbData.asesor.nombres,
            apellidos: dbData.asesor.apellidos,
            telefono: dbData.asesor.telefono,
            documentType: 'DNI', // Valor por defecto ya que no se guarda en BD
            documento: dbData.asesor.documento,
            correo: dbData.asesor.correo,
          }
          advisorSavedState = true
        }

        if (dbData.estudiantes && Array.isArray(dbData.estudiantes)) {
          newStudents = dbData.estudiantes.map((est: any) => ({
            id: est.id.toString(),
            dbId: est.id,
            nombres: est.nombres,
            apellidos: est.apellidos,
            documentType: 'DNI',
            documento: est.documento,
            fechaNacimiento: est.fechaNacimiento,
            isEditing: false,
            isSaved: true
          }))
        }
      }

      setAllCategories(prev => ({
        ...prev,
        [selectedCategory]: {
          ...prev[selectedCategory],
          [year]: {
            advisor: newAdvisor,
            students: newStudents,
            isYearSaved: !!dbData // true si vino de base de datos
          }
        }
      }))
      setAdvisorForm(newAdvisor)
      setIsAdvisorSaved(advisorSavedState)
    } else {
      setAdvisorForm(allCategories[selectedCategory][year].advisor)
      // Comprobar si ya tiene dbId para marcarlo como guardado
      setIsAdvisorSaved(!!allCategories[selectedCategory][year].advisor.dbId)
    }
  }

  const updateAdvisor = (field: keyof AdvisorData, value: any) => {
    if (!selectedCategory || !selectedYear) return
    
    const newAdvisor = { ...advisorForm, [field]: value }
    setAdvisorForm(newAdvisor)
    setIsAdvisorSaved(false)

    setAllCategories(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [selectedYear]: {
          ...prev[selectedCategory][selectedYear],
          advisor: newAdvisor,
          isYearSaved: false
        }
      }
    }))
  }

  const handleDocumentBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const docValue = e.target.value.trim()
    if (!docValue) return

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const res = await fetch(`${apiUrl}/asesores/search?documento=${docValue}`)
      if (res.ok) {
        const data = await res.json()
        if (data.exists && data.asesor) {
          const updatedAdvisor = {
            ...advisorForm,
            nombres: data.asesor.nombres || '',
            apellidos: data.asesor.apellidos || '',
            telefono: data.asesor.telefono || '',
            correo: data.asesor.correo || '',
          }
          setAdvisorForm(updatedAdvisor)
          setIsAdvisorSaved(true)

          if (selectedCategory && selectedYear) {
            setAllCategories(prev => ({
              ...prev,
              [selectedCategory]: {
                ...prev[selectedCategory],
                [selectedYear]: {
                  ...prev[selectedCategory][selectedYear],
                  advisor: updatedAdvisor,
                  isYearSaved: false
                }
              }
            }))
          }
        }
      }
    } catch (error) {
      console.error('Error buscando asesor:', error)
    }
  }

  const handleSaveAdvisor = async () => {
    if (!advisorForm.documento.trim() || !advisorForm.nombres.trim() || !advisorForm.apellidos.trim()) {
      alert('Por favor complete al menos el documento, nombres y apellidos del asesor.')
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const res = await fetch(`${apiUrl}/asesores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          documento: advisorForm.documento,
          nombres: advisorForm.nombres,
          apellidos: advisorForm.apellidos,
          telefono: advisorForm.telefono,
          correo: advisorForm.correo,
        })
      })

      if (res.ok) {
        const data = await res.json()
        const updatedAdvisor = { ...advisorForm, dbId: data.asesor.id }
        setAdvisorForm(updatedAdvisor)
        setIsAdvisorSaved(true)

        if (selectedCategory && selectedYear) {
          setAllCategories(prev => ({
            ...prev,
            [selectedCategory]: {
              ...prev[selectedCategory],
              [selectedYear]: {
                ...prev[selectedCategory][selectedYear],
                advisor: updatedAdvisor,
                isYearSaved: false
              }
            }
          }))
        }

        alert('Asesor guardado/actualizado exitosamente.')
      } else {
        alert('Hubo un error al guardar el asesor.')
      }
    } catch (error) {
      console.error('Error guardando asesor:', error)
      alert('Error de conexión al guardar el asesor.')
    }
  }

  // Estudiantes Logic
  const addNewStudentCard = () => {
    if (!selectedCategory || !selectedYear) return

    const newStudent: StudentData = {
      id: Date.now().toString(),
      nombres: '',
      apellidos: '',
      documentType: 'DNI',
      documento: '',
      fechaNacimiento: '',
      isEditing: true,
      isSaved: false
    }

    setAllCategories(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [selectedYear]: {
          ...prev[selectedCategory][selectedYear],
          students: [...prev[selectedCategory][selectedYear].students, newStudent],
          isYearSaved: false
        }
      }
    }))
  }

  const updateStudentField = (studentId: string, field: keyof StudentData, value: any) => {
    if (!selectedCategory || !selectedYear) return

    setAllCategories(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [selectedYear]: {
          ...prev[selectedCategory][selectedYear],
          students: prev[selectedCategory][selectedYear].students.map(s => 
            s.id === studentId ? { ...s, [field]: value } : s
          )
        }
      }
    }))
  }

  const handleStudentDocumentBlur = async (studentId: string, docValue: string) => {
    if (!docValue.trim()) return

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const res = await fetch(`${apiUrl}/estudiantes/search?documento=${docValue}`)
      if (res.ok) {
        const data = await res.json()
        if (data.exists && data.estudiante) {
          if (!selectedCategory || !selectedYear) return
          
          setAllCategories(prev => ({
            ...prev,
            [selectedCategory]: {
              ...prev[selectedCategory],
              [selectedYear]: {
                ...prev[selectedCategory][selectedYear],
                students: prev[selectedCategory][selectedYear].students.map(s => 
                  s.id === studentId ? { 
                    ...s, 
                    nombres: data.estudiante.nombres || '',
                    apellidos: data.estudiante.apellidos || '',
                    fechaNacimiento: data.estudiante.fechaNacimiento || ''
                  } : s
                )
              }
            }
          }))
        }
      }
    } catch (error) {
      console.error('Error buscando estudiante:', error)
    }
  }

  const saveStudent = async (student: StudentData) => {
    if (!student.nombres.trim() || !student.apellidos.trim() || !student.documento.trim() || !student.fechaNacimiento.trim()) {
      alert('Por favor completa todos los campos obligatorios del estudiante.')
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const res = await fetch(`${apiUrl}/estudiantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documento: student.documento,
          nombres: student.nombres,
          apellidos: student.apellidos,
          fechaNacimiento: student.fechaNacimiento
        })
      })

      if (res.ok) {
        const data = await res.json()
        
        if (selectedCategory && selectedYear) {
          setAllCategories(prev => ({
            ...prev,
            [selectedCategory]: {
              ...prev[selectedCategory],
              [selectedYear]: {
                ...prev[selectedCategory][selectedYear],
                students: prev[selectedCategory][selectedYear].students.map(s => 
                  s.id === student.id ? { ...s, isEditing: false, isSaved: true, dbId: data.estudiante.id } : s
                ),
                isYearSaved: false
              }
            }
          }))
        }
        alert('Estudiante guardado exitosamente.')
      } else {
        alert('Error al guardar estudiante.')
      }
    } catch (error) {
      console.error(error)
      alert('Error de conexión.')
    }
  }

  const editStudent = (studentId: string) => {
    if (!selectedCategory || !selectedYear) return
    setAllCategories(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [selectedYear]: {
          ...prev[selectedCategory][selectedYear],
          students: prev[selectedCategory][selectedYear].students.map(s => 
            s.id === studentId ? { ...s, isEditing: true } : s
          )
        }
      }
    }))
  }

  const deleteStudent = async (student: StudentData) => {
    if (!selectedCategory || !selectedYear) return
    
    if (student.dbId || student.isSaved) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
        if (student.dbId) {
          await fetch(`${apiUrl}/estudiantes/${student.dbId}`, { method: 'DELETE' })
        }
      } catch (error) {
        console.error("No se pudo eliminar de BD", error)
      }
    }

    setAllCategories(prev => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        [selectedYear]: {
          ...prev[selectedCategory][selectedYear],
          students: prev[selectedCategory][selectedYear].students.filter(s => s.id !== student.id),
          isYearSaved: false
        }
      }
    }))
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
      setAllCategories(prev => ({
        ...prev,
        [selectedCategory]: categoryData
      }))
      setSelectedYear(null)
    }
  }

  const handleSaveDetalle = async () => {
    if (!selectedCategory || !selectedYear || !inscripcionId) {
      alert("No hay una inscripción activa vinculada para guardar los detalles.")
      return;
    }

    const currentData = allCategories[selectedCategory]?.[selectedYear]
    if (!currentData) return;

    if (!currentData.advisor.dbId) {
      alert("Debes guardar la información del Asesor primero.");
      return;
    }

    const savedStudents = currentData.students.filter(s => s.dbId && s.isSaved);
    if (savedStudents.length === 0) {
      alert("Debes tener al menos un estudiante guardado para guardar esta categoría.");
      return;
    }

    if (currentData.students.some(s => s.isEditing)) {
      alert("Tienes estudiantes en modo edición sin guardar. Guárdalos o elimínalos primero.");
      return;
    }

    const anio_id = getAnioId(selectedCategory, selectedYear);
    if (!anio_id) {
      alert("Año no válido.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const res = await fetch(`${apiUrl}/inscripciones/detalle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inscripcion_cabecera_id: inscripcionId,
          anio_id: anio_id,
          asesor_id: currentData.advisor.dbId,
          estudiantes_ids: savedStudents.map(s => s.dbId)
        })
      });

      if (res.ok) {
        setAllCategories(prev => ({
          ...prev,
          [selectedCategory]: {
            ...prev[selectedCategory],
            [selectedYear]: {
              ...prev[selectedCategory][selectedYear],
              isYearSaved: true
            }
          }
        }));
        alert("Los detalles de la categoría/año se guardaron exitosamente en la base de datos.");
      } else {
        alert("Ocurrió un error al guardar los detalles de inscripción.");
      }
    } catch (error) {
      console.error("Error al guardar inscripcion detalle:", error);
      alert("Error de conexión.");
    }
  }

  const handleNext = () => {
    const formattedCategories = []
    
    for (const [categoryId, years] of Object.entries(allCategories)) {
      for (const [year, data] of Object.entries(years)) {
        const categoryObj = ALL_CATEGORIES.find(c => c.id === categoryId)
        const categoryName = categoryObj ? categoryObj.name : categoryId

        if (!data.advisor.dbId) {
          setUnsavedModal({ show: true, message: `Por favor guarda al asesor de ${categoryName} - ${year}` })
          return
        }
        
        const unsavedStudents = data.students.filter(s => s.isEditing)
        if (unsavedStudents.length > 0) {
          setUnsavedModal({ show: true, message: `Tienes estudiantes sin guardar en ${categoryName} - ${year}` })
          return
        }

        if (data.students.length === 0) {
          setUnsavedModal({ show: true, message: `Por favor agrega al menos un estudiante para ${categoryName} - ${year}` })
          return
        }

        if (data.isYearSaved === false) {
          setUnsavedModal({ show: true, message: `Tienes cambios sin guardar en el año ${categoryName} - ${year}. Asegúrate de presionar el botón verde "Guardar Año".` })
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
      setUnsavedModal({ show: true, message: 'Por favor selecciona al menos una categoría y año' })
      return
    }

    onSubmit(formattedCategories)
  }

  const currentCategory = getCurrentCategory()
  const hasAnyCategory = Object.keys(allCategories).length > 0
  const currentYearData = selectedCategory && selectedYear ? allCategories[selectedCategory]?.[selectedYear] : null

  return (
    <div className="space-y-6">
      {showRegisteredAlert && (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg shadow-sm flex items-start gap-3 transition-opacity duration-500">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold uppercase text-blue-900 mb-1 text-sm">Colegio ya registrado</p>
            <p className="text-sm">Esta institución ya fue registrada para la edición actual. Continuando directamente con la selección de categorías.</p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Selecciona una categoría</h2>
        <p className="text-muted-foreground">
          Elige las categorías y años en los que deseas participar, luego completa la información del asesor y estudiantes
        </p>
      </div>

      {/* Categories Selection */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Paso 1: Selecciona una categoría</h3>
        {availableCategories.length === 0 ? (
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
            No se encontraron categorías disponibles para el nivel del colegio ({institutionLevel}).
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {availableCategories.map((category) => (
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
        )}
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-primary/20">
            <h3 className="font-bold text-foreground text-lg">
              {currentCategory?.name} - {selectedYear}
            </h3>
          </div>

          {/* Advisor Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold bg-primary text-white px-2 py-1 rounded">Paso 2</span>
                <h4 className="font-semibold text-foreground">Información del Asesor/Docente</h4>
              </div>
              <div className="flex items-center gap-3">
                {!isAdvisorSaved && (
                  <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Cambios sin guardar
                  </span>
                )}
                <Button 
                  onClick={handleSaveAdvisor} 
                  size="sm" 
                  className={`text-white flex items-center gap-2 transition-all ${!isAdvisorSaved && advisorForm.documento.length > 0 ? 'bg-yellow-500 hover:bg-yellow-600 animate-pulse ring-4 ring-yellow-500/30' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  <Save className="w-4 h-4" />
                  Guardar Asesor
                </Button>
              </div>
            </div>

            <div className="px-5 py-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-sm text-red-800 flex items-start gap-3 shadow-sm w-fit">
              <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-bold text-red-900 uppercase mb-1 text-base">⚠️ MUY IMPORTANTE</p>
                <p>Por favor <strong>verifique obligatoriamente</strong> que los datos del Asesor sean correctos. Serán utilizados para la comunicación oficial y contraseñas de acceso de esta categoría.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
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
                  onBlur={handleDocumentBlur}
                  placeholder="Ej. 12345678"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
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
            </div>
          </div>

          {/* Students Section */}
          <div className="space-y-4 pt-6 border-t border-primary/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold bg-primary text-white px-2 py-1 rounded">Paso 3</span>
                <h4 className="font-semibold text-foreground">Estudiantes de la Categoría</h4>
              </div>
              <Button
                onClick={addNewStudentCard}
                className={`text-white transition-all ${isAdvisorSaved && currentYearData.students.length === 0 ? 'bg-blue-600 hover:bg-blue-700 animate-bounce shadow-lg shadow-blue-500/40' : 'bg-primary hover:bg-primary/90'}`}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar Estudiante
              </Button>
            </div>

            <div className="space-y-4">
              {currentYearData.students.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-border rounded-lg bg-white/50">
                  <p className="text-muted-foreground text-sm">No hay estudiantes agregados. Haz clic en "Agregar Estudiante" para comenzar.</p>
                </div>
              ) : (
                currentYearData.students.map((student, index) => (
                  <div key={student.id} className={`p-4 rounded-lg border shadow-sm transition-all ${student.isEditing ? 'bg-white border-blue-200 shadow-blue-100' : 'bg-muted/10 border-border'}`}>
                    {/* Mode: Editing */}
                    {student.isEditing ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-border pb-2">
                          <h5 className="font-bold text-sm text-foreground">Estudiante #{index + 1} <span className="text-yellow-600 font-normal ml-2 text-xs bg-yellow-50 px-2 py-0.5 rounded">Editando...</span></h5>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Tipo de Documento</label>
                            <select
                              value={student.documentType}
                              onChange={(e) => updateStudentField(student.id, 'documentType', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
                            >
                              <option>DNI</option>
                              <option>Carné de Extranjería</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Número de Documento</label>
                            <input
                              type="text"
                              value={student.documento}
                              onChange={(e) => updateStudentField(student.id, 'documento', e.target.value)}
                              onBlur={(e) => handleStudentDocumentBlur(student.id, e.target.value)}
                              placeholder="Ej. 87654321"
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Nombres</label>
                            <input
                              type="text"
                              value={student.nombres}
                              onChange={(e) => updateStudentField(student.id, 'nombres', e.target.value)}
                              placeholder="Ej. María"
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Apellidos</label>
                            <input
                              type="text"
                              value={student.apellidos}
                              onChange={(e) => updateStudentField(student.id, 'apellidos', e.target.value)}
                              placeholder="Ej. Rodríguez"
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">Fecha de Nacimiento</label>
                            <input
                              type="date"
                              value={student.fechaNacimiento}
                              onChange={(e) => updateStudentField(student.id, 'fechaNacimiento', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => deleteStudent(student)}>
                            Cancelar / Eliminar
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2" onClick={() => saveStudent(student)}>
                            <Save className="w-4 h-4" />
                            Guardar Estudiante
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Mode: View */
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <h5 className="font-bold text-foreground text-base mb-1">{student.nombres} {student.apellidos}</h5>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <p><strong>{student.documentType}:</strong> {student.documento}</p>
                            <p><strong>Año:</strong> {`${selectedYear} DE ${currentCategory?.name}`.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => editStudent(student.id)}>
                            <Edit2 className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteStudent(student)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Actions (Moved from header) */}
          <div className="pt-6 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <div className="w-full md:w-auto">
              <h4 className="text-sm font-semibold text-foreground mb-1">Opciones del Año</h4>
              <p className="text-xs text-muted-foreground">Guarda los cambios de todos los estudiantes y el asesor para este año, o elimina el año por completo si no deseas participar.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto bg-muted/30 p-3 rounded-lg border border-border">
              {currentYearData.isYearSaved === false && (
                <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-3 py-1.5 rounded flex items-center justify-center gap-1 order-last sm:order-first w-full sm:w-auto">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Cambios sin guardar
                </span>
              )}
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleSaveDetalle}
                  className={`text-white flex-1 sm:flex-none transition-all ${isAdvisorSaved && currentYearData.students.length > 0 && currentYearData.isYearSaved === false && !currentYearData.students.some(s => s.isEditing) ? 'bg-green-500 hover:bg-green-600 animate-pulse ring-4 ring-green-500/30' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  <Save className="w-4 h-4 mr-1 sm:mr-2" />
                  Guardar Año
                </Button>
                <Button
                  onClick={deleteCategory}
                  variant="outline"
                  className="text-destructive hover:text-destructive hover:bg-destructive/5 flex-1 sm:flex-none border-red-200 bg-white"
                >
                  <Trash2 className="w-4 h-4 mr-1 sm:mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4 pt-6">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          {alreadyRegistered ? 'Editar datos del colegio' : 'Atrás'}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!hasAnyCategory}
          className="flex-1 bg-primary hover:bg-primary/90 text-white disabled:bg-muted disabled:text-muted-foreground"
        >
          Continuar al Resumen
        </Button>
      </div>

      {/* Unsaved Changes Modal */}
      {unsavedModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <AlertCircle className="w-8 h-8" />
              <h2 className="text-xl font-bold text-slate-800">Acción Requerida</h2>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {unsavedModal.message}
            </p>
            <div className="flex justify-end">
              <Button 
                onClick={() => setUnsavedModal({ show: false, message: '' })}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6"
              >
                Entendido
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
