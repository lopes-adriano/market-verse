import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";

interface SidebarItem {
  href: string;
  children: React.ReactNode;
}

interface SideBarProps {
  items: SidebarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SideBar = ({ items, open, onOpenChange }: SideBarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              href="/signin"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium"
            >
              Comece a vender
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
