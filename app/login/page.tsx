// app/login/page.tsx
import { LoginDialog } from "@/components/auth/login-dialog"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoginDialog />
        </div>
    )
}