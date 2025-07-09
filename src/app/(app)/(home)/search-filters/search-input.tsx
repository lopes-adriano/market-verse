import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  disabled?: boolean;
}

export const SearchInput = ({ placeholder, disabled }: SearchInputProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-500" />
        <Input
          className="pl-8"
          placeholder={placeholder ?? "Pesquisar..."}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
