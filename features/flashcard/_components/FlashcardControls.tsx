import { Button } from "@/components/ui/button";

interface FlashcardControlsProps {
  isLastCard: boolean;
  onRestart: () => void;
}

export function FlashcardControls({ isLastCard, onRestart }: FlashcardControlsProps) {
  if (!isLastCard) return null;

  return (
    <div className="text-center mt-8">
      <p className="text-muted-foreground mb-4">最後のカードです。最初から復習しますか？</p>
      <Button onClick={onRestart}>最初からやり直す</Button>
    </div>
  );
}