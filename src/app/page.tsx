"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, defaultParameters } from "@/lib/utils";
import { useState } from "react";
import { Trash, ClipboardCopyIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");
  const [parameters, setParameters] = useState(defaultParameters);
  const [parametrizedUrl, setParametrizedUrl] = useState("");

  const handleInputChange = (key: string, value: string) => {
    setParameters((prevState) => ({ ...prevState, [key]: value }));
  };

  const removeParameter = (event: React.MouseEvent, key: string) => {
    event.preventDefault();
    setParameters((prevState) => ({ ...prevState, [key]: "removed" }));
  };

  const generateParametrizedUrl = () => {
    if (baseUrl === "") {
      toast("O camppo URL é obrigatório");
      return;
    }
    let paramsToUse = { ...parameters };

    let url = new URL(baseUrl);

    let sop = url.searchParams.get("sop");

    if (sop && paramsToUse["reg"] !== "removed") {
      sop = sop.replace(/esc.*?-rai_50\.1_/, "");
      url.searchParams.set("sop", sop);
    }

    paramsToUse["bid"] = url.searchParams.get("bid") || "";
    paramsToUse["sop"] = url.searchParams.get("sop") || "";

    Object.keys(paramsToUse).forEach((key) => {
      if (paramsToUse[key] === "removed") {
        delete paramsToUse[key];
      }
    });

    const params = new URLSearchParams(paramsToUse).toString();
    const newParametrizedUrl = `${url.origin}${url.pathname}?${params}`;
    setParametrizedUrl(newParametrizedUrl); // Update parametrized URL
  };

  const copyUrl = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(parametrizedUrl);
    toast("URL copiada");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>
            <Image className="my-5" src="logo.svg" alt="Logo icarros" width={100} height={100} />
            Parametrizador de URLs
          </CardTitle>
          <CardDescription>
            Parametrize as urls para suas campanhas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="md:p-4">
            <Label htmlFor="baseUrl">URL Base</Label>
            <Input
              id="baseUrl"
              placeholder={"URL"}
              className="mb-5"
              required
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
            <span className="text-md">
              <b>Parâmetros Padrões</b>
            </span>
            {Object.keys(defaultParameters).map((key: string) => {
              return (
                <div
                  key={key}
                  className={cn(
                    "w-full flex gap-4 pt-4 items-center",
                    parameters[key] === "removed" && "hidden"
                  )}
                >
                  <div key={key} className="w-full flex flex-col space-y-1.5">
                    <Label htmlFor={key}>{key}</Label>
                    <Input id={key} placeholder={key} value={key} disabled />
                  </div>
                  <span className="pt-3">:</span>
                  <div className="w-full flex flex-col space-y-1.5">
                    <Label htmlFor={defaultParameters[key]}>Valor</Label>
                    <Input
                      id={key}
                      placeholder={key}
                      value={parameters[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  </div>
                  {key === "reg" && (
                    <button onClick={(e) => removeParameter(e, key)}>
                      <Trash className="h-5 mt-4 text-center text-red-500" />
                    </button>
                  )}
                </div>
              );
            })}
            {parametrizedUrl !== "" && (
              <div className="flex gap-4 pt-4 items-center">
                <Input
                  id="parametrizedUrl"
                  placeholder={"URL parametrizada"}
                  value={parametrizedUrl}
                  readOnly
                />
                <button onClick={copyUrl}>
                  <ClipboardCopyIcon className="h-5 w-5 text-blue-500" />
                </button>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between w-full">
          <Button className="w-full md:w-1/3" onClick={generateParametrizedUrl}>
            Gerar URL parametrizada
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
