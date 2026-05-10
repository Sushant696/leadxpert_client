import Image from "next/image"

function LoginHeader() {
  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="">
        <div className="flex items-center justify-center">
          <Image src={"/logoiconblue.png"} alt="Leadxpert logo" height={65} width={65} />
          <h1 className="font-semibold text-5xl text-foreground">leadXpert</h1>
        </div>
        <div className="my-4">
          <h5 className="font-light text-black/60 text-center">
            Didn't have account?
            <span className="p-2  font-semibold text-primary"> Get started Free </span>
          </h5>
        </div>
      </div>
    </div >
  )
}

export default LoginHeader
