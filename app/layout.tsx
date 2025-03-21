import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ConvexProvider,
  ModalProvider,
  ThemeProvider,
} from "@/components/providers";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jotion",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="jotion-theme"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />

              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
