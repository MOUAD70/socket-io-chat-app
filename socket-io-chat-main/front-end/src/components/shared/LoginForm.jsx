import { useContext } from "react";
import { cn } from "../../lib/chadcn/utils.js";
import { CHAT_ROUTE, REGISTER_ROUTE } from "../../routes/Routes.jsx";
import { Button } from "../ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field.jsx";
import { Input } from "../ui/input.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useFlash } from "../../context/FlashContext.jsx";

const formSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password cannot exceed 20 characters."),
});

export function LoginForm({ className, ...props }) {
  const { handleLogin } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const { flash } = useFlash();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await handleLogin(data);
      console.log("Logged in as:", user);
      flash("Logged in successfully!", "success");
      navigate(CHAT_ROUTE);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setErrorMsg(err.response?.data || err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <CardDescription>Login with your Email and Password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  {...register("email")}
                  className={cn(
                    "bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-5 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors",
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm -mt-2">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password..."
                  {...register("password")}
                  className={cn(
                    "bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-5 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors",
                    errors.password && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm -mt-2">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              {errorMsg && (
                <p className="text-red-600 text-sm -mt-2 bg-red-200 rounded-2xl px-4 py-2">
                  {errorMsg}
                </p>
              )}

              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to={REGISTER_ROUTE}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
