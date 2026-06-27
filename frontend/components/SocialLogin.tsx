import { Button } from "./ui/button";
import { Lock } from "lucide-react";

function SocialLogin() {
  return (
    <div className="space-y-4">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">Secure SSO login</span>
        </div>
      </div>

      <Button variant="outline" className="w-full h-12 justify-start text-left">
        <div className="h-5 w-5 mr-3 rounded bg-primary/10 flex items-center justify-center">
          <Lock className="h-3 w-3 text-primary" />
        </div>
        <span>Continue with SSO</span>
      </Button>
    </div>
  )
}

export default SocialLogin
