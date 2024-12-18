import type { Metadata } from "next";
import "../globals.css";
import { Nunito } from "next/font/google"
import { Navbar } from "@/components/Navbar";
import { Toast } from "@/components/Toaster";
import SessionProviderWrapper from "@/lib/sessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import RentModal from "@/components/RentModal";

const nunito = Nunito({
  subsets: ["latin"],
  variable: '--nunito',
  style: ["normal"]
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Book Homes, Experiences, and More",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${nunito.className} font-nunito`}>
        <SessionProviderWrapper session={session}>
          <Navbar />
          {/* Rent Modal Popup */}
          <RentModal />
          <div>
            {children}
          </div>
          <Toast />
        </SessionProviderWrapper>
      </body>
    </html >
  );
}
