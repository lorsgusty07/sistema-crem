'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Plus, Edit2, Trash2 } from 'lucide-react'
import Dialog from '@/components/ui/Dialog'
import Step3Payment from '@/components/forms/steps/Step3Payment'

interface FreeStudentRegistrationProps {
  onBack: () => void
  onBackHome: () => void
}

interface Advisor {
  nombres: string
  apellidos: string
  telefono: string
  documentType: 'DNI' | 'Carné de Extranjería'
  documento: string
  correo: string
}

interface Student {
  id: string
  nombres: string
  apellidos: string
  documentType: 'DNI' | 'Carné de Extranjería'
  documento: string
  nivel: 'Inicial' | 'Primaria' | 'Secundaria'
  grado: string
}

const GRADO_OPTIONS = {
  Inicial: ['5 años'],
  Primaria: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'],
  Secundaria: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'],
}

export default function FreeStudentRegistration({
  onBack,
  onBackHome,
}: FreeStudentRegistrationProps) {
  const [step, setStep] = useState<'form' | 'payment'>('form')
  const [institution, setInstitution] = useState({
    codigo: '',
    nombre: '',
  })
  const [withAdvisor, setWithAdvisor] = useState(false)
  const [advisor, setAdvisor] = useState<Advisor>({
    nombres: '',
    apellidos: '',
    telefono: '',
    documentType: 'DNI',
    documento: '',
    correo: '',
  })
  const [students, setStudents] = useState<Student[]>([])
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [studentForm, setStudentForm] = useState<Omit<Student, 'id'>>({
    nombres: '',
    apellidos: '',
    documentType: 'DNI',
    documento: '',
    nivel: 'Primaria',
    grado: 'Primero',
  })

  const handleAddStudent = () => {
    if (studentForm.nombres && studentForm.apellidos && studentForm.documento) {
      if (editingStudent) {
        setStudents(
          students.map((s) =>
            s.id === editingStudent.id
              ? { ...studentForm, id: s.id }
              : s
          )
        )
        setEditingStudent(null)
      } else {
        setStudents([
          ...students,
          { ...studentForm, id: `student-${Date.now()}` },
        ])
      }
      setStudentForm({
        nombres: '',
        apellidos: '',
        documentType: 'DNI',
        documento: '',
        nivel: 'Primaria',
        grado: 'Primero',
      })
      setShowStudentModal(false)
    }
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setStudentForm({
      nombres: student.nombres,
      apellidos: student.apellidos,
      documentType: student.documentType,
      documento: student.documento,
      nivel: student.nivel,
      grado: student.grado,
    })
    setShowStudentModal(true)
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  const handleSubmit = () => {
    if (!institution.nombre || !institution.codigo || students.length === 0) {
      alert('Por favor completa todos los campos requeridos')
      return
    }
    if (withAdvisor && (!advisor.nombres || !advisor.apellidos || !advisor.documento)) {
      alert('Por favor completa los datos del asesor')
      return
    }
    setStep('payment')
  }

  const handlePaymentSubmit = () => {
    alert('¡Inscripción completada exitosamente! Este es un prototipo frontend.')
    onBackHome()
  }

  if (step === 'payment') {
    return (
      <Step3Payment
        institutionName={institution.nombre}
        selectedCategories={students.map((s) => ({
          level: s.nivel,
          advisor: withAdvisor ? advisor : undefined,
          students: [{ nombres: s.nombres, apellidos: s.apellidos, documentType: s.documentType, documento: s.documento }],
        }))}
        onSubmit={handlePaymentSubmit}
        onCancel={onBackHome}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Inscripción como Alumno Libre
          </h1>
          <p className="text-muted-foreground">
            Completa el formulario para registrarte
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          {/* Institution Information */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Información de la Institución
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Código Local
                </label>
                <input
                  type="text"
                  value={institution.codigo}
                  onChange={(e) =>
                    setInstitution({ ...institution, codigo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ej: 001234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre del Colegio
                </label>
                <input
                  type="text"
                  value={institution.nombre}
                  onChange={(e) =>
                    setInstitution({ ...institution, nombre: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ej: Colegio Nacional"
                />
              </div>
            </div>
          </div>

          {/* Advisor Checkbox */}
          <div className="mb-12 pb-12 border-b border-border">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={withAdvisor}
                onChange={(e) => setWithAdvisor(e.target.checked)}
                className="w-5 h-5 rounded border-border cursor-pointer"
              />
              <span className="font-medium text-foreground">
                Me inscribiré con asesor
              </span>
            </label>
          </div>

          {/* Advisor Information */}
          {withAdvisor && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Información del Asesor
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombres
                  </label>
                  <input
                    type="text"
                    value={advisor.nombres}
                    onChange={(e) =>
                      setAdvisor({ ...advisor, nombres: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={advisor.apellidos}
                    onChange={(e) =>
                      setAdvisor({ ...advisor, apellidos: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={advisor.telefono}
                    onChange={(e) =>
                      setAdvisor({ ...advisor, telefono: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Documento
                  </label>
                  <select
                    value={advisor.documentType}
                    onChange={(e) =>
                      setAdvisor({
                        ...advisor,
                        documentType: e.target.value as 'DNI' | 'Carné de Extranjería',
                      })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>DNI</option>
                    <option>Carné de Extranjería</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    value={advisor.documento}
                    onChange={(e) =>
                      setAdvisor({ ...advisor, documento: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={advisor.correo}
                    onChange={(e) =>
                      setAdvisor({ ...advisor, correo: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Students Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Estudiantes</h2>
              <Button
                onClick={() => {
                  setEditingStudent(null)
                  setStudentForm({
                    nombres: '',
                    apellidos: '',
                    documentType: 'DNI',
                    documento: '',
                    nivel: 'Primaria',
                    grado: 'Primero',
                  })
                  setShowStudentModal(true)
                }}
                className="bg-primary hover:bg-primary/90 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar estudiante
              </Button>
            </div>

            {students.length > 0 && (
              <div className="overflow-x-auto border border-border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Nombres
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Apellidos
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Documento
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Nivel
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">
                        Grado
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-foreground">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-border hover:bg-muted/50">
                        <td className="px-4 py-3">{student.nombres}</td>
                        <td className="px-4 py-3">{student.apellidos}</td>
                        <td className="px-4 py-3">
                          {student.documentType} {student.documento}
                        </td>
                        <td className="px-4 py-3">{student.nivel}</td>
                        <td className="px-4 py-3">{student.grado}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="p-2 hover:bg-primary/10 rounded transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4 text-primary" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-2 hover:bg-red-100 rounded transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              onClick={onBackHome}
              variant="outline"
              className="px-8"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Continuar
            </Button>
          </div>
        </div>

        {/* Student Modal */}
        <Dialog
          open={showStudentModal}
          onOpenChange={setShowStudentModal}
          title={editingStudent ? 'Editar Estudiante' : 'Agregar Estudiante'}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombres
              </label>
              <input
                type="text"
                value={studentForm.nombres}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, nombres: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Apellidos
              </label>
              <input
                type="text"
                value={studentForm.apellidos}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, apellidos: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo de Documento
              </label>
              <select
                value={studentForm.documentType}
                onChange={(e) =>
                  setStudentForm({
                    ...studentForm,
                    documentType: e.target.value as 'DNI' | 'Carné de Extranjería',
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>DNI</option>
                <option>Carné de Extranjería</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Número de Documento
              </label>
              <input
                type="text"
                value={studentForm.documento}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, documento: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nivel
              </label>
              <select
                value={studentForm.nivel}
                onChange={(e) => {
                  const nivel = e.target.value as 'Inicial' | 'Primaria' | 'Secundaria'
                  setStudentForm({
                    ...studentForm,
                    nivel,
                    grado: GRADO_OPTIONS[nivel][0],
                  })
                }}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Inicial</option>
                <option>Primaria</option>
                <option>Secundaria</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Grado
              </label>
              <select
                value={studentForm.grado}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, grado: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {GRADO_OPTIONS[studentForm.nivel as keyof typeof GRADO_OPTIONS].map(
                  (grado) => (
                    <option key={grado} value={grado}>
                      {grado}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button
                onClick={() => setShowStudentModal(false)}
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddStudent}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {editingStudent ? 'Guardar cambios' : 'Guardar'}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  )
}
