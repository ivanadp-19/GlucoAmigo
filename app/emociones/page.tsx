import { EmotionalCheckIn } from "@/components/emotions/EmotionalCheckIn";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function EmocionesPage() {
  return (
    <div className="space-y-5 pb-2">
      <EmotionalCheckIn />
      <Disclaimer />
    </div>
  );
}
