"use client";

import React from "react";
import { useCms } from "../lib/cms";
import { Save, RefreshCw, LogOut, Check } from "lucide-react";

export default function AdminBar() {
  const { isAdmin, hasChanges, save, discard, logout, isSaving, pageName } = useCms();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-slide-up">
      <div className="bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between gap-4">
        {/* Left Status */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Edit Mode: <span className="text-primary capitalize">{pageName}</span>
          </span>
        </div>

        {/* Center Actions */}
        <div className="flex items-center gap-2">
          {hasChanges && (
            <>
              <button
                onClick={discard}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200"
              >
                <RefreshCw size={12} /> Discard
              </button>
              <button
                onClick={save}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-primary/20 hover:scale-105"
              >
                {isSaving ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Save size={12} />
                )}
                Save
              </button>
            </>
          )}

          {!hasChanges && (
            <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 bg-slate-950/50 rounded-full">
              <Check size={12} className="text-emerald-500" /> Draft Saved
            </span>
          )}
        </div>

        {/* Right Logout */}
        <button
          onClick={logout}
          className="p-1.5 rounded-full bg-slate-800/50 hover:bg-red-950/40 text-slate-400 hover:text-red-400 transition-colors duration-200"
          title="Logout of admin session"
        >
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
}
