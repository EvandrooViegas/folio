"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "../context/auth";

export default function Auth() {
  const { CurrentStep, hasNextStep, hasPrevStep, nextStep, prevStep, isLoading, canChangeStep } = useAuthContext()

  return (
    <div>
      <CurrentStep />
      <div>
        {hasPrevStep && (
          <Button disabled={isLoading} onClick={prevStep}>
            Prev
          </Button>
        )}
        {hasNextStep && (
          <Button disabled={isLoading || !canChangeStep} onClick={nextStep}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

