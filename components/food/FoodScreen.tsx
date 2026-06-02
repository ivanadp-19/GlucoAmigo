"use client";

import Link from "next/link";
import { FoodSuggestions } from "@/components/food/FoodSuggestions";
import { PlateBuilder } from "@/components/food/PlateBuilder";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { FOOD_DISCLAIMER } from "@/lib/mock-data";

export function FoodScreen() {
  return (
    <div className="space-y-5 pb-2 pt-2">
      <header className="space-y-2">
        <Link
          href="/"
          className="inline-block text-xs font-semibold text-primary transition hover:underline"
        >
          ← Inicio
        </Link>
        <h1 className="text-2xl font-extrabold text-text">¿Qué puedo comer?</h1>
        <p className="text-sm text-muted">
          Ideas prácticas y porciones de referencia para armar comidas
          balanceadas.
        </p>
      </header>

      <Disclaimer variant="food" text={FOOD_DISCLAIMER} />

      <FoodSuggestions />
      <PlateBuilder />
    </div>
  );
}
