"use client";

import React from "react";
import {
  DropdownMenu as DropdownMenuComp,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  dropdownItemTextClassName,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { deleteFolio } from "@/services/folio";
import { useRouter } from "next/navigation";

type Props = {
    id: string
}
export default function DropdownMenu(props: Props) {
    const { id } = props
    const router = useRouter()
    const handleDeleteFolio = async () => {
        await deleteFolio(id)
        router.refresh()
    }
    return (
    <DropdownMenuComp>
      <DropdownMenuTrigger />
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Folio</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/dashboard/folio/edit/${id}`}>Edit</Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild className="w-full">
            <button className={dropdownItemTextClassName + 'text-destructive'}>Remove</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Once the folio is removed there is no way to get it back.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteFolio}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenuComp>
  );
}
