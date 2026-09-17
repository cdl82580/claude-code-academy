import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { getProgressMap, isCourseComplete } from "@/lib/progress";
import { TOTAL_MODULES } from "@/lib/content/modules";
import { CertificateDocument } from "@/lib/certificate/document";

export const runtime = "nodejs";

function generateCertificateNumber(userId: string) {
  const year = new Date().getFullYear();
  const suffix = userId.replace(/-/g, "").slice(0, 6).toUpperCase();
  return `CCA-${year}-${suffix}`;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const progressMap = await getProgressMap(supabase, user.id);
  if (!isCourseComplete(progressMap)) {
    return NextResponse.json(
      { error: "Course not yet complete — finish every module's quiz and practicum first." },
      { status: 403 },
    );
  }

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    user.email ||
    "Course Graduate";

  let { data: certificate } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!certificate) {
    const { data: inserted, error } = await supabase
      .from("certificates")
      .insert({
        user_id: user.id,
        full_name: fullName,
        certificate_number: generateCertificateNumber(user.id),
      })
      .select("*")
      .single();

    if (error || !inserted) {
      return NextResponse.json({ error: "Could not issue certificate" }, { status: 500 });
    }
    certificate = inserted;
  }

  const pdfBuffer = await renderToBuffer(
    CertificateDocument({
      fullName: certificate.full_name,
      certificateNumber: certificate.certificate_number,
      issuedAt: certificate.issued_at,
      moduleCount: TOTAL_MODULES,
    }),
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="claude-code-academy-certificate.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
