import FooterPublic from "@/components/FooterPublic";
import NavbarPublic from "@/components/NavbarPublic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPublic />
      {children}
      <FooterPublic />
    </>
  );
}