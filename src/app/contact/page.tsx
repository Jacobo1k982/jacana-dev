// app/contact/page.tsx
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        ¿Hablemos sobre tu proyecto?
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Estoy disponible para proyectos freelance, mentoría o consultoría técnica.
                        Respondo en menos de 24 horas.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
                    <ContactForm />
                </div>

                <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
                    <p className="text-sm">
                        ¿Prefieres por correo? Escríbeme directamente a{" "}
                        <a
                            href="mailto:tucorreo@ejemplo.com"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                        >
                            ventas@jacana-dev.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}