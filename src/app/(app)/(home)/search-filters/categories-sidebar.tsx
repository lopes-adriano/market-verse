import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoryOutput } from "@/modules/categories/types";

interface CategoriesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({
  open,
  onOpenChange,
}: CategoriesSidebarProps) => {
  const [parentCategories, setParentCategories] = useState<
    CategoryOutput[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOutput | null>(null);
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const currentCategories = parentCategories || data || [];
  const backgrounColor = selectedCategory?.color || "white";

  function handleOpenChange(open: boolean) {
    if (!open) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
    onOpenChange(open);
  }

  function handleCategoryClick(category: CategoryOutput) {
    if (category.subcategories?.length) {
      setParentCategories(category.subcategories as CategoryOutput[]);
      setSelectedCategory(category);
      return;
    }

    if (parentCategories && selectedCategory) {
      router.push(`/${selectedCategory.slug}/${category.slug}`);
      handleOpenChange(false);
      return;
    }

    if (category.slug === "all") {
      router.push("/");
      handleOpenChange(false);
      return;
    }

    router.push(`/${category.slug}`);
    handleOpenChange(false);
  }

  function handleBackClick() {
    if (parentCategories && parentCategories.length > 0) {
      setParentCategories(null);
      setSelectedCategory(null);
    } else {
      handleOpenChange(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: backgrounColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categorias</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col h-full overflow-y-auto pb-2">
          {parentCategories && (
            <button
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
              onClick={handleBackClick}
            >
              <ChevronLeftIcon className="mr-2 size-4" />
              Voltar
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-between text-base font-medium cursor-pointer"
              onClick={() => {
                handleCategoryClick(category);
              }}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="ml-2 size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
