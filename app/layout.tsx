import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bhavya Bansal — Full Stack Developer | AI, Docker, LLM",
  description:
    "Full Stack Developer at MorseBridge Ventures and Computer Science Engineering student at MAIT ('28). Architecting scalable web applications and intelligent AI agent workflows.",
  keywords: [
    "Bhavya Bansal",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Docker",
    "LLM",
    "MorseBridge Ventures",
    "MAIT"
  ],
  authors: [{ name: "Bhavya Bansal" }],
  creator: "Bhavya Bansal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bhavyabansal.dev",
    title: "Bhavya Bansal — Full Stack Developer | AI, Docker, LLM",
    description:
      "I build full-stack, AI-integrated web applications with clarity and purpose.",
    siteName: "Bhavya Bansal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Bansal — Full Stack Developer",
    description:
      "I build full-stack, AI-integrated web applications with clarity and purpose.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased relative min-h-screen">
        {children}
      </body>
    </html>
  );
}
