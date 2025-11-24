import { useContext, useState } from "react";
import { cn } from "../lib/chadcn/utils";
import { LOGIN_ROUTE } from "../routes/Routes.jsx";
import { Button } from "./ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card.jsx";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field.jsx";
import { Input } from "./ui/input.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export function RegisterForm({ className, ...props }) {
  const { handleRegister } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await handleRegister({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      console.log("Signed up as:", user);
    } catch (err) {
      console.log(err.response?.data || err.message);
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
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="Name">Name</FieldLabel>
                <Input
                  id="Name"
                  type="Name"
                  placeholder="Enter your name..."
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={
                    "bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-5 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors"
                  }
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={
                    "bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-5 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors"
                  }
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <Link
                    to={}
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={
                    "bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-5 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors"
                  }
                  placeholder="Enter your password..."
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Sign up</Button>
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
