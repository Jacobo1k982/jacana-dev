export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    {
                        title: "Product",
                        links: ["Features", "Enterprise", "Customer Stories", "Pricing", "Resources"],
                    },
                    {
                        title: "Platform",
                        links: ["Developer API", "Partners", "Atom", "Electron", "GitHub Desktop"],
                    },
                    {
                        title: "Support",
                        links: ["Docs", "Community Forum", "Professional Services", "Skills"],
                    },
                    {
                        title: "Company",
                        links: ["About", "Blog", "Careers", "Press", "Inclusion"],
                    },
                ].map((col, idx) => (
                    <div key={idx}>
                        <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                        <ul className="space-y-2">
                            {col.links.map((link, i) => (
                                <li key={i}>
                                    <a href="#" className="hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                <p>© 2025 GitHub, Inc. Terms • Privacy • Security • Status</p>
            </div>
        </footer>
    );
}