import React from 'react'

export default function SectionDescription(props: {
  children: React.ReactNode
}) {
  return (
    <p className='text-neutral-600 leading-none'>{props.children}</p>
  )
}
