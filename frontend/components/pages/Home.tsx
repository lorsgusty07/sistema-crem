'use client'

import { Button } from '@/components/ui/button'
import { BookOpen, Search } from 'lucide-react'

interface HomeProps {
  onRegister: () => void
  onLookup: () => void
}

export default function Home({ onRegister, onLookup }: HomeProps) {
  return (
    <div className="flex-1 bg-white">
      {/* Registration Cards */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Inscribirse */}
            <div className="group bg-white border-2 border-primary rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-1">Inscribirse</h2>
                  <p className="text-sm text-muted-foreground">
                    Nueva inscripción al concurso
                  </p>
                </div>
              </div>
              <p className="text-foreground mb-10 leading-relaxed text-lg">
                Completa el formulario de inscripción para registrar a tu institución o como estudiante libre en el XIX CREM 2026.
              </p>
              <Button
                onClick={onRegister}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg transition-all duration-300"
              >
                Continuar →
              </Button>
            </div>

            {/* Card 2: Consultar */}
            <div className="group bg-white border-2 border-secondary rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                  <Search className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-secondary mb-1">Consultar</h2>
                  <p className="text-sm text-muted-foreground">
                    Buscar inscripción existente
                  </p>
                </div>
              </div>
              <p className="text-foreground mb-10 leading-relaxed text-lg">
                Busca el estado de una inscripción existente por código de inscripción o documento del estudiante.
              </p>
              <Button
                onClick={onLookup}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-14 text-lg transition-all duration-300"
              >
                Consultar →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
