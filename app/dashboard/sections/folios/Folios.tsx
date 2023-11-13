import React from "react";
import SectionTitle from "../../../../components/section/SectionTitle";
import SectionDescription from "../../../../components/section/SectionDescription";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Folios() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="w-full flex justify-between items-center">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
        </TabsList>
      </Tabs>
      <Link href="/dashboard/folio/new">
      <Button icon="more">
        Create a new folio
      </Button>
      </Link>
      </div>
      <div>
        <SectionTitle>Folios</SectionTitle>
        <SectionDescription>Manage and view your folios</SectionDescription>
      </div>
    </div>
  );
}
