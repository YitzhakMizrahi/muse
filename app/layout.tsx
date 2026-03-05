import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Muse",
  description:
    "Creative Direction Engine for turning a rough idea into one recommended direction and two clear alternates.",
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
