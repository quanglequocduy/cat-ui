import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMatches } from "@remix-run/react";

type EnvType = {
  TINYMCE_API_KEY?: string;
};

type RootData = { ENV: EnvType };

export function useEnv(): EnvType {
  const matches = useMatches();
  const root = matches.find((m) => m.id === "root") as { data?: RootData };
  return root?.data?.ENV || {};
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
