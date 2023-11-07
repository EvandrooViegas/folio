import { Plan } from '@/types/iUser'
import React from 'react'
import { useAuthContext } from '../../context/auth'
import { Button } from '@/components/ui/button'

type PlanFeaures = {
  included: boolean,
  feaure: string
}

type AuthPlan = {
  plan: Plan,
  description?: string,
  feaures?: PlanFeaures
}

const plans = [
  { plan: "default" },
  { plan: "premium" },
  { plan: "premium+" },
] as AuthPlan[]

export default function Plan() {
  const { setNewUser, newUser, complete  } = useAuthContext()
  const onPlanSelection = (plan: AuthPlan) => {
    setNewUser({
      ...newUser,
      pretended_plan: plan.plan
    })
  }

  const onClick = async () => {
    await complete()
  }
  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        {plans.map(plan => (
          <div key={plan.plan} onClick={() => onPlanSelection(plan)}>
            <span>{plan.plan}</span>
          </div>
        ))}
      </div>
      <Button onClick={onClick}>Finish</Button>
    </div>
  )
}
