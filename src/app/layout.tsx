import "./globals.css";
import LenisProvider from "./components/lenis-provider";
import PageLoader from "./components/page-loader";
import { Inter, Outfit } from 'next/font/google';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#14b8a6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  localStorage.removeItem('theme'); // Force clear any cached 'light' theme
                  document.documentElement.setAttribute('data-theme', 'dark');
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <PageLoader>
          <LenisProvider>
            {children}
          </LenisProvider>
        </PageLoader>
      </body>
    </html>
  );
}
