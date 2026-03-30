import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Home } from "lucide-react";

export function Main() {
  return (
    <div className="main-scope">
      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Find Your Perfect Roommate</h1>

        <div className="my-button-scope">
          <Button
            onClick={() => (window.location.href = "/login")}
            className="primary-btn"
          >
            Find Roommates
          </Button>

          <Button
            onClick={() => (window.location.href = "/register")}
            className="sec-btn"
          >
            Create Account
          </Button>
        </div>

        <h2 className="text-2xl font-bold mb-4">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle size={20} /> Step 1
              </CardTitle>
            </CardHeader>
            <CardContent>Create your profile and set your preferences.</CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Users size={20} /> Step 2
              </CardTitle>
            </CardHeader>
            <CardContent>Browse and match with compatible roommates.</CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Home size={20} /> Step 3
              </CardTitle>
            </CardHeader>
            <CardContent>Connect, chat, and find your ideal living partner.</CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
