import { Button } from "@/components/ui/button";
import type { PleaseLoginProps } from "@/interfaces";
import { useNavigate } from "react-router";
import { Lock, LogIn, Sparkles } from "lucide-react";

export function PleaseLogin(props: PleaseLoginProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gradient-to-b from-white to-slate-50">

      <div className="w-full max-w-md">

        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 text-center">

          <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <Lock className="text-purple-600" size={20} />
          </div>

          <h2 className="text-xl font-bold mb-2">
            Login required
          </h2>

          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            {props.text || "You need to be logged in to access this page."}
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 text-sm text-slate-700 mb-1">
              <Sparkles size={14} className="text-purple-500" />
              Why sign in?
            </div>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Access roommate matching</li>
              <li>• Save your likes</li>
              <li>• View personalized listings</li>
            </ul>
          </div>

          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-2 flex items-center justify-center gap-2"
          >
            <LogIn size={16} />
            Login
          </Button>

          <p className="text-xs text-slate-500 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-600 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}