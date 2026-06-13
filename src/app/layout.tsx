import "./globals.css";

export const metadata = {
  title: "Central - Nothing OS Edition",
  description: "Monochrome Operational Portal built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Silkscreen&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="nothing-dot-grid min-h-screen text-white bg-black antialiased selection:bg-neutral-800">
        {children}
      </body>
    </html>
  );
}
