import type {  Plan as IPlan , iNewUser } from "@/types/iUser";
import { createContext, useContext, useState } from "react";
import OAuth from "../components/steps/OAuth";
import Plan from "../components/steps/Plan";
import Username from "../components/steps/Username";
import { useRouter } from "next/navigation"
import { newSubscription } from "@/services/stripe";
import { toast } from "@/components/ui/use-toast";
import { createUser } from "@/services/user";
const authSteps = [OAuth, Username, Plan];

type Context = {
  newUser: Partial<iNewUser>;
  setNewUser: (usr: Partial<iNewUser>) => void;
  nextStep: () => void;
  prevStep: () => void;
  CurrentStep: () => JSX.Element;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  isLoading: boolean
  setIsLoading: (b: boolean) => void
  setCanChangeStep: (b: boolean) => void
  canChangeStep: boolean,
  complete: () => void
};

const AuthContext = createContext<Context>({} as Context);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [newUser, setNewUser] = useState<Partial<iNewUser>>({} as iNewUser);
  const [canChangeStep, setCanChangeStep] = useState(false)
  const [authStep, setAuthStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const nextStep = () => {
    setCanChangeStep(false)
    setAuthStep((n) => n + 1);
  };
  const prevStep = () => {
    setCanChangeStep(false)
    setAuthStep((n) => n - 1);
  };
  const hasNextStep = !(authStep >= authSteps.length - 1);
  const hasPrevStep = !(authStep <= 0);
  const complete = async () => {
    setIsLoading(true)
    const nUser = await createUser(newUser as iNewUser)
    if (newUser.plan != "default") {
      localStorage.setItem("user", nUser?.id || "")
      const sessionURL = await newSubscription(newUser.plan as IPlan)
      if(!sessionURL) {
        return toast({
          title: "Someting went wrong",
          variant: "destructive"
        })
      }
      location.replace(sessionURL)
    }
    setIsLoading(false)

  }
  const CurrentStep = authSteps[authStep];

  return (
    <AuthContext.Provider
      value={{
        newUser,
        setNewUser,
        complete,
        nextStep,
        prevStep,
        hasNextStep,
        hasPrevStep,
        CurrentStep,
        setIsLoading,
        isLoading,
        canChangeStep,
        setCanChangeStep
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
