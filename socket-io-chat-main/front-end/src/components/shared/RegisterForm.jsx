import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../../lib/shadcn/utils.js";
import { LOGIN_ROUTE } from "../../routes/Routes.jsx";
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
import { useFlash } from "../../context/FlashContext.jsx";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be less than 30 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export function RegisterForm({ className, ...props }) {
  const { handleRegister } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const { flash } = useFlash();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await handleRegister(data);
      console.log("Signed up as:", user);
      flash("Account created successfully!", "success");
      navigate(LOGIN_ROUTE);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setErrorMsg(err.response?.data || err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Sign up</CardTitle>
          <CardDescription>
            Sign up with your Name, Email and Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name..."
                  {...register("name")}
                  className={cn(
                    "bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-5 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors",
                    errors.name && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm -mt-2">
                    {errors.name.message}
                  </p>
                )}
              </Field>

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
                <p className="text-red-600 text-sm -mt-2 bg-red-200 rounded-2xl px-4 py-2 ">
                  {errorMsg}
                </p>
              )}

              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "Sign up"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to={LOGIN_ROUTE}>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
