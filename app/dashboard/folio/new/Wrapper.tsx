import React from "react";
import NewFolioForm from "./components/new-folio-form/NewFolioForm";
import NewFolioFormProvider from "./components/new-folio-form/context/NewFolioFormContext";

export default function Wrapper() {
  return (
    <NewFolioFormProvider>
      <NewFolioForm />
    </NewFolioFormProvider>
  );
}
