"use client";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { ListFilterIcon } from "lucide-react";
import { useState } from "react";
import { CategoriesSidebar } from "./categories-sidebar";
import { Categories } from "./categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const SearchFilters = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-12 py-8 border-b w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="flex items-center gap-4 w-full">
        <SearchInput />
        <Button
          variant="outline"
          className="lg:hidden hover:bg-pink-400"
          onClick={() => setIsSidebarOpen(true)}
        >
          <ListFilterIcon className="size-4" />
        </Button>
      </div>
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-4 px-4 lg:px-12 py-8 border-b w-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="flex items-center gap-4 w-full">
        <SearchInput disabled />
        <Button
          disabled
          variant="outline"
          className="lg:hidden hover:bg-pink-400"
        >
          <ListFilterIcon className="size-4" />
        </Button>
      </div>
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};
