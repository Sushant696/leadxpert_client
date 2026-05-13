import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/layout/navbar/navigation"

export default function NotFound() {
  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-2">
        <div className="max-w-2xl w-full">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Illustration */}
            <div >
              <img className="relative w-full h-80" src="/icons/404_icon.svg" alt="logo" />
            </div>

            {/* Error content */}
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-6xl font-bold text-slate-900">404</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 text-balance">Page Not Found</h1>
              <p className="text-lg text-slate-600 text-balance max-w-lg">
                Looks like this page went off your CRM radar. It might have been moved, deleted, or never existed in the
                first place.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </Link>
              <Link href="/leads">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-300 text-slate-700 rounded-lg px-8 bg-transparent"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Leads
                </Button>
              </Link>
            </div>

            {/* Footer help text */}
            <p className="text-sm text-slate-500 pt-4">
              Need help? Contact support or return to{" "}
              <Link href="/" className="text-blue-600 hover:underline font-medium">
                your dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

