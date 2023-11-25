import React from "react";
import NewFolioFormProvider from "./components/NewFolioForm/context/NewFolioFormContext";
import NewFolioForm from "./components/NewFolioForm";

export default function Wrapper() {
  return (
    <NewFolioFormProvider>
      <NewFolioForm />
    </NewFolioFormProvider>
  );
}
