'use client'

import Link from "next/link"
import Image from "next/image"

function SignupHeader() {
  return (
    <div>
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src={"/logoiconblue.png"} alt="Leadxpert logo" height={40} width={40} />
          <h1 className="font-semibold text-xl text-foreground">LeadXpert</h1>
        </Link>
      </div>
    </div>
  )
}

export default SignupHeader
