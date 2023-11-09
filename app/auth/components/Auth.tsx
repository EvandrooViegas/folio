"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "../context/auth";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
export default function Auth() {
  const {
    CurrentStep,
    hasNextStep,
    hasPrevStep,
    nextStep,
    prevStep,
    isLoading,
    canChangeStep,
    totalSteps,
    stepsCount
  } = useAuthContext();
console.log(stepsCount)
  return (
    <section className="min-h-[300px] rounded-md  p-6 border border-neutral-300 border-dashed gap-2 flex flex-col justify-center">
      <div>
        <h3 className="text-xl font-semibold text-center">Authentication</h3>
        <div className="flex gap-4 max-w-[100px] mx-auto">
        {Array(totalSteps).fill(0).map((s, idx) => (
          <div key={s} className={`${idx + 1  <= stepsCount ?  'bg-primary' : 'bg-neutral-300'  } rounded h-2 w-full`} />
        ))}
        </div>
      </div>
      <CurrentStep />
      <div className="justify-self-start self-start">
        {hasPrevStep && (
          <Button disabled={isLoading} onClick={prevStep} size="sm">
            <span>Prev</span>
            <BsArrowLeftShort />
          </Button>
        )}
        {hasNextStep && (
          <Button disabled={isLoading || !canChangeStep} onClick={nextStep} size={"sm"}>
            <span>Next</span>
            <BsArrowRightShort />
          </Button>
        )}
      </div>
    </section>
  );
}
