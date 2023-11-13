import React from 'react'

export default function SectionTitle(props: {
    children: React.ReactNode
}) {
  return (
    <h3 className='font-black text-2xl text-neutral-700'>{props?.children}</h3>
  )
}
