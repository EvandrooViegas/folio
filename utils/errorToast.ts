import { toast } from "@/components/ui/use-toast";

export default function errorToast () {
  toast({
    title: "A error occurred",
    description: "Try again later",
    variant: "destructive",
  });
}