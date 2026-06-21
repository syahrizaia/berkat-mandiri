import FooterPublic from "@/components/FooterPublic";
import NavbarPublic from "@/components/NavbarPublic";
import PWAInstallButton from "@/components/PWAInstallButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPublic />
      {children}
      <PWAInstallButton />
      <FooterPublic />
    </>
  );
}