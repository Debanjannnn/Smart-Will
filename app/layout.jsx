import localFont from "next/font/local";
import "./globals.css";
import { SmartWillProvider } from "@/context/SmartWillContext";

// Load custom fonts
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

// Metadata for the app
export const metadata = {
  title: "Snmart-Will",
  description: "A decentralized way to ensure your assets are passed to your loved ones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmartWillProvider>{children}</SmartWillProvider>
      </body>
    </html>
  );
}
