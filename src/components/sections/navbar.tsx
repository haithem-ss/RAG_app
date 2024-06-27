import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Navbar() {
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Question Bank", href: "/collection" },
    { title: "Practice Test", href: "/practice" },
    { title: "Create Questions", href: "/questions" },
  ];

  return (
    <header className="flex h-16 w-full items-center justify-between">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((tab) => renderNavLink(tab))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            {navLinks.map((tab) => renderNavLink(tab))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function renderNavLink(tab: { title: string; href: string }) {
  return (
    <Link
      href={`${tab.href}`}
      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
      prefetch={false}
    >
      {tab.title}
    </Link>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
