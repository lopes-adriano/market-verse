"use client";

import { Button } from "@/components/ui/button";
import { CustomCategory } from "../types";
import { Categories } from "./Categories";
import { SearchInput } from "./SearchInput";
import { ListFilterIcon } from "lucide-react";
import { useState } from "react";
import { CategoriesSidebar } from "./CategoriesSidebar";

interface SearchFiltersProps {
  data?: CustomCategory[];
}

export const SearchFilters = ({ data }: SearchFiltersProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-12 py-8 border-b w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={data}
      />
      <div className="flex items-center gap-4 w-full">
        <SearchInput />
        <Button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
          <ListFilterIcon className="size-4" />
        </Button>
      </div>
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};
