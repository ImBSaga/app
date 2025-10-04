import Link from "next/link";

// Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// Hooks
import { useLogin } from "@/hooks/useAuth";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    isError,
    error,
    isSuccess,
    form,
  } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <FormField
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          render={() => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </FormControl>
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Switch to Register */}
        <Button type="button" variant="outline" className="w-full">
          <Link href="/register">Register</Link>
        </Button>

        {/* Status messages */}
        {isError && (
          <p className="text-red-500 text-sm mt-2">
            {(error as Error)?.message}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-600 text-sm mt-2">Login successful!</p>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
