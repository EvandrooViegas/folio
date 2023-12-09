import { fetchUserFolios } from "@/services/folio";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { date } from "@/utils/date";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function FoliosList() {
  const folios = await fetchUserFolios();
  return (
    <div className="grid grid-cols-3 gap-4">
      {folios?.map((folio) => (
        <Card className="relative" key={folio.id}>
          <CardHeader>
            <CardTitle className="text-lg">{folio.name}</CardTitle>
            <CardDescription>{folio.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-2">
            <Link href={`/v/${folio.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="text-xs font-semibold text-dimmed">
                {date.fromNow(folio.created_at)}
              </div>
              <div className="flex items-center gap-0.5 text-xs border border-dashed text-gray-2 px-2.5 py-0.5 rounded-full">
                {folio.private ? "Private" : "Public"}
                <Icon name={folio.private ? "hide" : "show"} />
              </div>
            </div>
            <div className="absolute right-4 top-4">
              <DropdownMenu>
                <DropdownMenuTrigger />
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Folio</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/dashboard/folio/edit/${folio.id}`}>Edit</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
