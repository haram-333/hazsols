import "./globals.css";
import LenisProvider from "./components/lenis-provider";
import PageLoader from "./components/page-loader";
import { ThemeProvider } from "./components/theme-provider";
import { Inter, Outfit, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${montserrat.variable}`} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#0CABA3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof Element !== 'undefined' && Element.prototype) {
                    var origSetAttr = Element.prototype.setAttribute;
                    Element.prototype.setAttribute = function(name, val) {
                      if (name && (name === 'bis_skin_checked' || name === 'bis_register' || name.indexOf('bis_') === 0)) {
                        return;
                      }
                      return origSetAttr.apply(this, arguments);
                    };

                    try {
                      Object.defineProperty(Element.prototype, 'bis_skin_checked', {
                        get: function() { return undefined; },
                        set: function() {},
                        configurable: true
                      });
                    } catch (e) {}
                  }

                  if (typeof MutationObserver !== 'undefined') {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes' && m.attributeName && m.attributeName.indexOf('bis_') === 0) {
                          m.target.removeAttribute(m.attributeName);
                        }
                        if (m.type === 'childList') {
                          for (var j = 0; j < m.addedNodes.length; j++) {
                            var node = m.addedNodes[j];
                            if (node.nodeType === 1) {
                              if (node.hasAttribute && node.hasAttribute('bis_skin_checked')) {
                                node.removeAttribute('bis_skin_checked');
                              }
                              if (node.querySelectorAll) {
                                var els = node.querySelectorAll('[bis_skin_checked]');
                                for (var k = 0; k < els.length; k++) {
                                  els[k].removeAttribute('bis_skin_checked');
                                }
                              }
                            }
                          }
                        }
                      }
                    });
                    observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true, attributeFilter: ['bis_skin_checked', 'bis_register'] });
                  }

                  var filterLog = function(args) {
                    for (var i = 0; i < args.length; i++) {
                      var a = args[i];
                      var str = typeof a === 'string' ? a : (a && (a.message || a.stack) ? (a.message + ' ' + a.stack) : '');
                      if (str && (str.indexOf('bis_skin_checked') !== -1 || str.indexOf('egjidjbpglichdcondbcbdnbeeppgdph') !== -1 || (str.indexOf('hydration-mismatch') !== -1 && str.indexOf('bis_') !== -1))) {
                        return true;
                      }
                    }
                    return false;
                  };

                  var _rawErr = console.error;
                  var curErr = function() {
                    if (filterLog(arguments)) return;
                    return _rawErr.apply(console, arguments);
                  };
                  Object.defineProperty(console, 'error', {
                    get: function() { return curErr; },
                    set: function(fn) {
                      _rawErr = fn;
                      curErr = function() {
                        if (filterLog(arguments)) return;
                        return _rawErr.apply(console, arguments);
                      };
                    },
                    configurable: true
                  });

                  var _rawWarn = console.warn;
                  var curWarn = function() {
                    if (filterLog(arguments)) return;
                    return _rawWarn.apply(console, arguments);
                  };
                  Object.defineProperty(console, 'warn', {
                    get: function() { return curWarn; },
                    set: function(fn) {
                      _rawWarn = fn;
                      curWarn = function() {
                        if (filterLog(arguments)) return;
                        return _rawWarn.apply(console, arguments);
                      };
                    },
                    configurable: true
                  });

                  var savedTheme = null;
                  try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
                  var activeTheme = savedTheme === 'dark' ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', activeTheme);
                  document.documentElement.style.colorScheme = activeTheme;
                  var metaTheme = document.querySelector('meta[name="theme-color"]');
                  if (metaTheme) {
                    metaTheme.setAttribute('content', activeTheme === 'dark' ? '#070709' : '#0CABA3');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <ThemeProvider>
          <PageLoader>
            <LenisProvider>
              {children}
            </LenisProvider>
          </PageLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
