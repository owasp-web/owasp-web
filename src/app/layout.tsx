import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OWASP Foundation - The Open Source Foundation for Application Security",
  description: "The Open Web Application Security Project® (OWASP) is a nonprofit foundation that works to improve the security of software through open-source tools, expert education, and collaborative innovation.",
  keywords: ["OWASP", "cybersecurity", "web application security", "software security", "security tools", "open source"],
  authors: [{ name: "OWASP Foundation" }],
  openGraph: {
    title: "OWASP Foundation - The Open Source Foundation for Application Security",
    description: "The Open Web Application Security Project® (OWASP) is a nonprofit foundation that works to improve the security of software through open-source tools, expert education, and collaborative innovation.",
    type: "website",
    url: "https://owasp.org",
    siteName: "OWASP Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "OWASP Foundation - The Open Source Foundation for Application Security",
    description: "The Open Web Application Security Project® (OWASP) is a nonprofit foundation that works to improve the security of software through open-source tools, expert education, and collaborative innovation.",
    site: "@owasp",
    creator: "@owasp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
