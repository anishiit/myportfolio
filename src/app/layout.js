import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Anish Kumar Singh",
  description:
    "Welcome to the portfolio of Anish Kumar Singh, a passionate Full Stack Developer. Explore projects, skills, and experience of Anish Kumar Singh.",
  keywords: [
    "Anish Kumar Singh",
    "Anish",
    "Anish Singh",
    "Full Stack Developer",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Projects",
    "Resume",
    "JavaScript",
    "React",
    "Next.js",
    "IIT ISM Dhanbad",
  ],
  authors: [{ name: "Anish Kumar Singh" }],
  creator: "Anish Kumar Singh",
  openGraph: {
    title: "Anish Kumar Singh | Full Stack Developer Portfolio",
    description:
      "Portfolio of Anish Kumar Singh, Full Stack Developer and Software Engineer. View projects, skills, and contact information.",
    url: "https://anish-portfolio.vercel.app/",
    type: "website",
    siteName: "Anish Kumar Singh Portfolio",
    images: [
      {
        url: "https://anish-portfolio.vercel.app/anish-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anish Kumar Singh Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Kumar Singh | Full Stack Developer Portfolio",
    description:
      "Explore the portfolio of Anish Kumar Singh, Full Stack Developer and Software Engineer.",
    creator: "@your_twitter_handle",
    images: ["https://anish-portfolio.vercel.app/anish-og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
