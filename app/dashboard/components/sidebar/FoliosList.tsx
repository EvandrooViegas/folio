import { fetchUserFolios } from '@/services/folio'
import React from 'react'

export default async function FoliosList() {
  const folios = await fetchUserFolios()
    return (
    <ul className='space-y-0.5 '>
       {folios?.map(folio => (
        <li className='pl-4 text-dimmed flex gap-3 items-center truncate' key={folio.id}>
           <div className='w-2 h-2 rounded-full bg-skeleton' />
            <div> {folio.name}</div>
        </li>
       ))} 
    </ul>
  )
}
