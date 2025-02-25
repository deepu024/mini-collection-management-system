import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Mini Collection Management",
  description: "Frontend for payments & notifications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
