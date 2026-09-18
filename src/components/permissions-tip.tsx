import { Eye } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PermissionsTip() {
  return (
    <Alert>
      <Eye className="size-4" />
      <AlertTitle>Keep permission prompts on for this practicum</AlertTitle>
      <AlertDescription>
        If you normally run Claude Code with &quot;bypass permissions&quot; mode on, turn it off
        while you work through practicums. This exercise is built around seeing what Claude Code
        proposes before it happens — bypass mode skips those prompts entirely, along with the
        moment the practicum is asking you to pay attention to.
      </AlertDescription>
    </Alert>
  );
}
