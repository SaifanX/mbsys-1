"use client";

import React, { useRef, useEffect } from "react";
import { useCms } from "../lib/cms";

interface EditableTextProps {
  path: string;
  className?: string;
  element?: string;
}

export default function EditableText({
  path,
  className = "",
  element = "span",
}: EditableTextProps) {
  const { isAdmin, draftData, setDraftValue } = useCms();
  const elementRef = useRef<HTMLElement>(null);

  // Helper to extract value from nested paths (e.g. "hero.title" or "services[0].title")
  const getValue = () => {
    if (!draftData) return "";
    const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    let current = draftData;
    for (const key of keys) {
      if (current && current !== null && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return "";
      }
    }
    return typeof current === "string" || typeof current === "number" ? String(current) : "";
  };

  const val = getValue();

  // Keep DOM value in sync with state changes
  useEffect(() => {
    if (elementRef.current) {
      if (elementRef.current.innerText !== val) {
        elementRef.current.innerText = val;
      }
    }
  }, [val]);

  if (!isAdmin) {
    return React.createElement(element, { className }, val);
  }

  return React.createElement(element, {
    ref: elementRef as any,
    className: `${className} cursor-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-primary/5 border border-dashed border-transparent hover:border-slate-500 rounded px-1 transition-all`,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      setDraftValue(path, e.currentTarget.innerText || "");
    },
  });
}
