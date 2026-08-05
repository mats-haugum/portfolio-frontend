import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { contact, profile, siteUrl } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  sameAs: contact.links.map((link) => link.href),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Noroff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:border focus:border-accent focus:bg-background focus:px-6 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-accent"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Nav />
        <main id="main" className="flex-1">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
