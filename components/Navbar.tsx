"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const routes = [
    {
      href: "/home",
      label: "HOME",
    },
    {
      href: "/social-share",
      label: "SOCIAL SHARE",
    },
    {
      href: "/video-upload",
      label: "VIDEO UPLOAD",
    },
  ];

  return (
    <nav className="p-2">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4 lg:space-x-6 mt-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {isSignedIn ? (
            <SignOutButton>
              <Button variant="outline" size="sm" className="cursor-pointer">
                SIGN OUT
              </Button>
            </SignOutButton>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  SIGN IN
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="cursor-pointer">
                  SIGN UP
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
