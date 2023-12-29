export const revalidate = 0

import { getFolioByID } from '@/services/folio'
import FolioForm from '../../components/FolioForm'
import { iCompleteFolio } from '@/types/folio'

type Props = {
  params: { id: string }
}
export default async function page(props: Props) {
  const { params: { id} } = props 
  const folio = await getFolioByID(id) as iCompleteFolio
  if(!folio) return "An error occured"
  return (
    <FolioForm folio={folio} />
  )
}
