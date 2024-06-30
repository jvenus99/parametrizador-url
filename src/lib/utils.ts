import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DefaultParametersType = {
  [key: string]: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  parceiro_id: string;
  midia_id: string;
  reg: string;
};


export const defaultParameters: DefaultParametersType = {
  "reg": "city",
  "utm_source": "MktDireto",
  "utm_medium": "massa",
  "utm_campaign": "crm",
  "utm_content": "logoHeader",
  "parceiro_id": "120",
  "midia_id": "7071",
}