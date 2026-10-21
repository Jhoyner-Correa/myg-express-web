"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { contactSchema, type ContactFormValues } from "./schema";
import { submitContact } from "./api";
import { TurnstileWidget } from "./turnstile-widget";

const BRANCH_OPTIONS = [
  { value: "", label: "Selecciona una sede (Opcional)" },
  { value: "La Merced", label: "Sede Principal La Merced" },
  { value: "Satipo", label: "Sede Principal Satipo" },
  { value: "Oxapampa", label: "Sede Principal Oxapampa" },
  { value: "Huancayo", label: "Sede Principal Huancayo" },
] as const;

export function ContactForm() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      reset();
      setTurnstileResetKey((value) => value + 1);
    },
  });

  const handleTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const onSubmit = (data: ContactFormValues) => mutation.mutate({ ...data, turnstileToken });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">No completar este campo</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Campo Nombre */}
        <div>
          <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre completo"
            {...register("name")}
            aria-invalid={!!errors.name}
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-200 hover:border-slate-300 focus:border-[#0E8F45] focus:ring-[#0E8F45]"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs font-bold text-rose-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Campo Celular */}
        <div>
          <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
            Celular / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+51 999 999 999"
            {...register("phone")}
            aria-invalid={!!errors.phone}
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-1 ${
              errors.phone
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-200 hover:border-slate-300 focus:border-[#0E8F45] focus:ring-[#0E8F45]"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs font-bold text-rose-600">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Campo Sede */}
      <div>
        <label htmlFor="branch" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
          Sede más cercana
        </label>
        <div className="relative">
          <select
            id="branch"
            {...register("branch")}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-300 focus:border-[#0E8F45] focus:outline-none focus:ring-1 focus:ring-[#0E8F45]"
          >
            {BRANCH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Campo Mensaje */}
      <div>
        <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
          Mensaje o consulta
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="¿En qué podemos ayudarte?"
          {...register("message")}
          aria-invalid={!!errors.message}
          className={`w-full rounded-xl border bg-white p-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-1 ${
            errors.message
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
              : "border-slate-200 hover:border-slate-300 focus:border-[#0E8F45] focus:ring-[#0E8F45]"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs font-bold text-rose-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Botón Corporativo de Enviar */}
      <TurnstileWidget onTokenChange={handleTurnstileToken} resetKey={turnstileResetKey} />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0E8F45] py-3.5 px-6 font-sans text-sm font-bold text-white transition-colors hover:bg-[#097336] focus:outline-none focus:ring-2 focus:ring-[#0E8F45] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-65"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Enviando mensaje...</span>
          </>
        ) : mutation.isSuccess ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            <span>Mensaje Enviado</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Enviar Mensaje</span>
          </>
        )}
      </button>

      {/* Alertas */}
      {mutation.isError && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700" role="alert">
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-600" />
          <span>{mutation.error.message}</span>
        </div>
      )}

      {mutation.isSuccess && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-medium text-emerald-900" role="status">
          <p className="font-bold text-[#0E8F45]">¡Mensaje recibido correctamente!</p>
          <p className="mt-0.5 text-slate-600">Te responderemos en menos de 2 horas en horario de atención.</p>
        </div>
      )}
    </form>
  );
}

