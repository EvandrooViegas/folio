import { getFolioByID } from "@/services/folio";
import React from "react";
import Nodes from "./Nodes";

type Props = {
  params: { id: string }
}
export default async function page(props: Props) {
  const { params: { id } } = props
  if(!id) return "No id provided"
  const folio = await getFolioByID(id, {
    include: { nodes: true }
  })
  if(!folio) return "Couln't find folio"
  if(!("nodes" in folio)) return "A error occured, try again later"
  return (
    <main>
      <Nodes nodes={folio.nodes} />
    </main>
  )
}
