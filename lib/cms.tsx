"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CmsContextType {
  isAdmin: boolean;
  pageName: string;
  draftData: any;
  setDraftValue: (path: string, value: any) => void;
  hasChanges: boolean;
  save: () => Promise<void>;
  discard: () => void;
  logout: () => void;
  isSaving: boolean;
  triggerUpload: (path: string) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({
  children,
  pageName,
  initialData,
}: {
  children: React.ReactNode;
  pageName: string;
  initialData: any;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [draftData, setDraftData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    fetch("/api/cms/auth")
      .then((res) => {
        if (res.ok) {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);

  // Check if draftData differs from initialData
  useEffect(() => {
    setHasChanges(JSON.stringify(draftData) !== JSON.stringify(initialData));
  }, [draftData, initialData]);

  // Set a specific nested field by path (e.g., "hero.title" or "services[0].title")
  const setDraftValue = (path: string, value: any) => {
    setDraftData((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
      let current = copy;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) current[key] = {};
        current = current[key];
      }
      
      current[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const save = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/cms/content/${pageName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: draftData }),
      });
      if (res.ok) {
        setHasChanges(false);
        router.refresh();
      } else {
        alert("Failed to save changes");
      }
    } catch (err) {
      alert("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  const discard = () => {
    setDraftData(initialData);
  };

  const logout = async () => {
    await fetch("/api/cms/auth", { method: "DELETE" });
    setIsAdmin(false);
    window.location.href = "/";
  };

  // Triggers the Cloudinary upload widget
  const triggerUpload = async (path: string) => {
    try {
      const res = await fetch("/api/cms/upload", { method: "POST" });
      if (!res.ok) {
        alert("Sign in as admin to upload images");
        return;
      }
      
      const { signature, timestamp, folder, apiKey, cloudName } = await res.json();
      
      // Load Cloudinary widget script if not present
      if (!(window as any).cloudinary) {
        const script = document.createElement("script");
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }

      const widget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName,
          apiKey,
          uploadSignature: signature,
          uploadSignatureTimestamp: timestamp,
          folder,
          uploadPreset: undefined, // empty for signed uploads
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            setDraftValue(path, result.info.secure_url);
            widget.close();
          }
        }
      );
      
      widget.open();
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <CmsContext.Provider
      value={{
        isAdmin,
        pageName,
        draftData,
        setDraftValue,
        hasChanges,
        save,
        discard,
        logout,
        isSaving,
        triggerUpload,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (context === undefined) {
    return {
      isAdmin: false,
      pageName: "",
      draftData: null,
      setDraftValue: () => {},
      hasChanges: false,
      save: async () => {},
      discard: () => {},
      logout: () => {},
      isSaving: false,
      triggerUpload: () => {},
    };
  }
  return context;
}
