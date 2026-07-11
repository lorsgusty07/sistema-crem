'use client'

import { Button } from '@/components/ui/button'

interface Step3PaymentProps {
  institutionName: string
  selectedCategories: Array<{
    level?: string
    advisor?: any
    students: Array<{
      nombres: string
      apellidos: string
      documentType?: string
      documento?: string
    }>
  }>
  onSubmit: () => void
  onCancel: () => void
}

export default function Step3Payment({
  institutionName,
  selectedCategories,
  onSubmit,
  onCancel,
}: Step3PaymentProps) {
  const totalStudents = selectedCategories.reduce(
    (sum, cat) => sum + cat.students.length,
    0
  )

  // Mock pricing calculation
  const pricePerStudent = 25.00
  const totalAmount = totalStudents * pricePerStudent

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Resumen de Inscripción
        </h2>

        <div className="space-y-6 mb-8">
          <div className="pb-6 border-b border-border">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Institución
            </p>
            <p className="text-lg font-medium text-foreground">{institutionName}</p>
          </div>

          <div className="pb-6 border-b border-border">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Categorías Seleccionadas
            </p>
            <div className="space-y-3">
              {selectedCategories.map((cat, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{cat.level}</p>
                    <p className="text-sm text-muted-foreground">
                      {cat.students.length} estudiante{cat.students.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    S/. {(cat.students.length * pricePerStudent).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-6 border-b border-border">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Total de Estudiantes
            </p>
            <p className="text-lg font-medium text-foreground">{totalStudents}</p>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">
              Monto Total a Pagar
            </p>
            <p className="text-4xl font-bold text-accent">
              S/. {totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700 leading-relaxed">
              <span className="font-semibold">Nota importante:</span> Este monto es únicamente demostrativo ya que este sistema es un prototipo frontend.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button onClick={onCancel} variant="outline" className="px-8">
            Volver
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90 text-white px-8"
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  )
}
