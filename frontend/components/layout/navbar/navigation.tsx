'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src={"/logoiconblue.png"} alt="Leadxpert logo" height={40} width={40} />
            <h1 className="font-semibold text-xl text-foreground">LeadXpert</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/company" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Company
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="hover:bg-primary/80 hover:text-white">
              <Link href={"/login"} >
                Sign In
              </Link>
            </Button>
            <div className="h-8">
              <Separator orientation="vertical" />
            </div>
            <Button className="">
              <Link href={"/register"} >
                Try for free
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>



        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors"   >
                Products
              </Link>
              <Link href="/company" className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors">
                Company
              </Link>
              <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors">
                Blog
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors">
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">
                  Try for free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


export default Navigation
