import RegisterForm from "@/features/auth/components/RegisterForm"

function RegisterClassic() {
  return (
    <div className="w-full max-w-xl mt-6 md:mt-12 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Create your free account</h1>
        <p className="text-sm text-muted-foreground">100% free. No credit card needed.</p>
      </div>

      <div className=" rounded-sm p-2">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterClassic
