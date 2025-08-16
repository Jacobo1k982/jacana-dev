// @flow strict
"use client";
import { useState, useEffect } from "react";
import HeroSectionContent from "../../homepage/hero-section/HeroSectionContent";

const HeroSection = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <HeroSectionContent />;
};

export default HeroSection;
