import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Button className="mt-6 bg-blue-500 text-white hover:bg-blue-600">
        Click Me
      </Button>
    </div>
  );
}