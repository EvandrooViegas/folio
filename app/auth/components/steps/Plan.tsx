import { Plan } from "@/types/iUser";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth";
import { BsCheck, BsX } from "react-icons/bs";

type IPlan = {
  name: Plan;
  price: number;
};

const features = [
  { name: "feature 1", includedPlans: ["default", "premium", "premium+"] },
  { name: "feature 2", includedPlans: ["default", "premium", "premium+"] },
  { name: "feature 3", includedPlans: ["default", "premium", "premium+"] },
  { name: "feature 10", includedPlans: ["premium", "premium+"] },
  { name: "feature 4", includedPlans: ["premium", "premium+"] },
  { name: "feature 5", includedPlans: ["premium", "premium+"] },
  { name: "feature 6", includedPlans: ["premium+"] },
  { name: "feature 7", includedPlans: ["premium+"] },
  { name: "feature 8", includedPlans: ["premium+"] },
  { name: "feature 9", includedPlans: ["premium+"] },
];
const plans = [
  { name: "default", price: 0 },
  { name: "premium", price: 4.99 },
  { name: "premium+", price: 9.99 },
] as IPlan[];

export default function Plan() {
  const { setNewUser, newUser, setCanChangeStep } = useAuthContext();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("premium");
  const onPlanSelection = (name: Plan) => {
    setNewUser({
      ...newUser,
      pretended_plan: name,
    });
    setSelectedPlan(name);
  };
  useEffect(() => {
    setCanChangeStep(true);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => onPlanSelection(plan.name)}
            className={`cursor-pointer flex flex-col items-center text-2xl font-semibold gap-6 transition-all p-6 border hover:border-neutral-400 ${
              selectedPlan === plan.name
                ? "border-primary"
                : "border-neutral-200"
            } border-dashed rounded`}
          >
            <h5 className="capitalize">
              {plan.name}
            </h5>
            <div className="flex flex-col items-center text-neutral-700 text-base">
              {features.map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <span>
                    {f.includedPlans.includes(plan.name) ? (
                      <BsCheck />
                    ) : (
                      <BsX />
                    )}
                  </span>
                  <span className="">{f.name}</span>
                </div>
              ))}
            </div>
            <span className="text-primary">
              {plan.price}$
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
