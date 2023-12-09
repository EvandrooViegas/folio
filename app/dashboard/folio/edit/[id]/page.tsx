import { getFolioByID } from '@/services/folio'
import { getNodesByFolioID, getNodesByID } from '@/services/nodes/server-actions'
import { prepareNodesForForm } from '@/services/nodes/transformers'
import React from 'react'
import FolioForm from '../../components/FolioForm'

type Props = {
  params: { id: string }
}
export default async function page(props: Props) {
  const { params: { id} } = props 
  const [folio, nodes] = await Promise.all([getFolioByID(id), getNodesByFolioID(id)])
  const preparedNodes = await prepareNodesForForm(nodes)
  if(!folio || !nodes) return "An error occured"
  return (
    <FolioForm folio={folio} nodes={preparedNodes} />
  )
}
