import "./globals.css";
import LenisProvider from "./components/lenis-provider";
import LoadingBar from "./components/loading-bar";
import { Josefin_Sans } from 'next/font/google';
import { Suspense } from 'react';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-josefin-sans',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={josefinSans.variable} suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
