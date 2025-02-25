"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Users", href: "/users" },
    { label: "Customers", href: "/customers" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-4 font-bold text-xl border-b">Mini Collection</div>
      <nav className="flex-1 p-2">
        {navItems.map((item) => {
          const active = path.startsWith(item.href)
            ? "bg-blue-100"
            : "hover:bg-gray-100";
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded ${active}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
