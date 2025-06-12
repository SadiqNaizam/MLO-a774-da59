import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Banknote, AlertCircle } from 'lucide-react'; // Example icons

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    // Simulate login
    // In a real app, you'd call an auth API
    // For this example, let's assume 'user' and 'password' are valid credentials
    if (username === 'user' && password === 'password') {
      console.log('Login successful');
      // Redirect to dashboard or intended page
      navigate('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Banknote className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-700">Welcome to TSB</CardTitle>
          <CardDescription>Please sign in to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username/ID</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username or ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
               <p className="text-xs text-gray-500">Hint: user</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <p className="text-xs text-gray-500">Hint: password</p>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          <p className="text-gray-600">Forgot your password?</p>
          <p className="text-gray-600 mt-1">
            New to TSB? <a href="#" className="text-blue-600 hover:underline">Create an account</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;