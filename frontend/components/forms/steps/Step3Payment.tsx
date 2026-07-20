'use client'

import { Button } from '@/components/ui/button'
import { Building2, Users, Receipt, CreditCard, Send, CheckCircle2 } from 'lucide-react'

interface Step3PaymentProps {
  institutionName: string
  institutionGestion?: string
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
  institutionGestion = 'Pública',
  selectedCategories,
  onSubmit,
  onCancel,
}: Step3PaymentProps) {
  const totalStudents = selectedCategories.reduce(
    (sum, cat) => sum + cat.students.length,
    0
  )

  let pricePerStudent = 0
  const isPrivate = institutionGestion.toLowerCase() === 'privada'

  if (isPrivate) {
    if (totalStudents >= 1 && totalStudents <= 50) pricePerStudent = 25.00
    else if (totalStudents >= 51 && totalStudents <= 100) pricePerStudent = 22.50
    else if (totalStudents >= 101) pricePerStudent = 20.00
  } else {
    // Pública
    if (totalStudents >= 1 && totalStudents <= 50) pricePerStudent = 20.00
    else if (totalStudents >= 51 && totalStudents <= 100) pricePerStudent = 17.50
    else if (totalStudents >= 101) pricePerStudent = 15.00
  }

  const totalAmount = totalStudents * pricePerStudent

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
          <Receipt className="w-6 h-6 text-primary" />
          Resumen de Inscripción
        </h2>

        <div className="space-y-6 mb-8">
          {/* Institution Info */}
          <div className="bg-muted/30 p-5 rounded-xl border border-border">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Institución Educativa
                </p>
                <p className="text-lg font-bold text-foreground">{institutionName}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wide">
                  Gestión {institutionGestion}
                </span>
              </div>
            </div>
          </div>

          {/* Categories & Students Summary */}
          <div>
            <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Categorías Seleccionadas ({selectedCategories.length})
            </p>
            <div className="space-y-3">
              {selectedCategories.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white border border-border rounded-xl shadow-sm">
                  <div>
                    <p className="font-bold text-foreground">{cat.level}</p>
                    <p className="text-sm text-muted-foreground">
                      {cat.students.length} estudiante{cat.students.length !== 1 ? 's' : ''} registrados
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      S/. {(cat.students.length * pricePerStudent).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Calculation */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-primary/10">
              <p className="text-muted-foreground font-medium">Total de Estudiantes</p>
              <p className="text-xl font-bold text-foreground">{totalStudents}</p>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-primary/10">
              <p className="text-muted-foreground font-medium">Costo por Estudiante</p>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">S/. {pricePerStudent.toFixed(2)}</p>
                <p className="text-xs text-primary/70 font-semibold mt-1">Tarifa aplicada por cantidad ({isPrivate ? 'Privada' : 'Pública'})</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="text-primary font-bold uppercase tracking-wide">
                Monto Total a Pagar
              </p>
              <p className="text-4xl font-black text-primary">
                S/. {totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Instructions Section */}
        <div className="mt-10 border-t border-border pt-8">
          <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Instrucciones de Pago
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Para finalizar su inscripción, realice el pago total a una de las siguientes cuentas y envíe el comprobante a nuestro WhatsApp.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 border border-border rounded-xl flex items-center gap-4 bg-white shadow-sm">
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center shadow-inner text-white font-black text-xs">
                YAPE
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase">Yape / Plin</p>
                <p className="font-black text-xl text-foreground">999 999 999</p>
                <p className="text-xs text-muted-foreground mt-1">A nombre de: CREM</p>
              </div>
            </div>
            <div className="p-5 border border-border rounded-xl flex items-center gap-4 bg-white shadow-sm">
              <div className="w-14 h-14 bg-blue-800 rounded-2xl flex items-center justify-center shadow-inner text-white font-black text-xs">
                BCP
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase">Cuenta BCP Soles</p>
                <p className="font-black text-lg text-foreground">191-0000000-0-00</p>
                <p className="text-xs text-muted-foreground mt-1">CCI: 002191000000000000</p>
              </div>
            </div>
          </div>

          <a 
            href={`https://wa.me/51999999999?text=Hola,%20adjunto%20mi%20comprobante%20de%20pago%20por%20S/.${totalAmount.toFixed(2)}%20para%20la%20inscripci%C3%B3n%20del%20colegio%20${encodeURIComponent(institutionName)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white p-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-lg mb-8"
          >
            <Send className="w-5 h-5" />
            Enviar Comprobante por WhatsApp
          </a>
        </div>

        <div className="flex gap-4 justify-end border-t border-border pt-6">
          <Button onClick={onCancel} variant="outline" className="px-8 font-semibold">
            Volver
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90 text-white px-8 font-bold text-base flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Finalizar Inscripción
          </Button>
        </div>
      </div>
    </div>
  )
}
