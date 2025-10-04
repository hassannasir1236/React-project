import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom';

export default function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/dashboard'); 
  };
  return (
          <div className="bg-gray-700 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                </div>
                Acme Inc.
              </a>
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>
                          Login with your Eamil account
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form >
                          <div className="grid gap-6">
                            <div className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="m@example.com"
                                  required
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password"  placeholder="********" required />
                              </div>
                              <Button type="submit" className="w-full" onClick={handleLogin}>
                                Login
                              </Button>
                            </div>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                </div>  
            </div>
          </div>
  )
}

