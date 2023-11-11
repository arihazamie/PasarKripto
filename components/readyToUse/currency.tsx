"use client"
import * as React from "react"
import { Banknote} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const useCurrency = () => {
  const [Choose, setChoose] = useState("");
  const [CurrencyChoose, setCurrencyChoose] = useState("");
  const [APIChoose, setAPIChoose] = useState("");

  return { Choose, setChoose, CurrencyChoose, setCurrencyChoose, APIChoose, setAPIChoose };
};

export function Currency() {

  const { Choose, setChoose} = useCurrency();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="sm" className="rounded-full">
            <Banknote className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Banknote className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Currency</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setChoose("USD")} className="mx-10">
            USD
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setChoose("IDR")} className="mx-10">
            IDR
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
