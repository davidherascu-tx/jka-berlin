"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  initialMitgliedState,
  submitMitgliedForm,
  type Mitgliedstyp,
  type MitgliedFormState,
} from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold tracking-wider uppercase text-sm px-8 py-4 rounded-md transition-colors duration-300 shadow-lg shadow-red-600/20"
    >
      {pending ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
          </svg>
          Wird gesendet …
        </>
      ) : (
        <>
          Antrag absenden
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}

function fieldClasses(hasError: boolean): string {
  return `mt-2 w-full rounded-md border bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 transition-colors ${
    hasError ? "border-red-500" : "border-zinc-300 focus:border-red-600"
  }`;
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-zinc-800">
      {children}
      {required && <span className="text-red-600 ml-0.5">*</span>}
    </label>
  );
}

function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs font-medium text-red-600">{msg}</p>;
}

function TypeToggle({
  value,
  onChange,
}: {
  value: Mitgliedstyp;
  onChange: (v: Mitgliedstyp) => void;
}) {
  const baseBtn =
    "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold tracking-wider uppercase rounded-md transition-colors duration-200";
  return (
    <div className="inline-flex w-full bg-zinc-100 p-1 rounded-lg" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={value === "einzel"}
        onClick={() => onChange("einzel")}
        className={`${baseBtn} ${
          value === "einzel"
            ? "bg-white text-red-600 shadow-sm"
            : "text-zinc-500 hover:text-zinc-800"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Einzelperson
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "verein"}
        onClick={() => onChange("verein")}
        className={`${baseBtn} ${
          value === "verein"
            ? "bg-white text-red-600 shadow-sm"
            : "text-zinc-500 hover:text-zinc-800"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        Verein
      </button>
    </div>
  );
}

export default function MitgliedForm() {
  const [state, formAction] = useActionState<MitgliedFormState, FormData>(
    submitMitgliedForm,
    initialMitgliedState
  );
  const [typ, setTyp] = useState<Mitgliedstyp>(state.mitgliedstyp ?? "einzel");

  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 lg:p-10">
        <div className="flex items-start gap-4">
          <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-zinc-900">Anfrage gesendet</h3>
            <p className="mt-2 text-zinc-700 leading-relaxed">{state.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <input type="hidden" name="mitgliedstyp" value={typ} />

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Art der Mitgliedschaft
        </p>
        <TypeToggle value={typ} onChange={setTyp} />
        <p className="mt-3 text-sm text-zinc-500">
          {typ === "einzel"
            ? "Du möchtest persönlich bei JKA-Berlin trainieren? Dann fülle bitte dieses Formular aus."
            : "Ihr Verein möchte sich JKA-Berlin anschließen? Dann nutzt bitte dieses Formular."}
        </p>
      </div>

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.message}
        </div>
      )}

      {typ === "einzel" ? (
        <EinzelFields values={v} errors={e} />
      ) : (
        <VereinFields values={v} errors={e} />
      )}

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="datenschutz"
            value="ja"
            defaultChecked={v.datenschutz === "ja"}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-red-600 focus:ring-red-600"
          />
          <span className="text-sm text-zinc-700 leading-relaxed">
            Ich habe die{" "}
            <a href="/datenschutz" className="text-red-600 underline hover:no-underline" target="_blank">
              Datenschutzerklärung
            </a>{" "}
            gelesen und stimme der Verarbeitung der Daten zur Bearbeitung der Anfrage zu. <span className="text-red-600">*</span>
          </span>
        </label>
        <ErrorMsg msg={e.datenschutz} />
      </div>

      <div className="pt-2">
        <SubmitButton />
        <p className="mt-4 text-xs text-zinc-500">
          Pflichtfelder sind mit <span className="text-red-600">*</span> markiert.
        </p>
      </div>
    </form>
  );
}

function EinzelFields({
  values,
  errors,
}: {
  values: Record<string, string>;
  errors: Record<string, string>;
}) {
  return (
    <>
      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Persönliche Daten
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="vorname" required>Vorname</Label>
            <input id="vorname" name="vorname" type="text" autoComplete="given-name" defaultValue={values.vorname ?? ""} className={fieldClasses(!!errors.vorname)} />
            <ErrorMsg msg={errors.vorname} />
          </div>
          <div>
            <Label htmlFor="nachname" required>Nachname</Label>
            <input id="nachname" name="nachname" type="text" autoComplete="family-name" defaultValue={values.nachname ?? ""} className={fieldClasses(!!errors.nachname)} />
            <ErrorMsg msg={errors.nachname} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="geburtsdatum" required>Geburtsdatum</Label>
            <input id="geburtsdatum" name="geburtsdatum" type="date" defaultValue={values.geburtsdatum ?? ""} className={fieldClasses(!!errors.geburtsdatum)} />
            <ErrorMsg msg={errors.geburtsdatum} />
          </div>
          <div>
            <Label htmlFor="telefon">Telefon</Label>
            <input id="telefon" name="telefon" type="tel" autoComplete="tel" defaultValue={values.telefon ?? ""} className={fieldClasses(false)} />
          </div>
        </div>
        <div>
          <Label htmlFor="email" required>E-Mail</Label>
          <input id="email" name="email" type="email" autoComplete="email" defaultValue={values.email ?? ""} className={fieldClasses(!!errors.email)} />
          <ErrorMsg msg={errors.email} />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Adresse
        </legend>
        <div>
          <Label htmlFor="strasse" required>Straße &amp; Hausnummer</Label>
          <input id="strasse" name="strasse" type="text" autoComplete="street-address" defaultValue={values.strasse ?? ""} className={fieldClasses(!!errors.strasse)} />
          <ErrorMsg msg={errors.strasse} />
        </div>
        <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
          <div>
            <Label htmlFor="plz" required>PLZ</Label>
            <input id="plz" name="plz" type="text" inputMode="numeric" autoComplete="postal-code" defaultValue={values.plz ?? ""} className={fieldClasses(!!errors.plz)} />
            <ErrorMsg msg={errors.plz} />
          </div>
          <div>
            <Label htmlFor="ort" required>Ort</Label>
            <input id="ort" name="ort" type="text" autoComplete="address-level2" defaultValue={values.ort ?? ""} className={fieldClasses(!!errors.ort)} />
            <ErrorMsg msg={errors.ort} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Karate
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="dojo">Aktuelles / letztes Dojo</Label>
            <input id="dojo" name="dojo" type="text" defaultValue={values.dojo ?? ""} className={fieldClasses(false)} />
          </div>
          <div>
            <Label htmlFor="graduierung">Graduierung</Label>
            <input id="graduierung" name="graduierung" type="text" placeholder="z.B. 5. Kyu, 1. Dan" defaultValue={values.graduierung ?? ""} className={fieldClasses(false)} />
          </div>
        </div>
        <div>
          <Label htmlFor="erfahrung">Karate-Erfahrung</Label>
          <textarea id="erfahrung" name="erfahrung" rows={3} placeholder="Seit wann trainierst Du? Wo hast Du bisher trainiert?" defaultValue={values.erfahrung ?? ""} className={fieldClasses(false)} />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Nachricht
        </legend>
        <div>
          <Label htmlFor="nachricht">Anmerkungen (optional)</Label>
          <textarea id="nachricht" name="nachricht" rows={4} defaultValue={values.nachricht ?? ""} className={fieldClasses(false)} />
        </div>
      </fieldset>
    </>
  );
}

function VereinFields({
  values,
  errors,
}: {
  values: Record<string, string>;
  errors: Record<string, string>;
}) {
  return (
    <>
      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Verein
        </legend>
        <div>
          <Label htmlFor="vereinsname" required>Vereinsname</Label>
          <input id="vereinsname" name="vereinsname" type="text" defaultValue={values.vereinsname ?? ""} className={fieldClasses(!!errors.vereinsname)} />
          <ErrorMsg msg={errors.vereinsname} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="mitgliederzahl">Anzahl aktiver Karateka</Label>
            <input id="mitgliederzahl" name="mitgliederzahl" type="text" inputMode="numeric" defaultValue={values.mitgliederzahl ?? ""} className={fieldClasses(false)} />
          </div>
          <div>
            <Label htmlFor="verband">Aktuelle Verbandszugehörigkeit</Label>
            <input id="verband" name="verband" type="text" placeholder="z.B. DJKB, DKV, ungebunden …" defaultValue={values.verband ?? ""} className={fieldClasses(false)} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Vereinssitz
        </legend>
        <div>
          <Label htmlFor="strasse" required>Straße &amp; Hausnummer</Label>
          <input id="strasse" name="strasse" type="text" autoComplete="street-address" defaultValue={values.strasse ?? ""} className={fieldClasses(!!errors.strasse)} />
          <ErrorMsg msg={errors.strasse} />
        </div>
        <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
          <div>
            <Label htmlFor="plz" required>PLZ</Label>
            <input id="plz" name="plz" type="text" inputMode="numeric" autoComplete="postal-code" defaultValue={values.plz ?? ""} className={fieldClasses(!!errors.plz)} />
            <ErrorMsg msg={errors.plz} />
          </div>
          <div>
            <Label htmlFor="ort" required>Ort</Label>
            <input id="ort" name="ort" type="text" autoComplete="address-level2" defaultValue={values.ort ?? ""} className={fieldClasses(!!errors.ort)} />
            <ErrorMsg msg={errors.ort} />
          </div>
        </div>
        <div>
          <Label htmlFor="trainingsorte">Trainingsorte (falls abweichend)</Label>
          <textarea id="trainingsorte" name="trainingsorte" rows={2} defaultValue={values.trainingsorte ?? ""} className={fieldClasses(false)} />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Ansprechpartner
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="ansprech_vorname" required>Vorname</Label>
            <input id="ansprech_vorname" name="ansprech_vorname" type="text" autoComplete="given-name" defaultValue={values.ansprech_vorname ?? ""} className={fieldClasses(!!errors.ansprech_vorname)} />
            <ErrorMsg msg={errors.ansprech_vorname} />
          </div>
          <div>
            <Label htmlFor="ansprech_nachname" required>Nachname</Label>
            <input id="ansprech_nachname" name="ansprech_nachname" type="text" autoComplete="family-name" defaultValue={values.ansprech_nachname ?? ""} className={fieldClasses(!!errors.ansprech_nachname)} />
            <ErrorMsg msg={errors.ansprech_nachname} />
          </div>
        </div>
        <div>
          <Label htmlFor="ansprech_funktion">Funktion im Verein</Label>
          <input id="ansprech_funktion" name="ansprech_funktion" type="text" placeholder="z.B. 1. Vorsitzender, Cheftrainer" defaultValue={values.ansprech_funktion ?? ""} className={fieldClasses(false)} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="email" required>E-Mail</Label>
            <input id="email" name="email" type="email" autoComplete="email" defaultValue={values.email ?? ""} className={fieldClasses(!!errors.email)} />
            <ErrorMsg msg={errors.email} />
          </div>
          <div>
            <Label htmlFor="telefon">Telefon</Label>
            <input id="telefon" name="telefon" type="tel" autoComplete="tel" defaultValue={values.telefon ?? ""} className={fieldClasses(false)} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
          Nachricht
        </legend>
        <div>
          <Label htmlFor="nachricht">Anmerkungen (optional)</Label>
          <textarea id="nachricht" name="nachricht" rows={4} defaultValue={values.nachricht ?? ""} className={fieldClasses(false)} />
        </div>
      </fieldset>
    </>
  );
}
