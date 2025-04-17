import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/src/pages/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const lato = Lato({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en" className={`${lato.className} flex w-full`}>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
