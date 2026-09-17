import { Document, Page, View, Text, StyleSheet, Svg, Path, Rect } from "@react-pdf/renderer";

const CLAY = "#B5602E";
const CREAM = "#FBF6EE";
const INK = "#372B20";
const MUTED = "#8A7A68";
const BORDER = "#E3D6C1";

const styles = StyleSheet.create({
  page: {
    backgroundColor: CREAM,
    padding: 0,
    fontFamily: "Helvetica",
  },
  frame: {
    margin: 28,
    flex: 1,
    borderWidth: 2,
    borderColor: CLAY,
    padding: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 6,
  },
  brand: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: CLAY,
    letterSpacing: 1,
  },
  kicker: {
    textAlign: "center",
    fontSize: 11,
    color: MUTED,
    letterSpacing: 3,
    marginTop: 26,
    textTransform: "uppercase",
  },
  title: {
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontSize: 30,
    color: INK,
    marginTop: 10,
  },
  bodyText: {
    textAlign: "center",
    fontSize: 12,
    color: MUTED,
    marginTop: 18,
  },
  name: {
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontSize: 34,
    color: CLAY,
    marginTop: 14,
  },
  courseText: {
    textAlign: "center",
    fontSize: 13,
    color: INK,
    marginTop: 18,
    lineHeight: 1.5,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: BORDER,
    marginTop: 22,
    marginHorizontal: 80,
  },
  footerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
  },
  footerBlock: {
    alignItems: "center",
    width: 180,
  },
  footerLabel: {
    fontSize: 9,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: 4,
  },
  footerValue: {
    fontSize: 11,
    color: INK,
    fontFamily: "Helvetica-Bold",
  },
});

function Mark() {
  return (
    <Svg width={22} height={22} viewBox="0 0 40 40">
      <Rect width={40} height={40} rx={11} fill={CLAY} />
      <Path
        d="M12 13L18.5 19.5C18.9 19.9 18.9 20.55 18.5 20.95L12 27.5"
        stroke={CREAM}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M22 27.5H29.5" stroke={CREAM} strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

export type CertificateData = {
  fullName: string;
  certificateNumber: string;
  issuedAt: string;
  moduleCount: number;
};

export function CertificateDocument({ fullName, certificateNumber, issuedAt, moduleCount }: CertificateData) {
  const formattedDate = new Date(issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document title={`Certificate of Completion — ${fullName}`}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.frame}>
          <View>
            <View style={styles.headerRow}>
              <Mark />
              <Text style={styles.brand}>CLAUDE CODE ACADEMY</Text>
            </View>
            <Text style={styles.kicker}>Certificate of Completion</Text>
            <Text style={styles.title}>Learn Claude Code</Text>
            <Text style={styles.bodyText}>This certifies that</Text>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.courseText}>
              has successfully completed all {moduleCount} modules of the Learn Claude Code
              course — including every module quiz, hands-on practicum, and the capstone
              project — demonstrating applied proficiency with Claude Code across a full
              development lifecycle.
            </Text>
          </View>

          <View>
            <View style={styles.divider} />
            <View style={styles.footerRow}>
              <View style={styles.footerBlock}>
                <Text style={styles.footerValue}>{formattedDate}</Text>
                <Text style={styles.footerLabel}>Date issued</Text>
              </View>
              <View style={styles.footerBlock}>
                <Text style={styles.footerValue}>{certificateNumber}</Text>
                <Text style={styles.footerLabel}>Certificate number</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
