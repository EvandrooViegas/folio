"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { userExists } from "@/services/user"
import { useAuthContext } from "../../context/auth"
 
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
export default function Username() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })
  const { setCanChangeStep, setIsLoading, isLoading, setNewUser, newUser } = useAuthContext()
 
  async function onSubmit (data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
  const username = data.username
    const exists = await userExists("username", username)
    if(exists) {
      toast({
        title: "A user with the same name already exists",
        description: "Try another one"
      })
    } else {
      setNewUser({
        ...newUser,
        username
      })
      setCanChangeStep(true)
    }
    setIsLoading(false)

  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} >Submit</Button>
      </form>
    </Form>
  )
}