import type { Metadata, Viewport } from "next";
import "@/styles/globals.scss";
import "@/public/sw";
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  GlobalContextProvider,
} from "./components/reducer/context";

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description:
    "Unleash your focused work sessions with our intuitive Pomodoro technique-inspired timer. Boost your efficiency, stay organized, and maintain a healthy work-life balance by breaking your tasks into manageable intervals, coupled with rejuvenating breaks.",
  authors: [{ name: "Dann Gil Rabaya" }, { name: "DG Rabaya" }],
  keywords: "Pomodoro Timer, Pomodoro, pomodoro",
  manifest: "/manifest.json",
};
  
export const viewport: Viewport = {
  themeColor: "#fed7aa",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContextProvider>
      <html lang="en">
        <body className="relative h-[100vh] w-[100vw] overflow-hidden">
          {children}
          <SpeedInsights />
        </body>
      </html>
    </GlobalContextProvider>
  );
}
