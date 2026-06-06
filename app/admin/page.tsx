"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MbsysLogo from "../../components/MbsysLogo";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If already authenticated, redirect to home
  useEffect(() => {
    fetch("/api/cms/auth")
      .then((res) => {
        if (res.ok) {
          router.push("/");
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/?edit=true");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-16 flex items-center justify-center">
            <MbsysLogo className="h-12 w-auto" />
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-center">
            MBSYS Administration Portal
          </h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest text-center">
            Enter password to activate inline editor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Access Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-primary text-white text-lg tracking-widest transition-colors duration-300"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-lg text-sm text-red-400 text-center font-medium animate-shake">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-bold uppercase tracking-widest text-sm rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 transform active:scale-98"
          >
            {loading ? "Verifying..." : "Enter Edit Mode"}
          </button>
        </form>
      </div>
    </div>
  );
}
