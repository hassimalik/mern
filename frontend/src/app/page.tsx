import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";

export default function Home() {
  return (
    <main className="min-h-screen gap-4 flex items-center justify-center">
      <Button className="bg-white transition-ease hover:bg-amber-700  text-black">Add Todo</Button>
      <Input placeholder="Enter Todo"/>
    </main>
  );
}