import { Download, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { starterProjects } from "@/lib/content/starters";

export function StarterProjects() {
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PackageOpen className="size-4" /> Don&apos;t have a project handy?
        </CardTitle>
        <CardDescription>
          Download one of these small starter projects and point Claude Code at it for this
          practicum — or any real or toy project of your own works too.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {starterProjects.map((s) => (
          <div key={s.id} className="flex flex-col rounded-lg border border-border bg-card p-4">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="font-heading text-sm font-semibold">{s.title}</span>
              <Badge variant="outline" className="shrink-0 text-xs">
                {s.sizeLabel}
              </Badge>
            </div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">{s.stack}</p>
            <p className="mb-2 text-sm text-muted-foreground">{s.description}</p>
            <p className="mb-3 text-xs text-muted-foreground">{s.goodFor}</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-auto self-start"
              nativeButton={false}
              render={<a href={`/starters/${s.fileName}`} download />}
            >
              <Download className="size-3.5" /> Download .zip
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
