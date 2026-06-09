// Typen + Initialzustand fuer das Mitglieds-Formular.
// Bewusst KEINE "use server"-Datei: Server-Action-Dateien duerfen nur
// async Funktionen exportieren, keine Objekte/Konstanten.

export type Mitgliedstyp = "einzel" | "verein";

export type MitgliedFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
  mitgliedstyp?: Mitgliedstyp;
};

export const initialMitgliedState: MitgliedFormState = {
  status: "idle",
  message: "",
};
