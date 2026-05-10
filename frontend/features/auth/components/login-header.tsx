'use client'

import Link from "next/link"
import Image from "next/image"

function LoginHeader() {
  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className="flex items-center gap-2">
            <Image src={"/logoiconblue.png"} alt="Leadxpert logo" height={65} width={65} />
            <h1 className="font-semibold text-xl text-foreground">LeadXpert</h1>
          </Link>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors">
              Get started free
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginHeader
