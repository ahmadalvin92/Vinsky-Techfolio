import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Alvin Griffin | Fullstack & AI Engineer",
  description:
    "Portfolio of Ahmad Alvin Griffin, a Computer Science graduate focused on full-stack engineering, cloud, and computer vision.",
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
