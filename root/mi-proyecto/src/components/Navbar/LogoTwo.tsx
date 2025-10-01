import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
    return (
        <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
                <motion.img
                    src="/jacana.png"
                    alt="Logo"
                    className="h-22 w-32 object-contain shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            </Link>
        </div>
    );
}
