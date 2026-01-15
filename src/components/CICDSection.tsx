'use client';

import { useEffect, useState } from 'react';

export default function CICDSection() {
    const [text, setText] = useState('');
    const fullText = "npm run deploy";

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i <= fullText.length) {
                setText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 150);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6 animate-fade-up">Automate anything with GitHub Actions</h2>
                <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto animate-fade-up animate-delay-200">
                    CI/CD, testing, deployment, notifications — you name it. Automate your workflow with code.
                </p>

                <div className="bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto font-mono text-left animate-pulse-slow">
                    <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-400 ml-4">deploy.yml</span>
                    </div>
                    <pre className="text-green-400 text-sm sm:text-base">
                        <code>
                            name: Deploy<br />
                            on: [push]<br />
                            jobs:<br />
                            &nbsp; deploy:<br />
                            &nbsp; &nbsp; runs-on: ubuntu-latest<br />
                            &nbsp; &nbsp; steps:<br />
                            &nbsp; &nbsp; - uses: actions/checkout@v4<br />
                            &nbsp; &nbsp; - run: {text}<span className="animate-pulse">|</span>
                        </code>
                    </pre>
                </div>
            </div>
        </section>
    );
}