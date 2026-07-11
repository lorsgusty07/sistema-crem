import { Check } from 'lucide-react'

interface StepperProps {
  steps: string[]
  currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isUpcoming = stepNumber > currentStep

        return (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-2 ${
                  isCompleted
                    ? 'bg-primary text-white'
                    : isCurrent
                    ? 'bg-primary text-white ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <p
                className={`text-sm font-medium text-center ${
                  isCurrent
                    ? 'text-primary'
                    : isCompleted
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded ${
                  isCompleted ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
