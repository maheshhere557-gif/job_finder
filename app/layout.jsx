import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topnavabar from "./Components/Topnavabar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Stack",
  description: "Join thousands of job seekers and connect with top companies worldwide.",
  icons: "/icon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Topnavabar />
        <main className="mt-12">{children}</main>
      </body>
    </html>
  );
}