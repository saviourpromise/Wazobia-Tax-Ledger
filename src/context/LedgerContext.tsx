import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { get, set } from "idb-keyval";

export type Entry = {
  id: string;
  date: string; // ISO
  amount: number;
  category: string;
  vendor: string;
  method: "manual" | "ocr" | "voice";
};

type LedgerContextType = {
  entries: Entry[];
  addEntry: (e: Omit<Entry,"id">) => Promise<void>;
  clearAll: () => Promise<void>;
};

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

export const LedgerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const loadEntries = useCallback(async () => {
    const saved = await get<Entry[]>("wazobia-entries");
    if (saved) setEntries(saved);
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  useEffect(() => {
    // persist whenever entries change
    set("wazobia-entries", entries);
  }, [entries]);

  useEffect(() => {
    const handleOnline = () => {
      console.log("App is online. Simulating sync:", entries);
      // In a real app, you would send entries to a backend here.
      // For this assignment, we just log them.
    };

    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [entries]);

  const addEntry = async (e: Omit<Entry,"id">) => {
    const entry: Entry = { id: Date.now().toString(), ...e };
    setEntries(prev => [entry, ...prev]);
  };

  const clearAll = async () => {
    setEntries([]);
    await set("wazobia-entries", []);
  };

  return (
    <LedgerContext.Provider value={{ entries, addEntry, clearAll }}>
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = () => {
  const ctx = useContext(LedgerContext);
  if (!ctx) throw new Error("useLedger must be used inside LedgerProvider");
  return ctx;
};
