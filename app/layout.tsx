import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timeline Crisis",
  description: "You need to be the hero, you need to save the timeline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
