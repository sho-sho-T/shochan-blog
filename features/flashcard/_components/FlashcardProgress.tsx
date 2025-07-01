import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCcw } from "lucide-react";

interface FlashcardProgressProps {
  completedCount: number;
  totalCount: number;
  onReset: () => void;
}

export function FlashcardProgress({ completedCount, totalCount, onReset }: FlashcardProgressProps) {
  const progressPercentage = completedCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          進捗状況: {completedCount} / {totalCount} 枚完了
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs text-muted-foreground"
        >
          <RefreshCcw className="h-3 w-3 mr-1" />
          進捗をリセット
        </Button>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}