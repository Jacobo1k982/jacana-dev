'use client';
import { useEffect, useState } from 'react';
import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section/HeroSectionContent";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export default function Home({ initialBlogs = [] }) {
  const [blogs, setBlogs] = useState(initialBlogs);

  useEffect(() => {
    // Solo hace fetch si no recibimos datos iniciales
    if (initialBlogs.length === 0) {
      async function fetchData() {
        try {
          const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);
          if (!res.ok) throw new Error('Failed to fetch data');
          const data = await res.json();
          const filtered = data
            .filter((item) => item?.cover_image)
            .sort(() => Math.random() - 0.5);
          setBlogs(filtered);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
      fetchData();
    }
  }, [initialBlogs]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </main>
  );
}