import LogoGlitch from "@/components/Logo/LogoGlitch";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4">
            <LogoGlitch
                src="/jacana.png"
                intensity="extreme"
                duration={4000}
                text="404 - SYSTEM BREACH"
                subText="El recurso solicitado no existe en este universo"
            />

            <Link
                href="/"
                className="mt-8 px-6 py-3 bg-[#00FF9D] text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-all"
            >
                → Volver al Inicio
            </Link>
        </div>
    );
}