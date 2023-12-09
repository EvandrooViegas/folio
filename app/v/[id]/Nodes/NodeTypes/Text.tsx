"use client"
import React from 'react'
import { useNodeContext } from '.'

export default function Text() {
  const { node }  = useNodeContext()
  if(node.type != "text") return null
  return (
    <p className='text-dimmed'>{node.value?.text}</p>
  )
}
