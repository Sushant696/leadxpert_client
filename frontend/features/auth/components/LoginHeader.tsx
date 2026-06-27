'use client'

import Link from "next/link"
import Image from "next/image"

function LoginHeader() {
  return (
    <div className="border-b border-border bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={"/"}
            className="flex items-center gap-2 flex-shrink-0">
            <Image 
              src={"/logoiconblue.png"} 
              alt="Leadxpert logo" 
              height={50} 
              width={50} 
              className="md:h-[65px] md:w-[65px]" 
            />
            <h1 className="font-semibold text-lg md:text-xl text-foreground">LeadXpert</h1>
          </Link>
          <div className="text-xs md:text-sm text-muted-foreground">
            <span className="hidden sm:inline">Don't have an account? </span>
            <Link href="/register" className="text-primary hover:text-primary-dark font-medium transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginHeader
