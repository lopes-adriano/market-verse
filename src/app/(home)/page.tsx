import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
  return (
    <div className=" p-4 flex flex-col gap-11 items-start justify-center min-h-screen bg-gray-100">
      <Button variant="elevated">Click Me</Button>
      <Input placeholder="Click Me" />
      <Progress value={50} />
      <Textarea placeholder="Click Me" />
    </div>
  );
}
