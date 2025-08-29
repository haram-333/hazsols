import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HazSols - Software Agency & Digital Solutions",
  description: "We build powerful digital solutions, web applications, and mobile apps that drive business growth. Transform your ideas into reality with our expert development team.",
  keywords: "software agency, web development, mobile apps, digital solutions, custom software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
