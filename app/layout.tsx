import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "UI-Nanda",
  description: "Handcrafted and homegrown components for your next project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
