import NavbarPublic from "@/components/NavbarPublic";
import LandingPage from "./(public)/landing-page/page";
import FooterPublic from "@/components/FooterPublic";
import PWAInstallButton from "@/components/PWAInstallButton";

export default function Home() {
  return (
    <>
    <NavbarPublic />
    <LandingPage />
    <PWAInstallButton />
    <FooterPublic />
    </>
  )
}