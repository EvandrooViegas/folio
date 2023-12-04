import type { Plan as IPlan, iNewUser, iUser } from "@/types/iUser";
import { createContext, useContext, useRef, useState } from "react";
import OAuth from "../components/steps/OAuth";
import Plan from "../components/steps/Plan";
import Username from "../components/steps/Username";
import { newSubscription } from "@/services/stripe";
import { createUser, getUserByEmail, storeAuthJWT } from "@/services/user";
import { useRouter } from "next/navigation";
import errorToast from "@/utils/errorToast";
const authSteps = [OAuth, Username, Plan];

type CompleteData = { isNewUsr: boolean; user: iUser };
type Context = {
  newUser: Partial<iNewUser>;
  setNewUser: (usr: Partial<iNewUser>) => void;
  nextStep: () => void;
  prevStep: () => void;
  CurrentStep: () => JSX.Element;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  setCanChangeStep: (b: boolean) => void;
  canChangeStep: boolean;
  complete: (data?: CompleteData) => void;
  totalSteps: number;
  stepsCount: number;
};

const AuthContext = createContext<Context>({} as Context);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [newUser, setNewUser] = useState<Partial<iNewUser>>({} as iNewUser);
  const [canChangeStep, setCanChangeStep] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const checkedIfUserExists = useRef(false);
  const router = useRouter();

  const authUser = (id: string | undefined, pushToDashboard: boolean = true) => {
    storeAuthJWT(id);
    if(pushToDashboard) {
      router.push("/dashboard");
    }
  } 
  const nextStep = async () => {
    if (!checkedIfUserExists.current) {
      const u = await getUserByEmail(newUser.email);
     authUser(u?.id)
      checkedIfUserExists.current = true;
    }
    setCanChangeStep(false);
    if (authStep + 1 >= totalSteps) {
      await complete();
    } else {
      setAuthStep((n) => n + 1);
    }
  };
  const prevStep = () => {
    setCanChangeStep(false);
    setAuthStep((n) => n - 1);
  };
  const hasNextStep = !(authStep >= authSteps.length - 1);
  const hasPrevStep = !(authStep <= 0);
  const totalSteps = authSteps.length;
  const stepsCount = authStep + 1;

  const complete = async () => {
    setIsLoading(true);

    const nUser = await createUser(newUser as iNewUser);
    if (newUser?.pretended_plan != "default") {
      authUser(nUser?.id, false)
      const sessionURL = await newSubscription(newUser.pretended_plan as IPlan);
      if (!sessionURL) {
        return errorToast();
      }
      location.replace(sessionURL);
    }
    authUser(nUser?.id)
    setIsLoading(false);
  };
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
        setCanChangeStep,
        stepsCount,
        totalSteps,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
