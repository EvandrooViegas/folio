"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ForceReload() {
    const r = useRouter()
    useEffect(() => {
        r.refresh()
    }, [])
    return null
}