export const revalidate = 0;
import React, { Suspense } from "react";
import Nodes from "./Nodes";

type Props = {
  params: { id: string };
};
export default async function FolioPage(props: Props) {
  const {
    params: { id },
  } = props;
  return (
    <main>
      <Suspense fallback="loading...">
        <Nodes id={id} />
      </Suspense>
    </main>
  );
}
