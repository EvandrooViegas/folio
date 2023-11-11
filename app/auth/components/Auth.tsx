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

  return (
    <section className="min-h-[300px] rounded-md bg-white  p-6  gap-12 flex flex-col justify-between shadow-lg">
      <div>
        <h3 className="text-xl font-semibold text-center mb-1">Authentication</h3>
        <div className="flex gap-4 max-w-[100px] mx-auto">
        {Array(totalSteps).fill(0).map((s, idx) => (
          <div key={idx} className={`${idx + 1  <= stepsCount ?  'bg-primary' : 'bg-neutral-300'  } rounded h-[5px] w-full`} />
        ))}
        </div>
      </div>
      <CurrentStep />
      <div className="flex justify-between  w-full">
        {hasPrevStep && (
          <Button disabled={isLoading} variant={"secondary"}  onClick={prevStep} size="sm" className="flex gap-1">
            <BsArrowLeftShort />
            <span>Prev</span>
          </Button>
        )}
          <Button disabled={isLoading || !canChangeStep}  onClick={nextStep} size={"sm"} className="flex gap-1"  >
            <span>{hasNextStep ? "Next" : "Finish"}</span>
            <BsArrowRightShort />
          </Button>
      </div>
    </section>
  );
}
