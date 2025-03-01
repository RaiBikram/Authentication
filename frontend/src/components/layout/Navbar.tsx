"use client";

import React, { useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data, isError, isLoading } = useAuth();
  // Define the logout mutation
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      // Sending GET request to the logout endpoint
      const response = await api.post("/logout");
      return response.data;
    },
    onSuccess: () => {
      toast.success("Logged out successfully!");
      router.push("/sign-in");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  // if (isLoading) {
  //   useEffect(() => {
  //     console.log("ERror", isError);
  //     if (isError) {
  //       mutate();
  //     }
  //   }, [isError, mutate]);
  // }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold">Brand</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link href="/products/featured" legacyBehavior passHref>
                      <NavigationMenuLink className="block p-3 space-y-1 rounded-md hover:bg-slate-100">
                        <div className="font-medium">Featured</div>
                        <p className="text-sm text-slate-500">
                          Check out our featured products
                        </p>
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/products/new" legacyBehavior passHref>
                      <NavigationMenuLink className="block p-3 space-y-1 rounded-md hover:bg-slate-100">
                        <div className="font-medium">New Arrivals</div>
                        <p className="text-sm text-slate-500">
                          The latest additions to our catalog
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA and Mobile Menu */}
        {isLoading ? (
          <span>Loading...</span>
        ) : data ? (
          <Button onClick={handleLogout} disabled={isPending}>
            {isPending ? "Logging out..." : "Logout"}
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link href="/sign-in">
                <Button>Sign in</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/products" className="text-lg font-medium">
                  Products
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
                <Button className="mt-4">Sign In</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
