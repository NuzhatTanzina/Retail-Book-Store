import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import Testimonials from "./components/home/Testimonials";
import dynamic from 'next/dynamic';

const _Layout = dynamic(() => import('./components/layout/_layout'))
const _Title = dynamic(() => import('./components/layout/_title'))

export default function Home() {
  return (
    <>
      <_Title title="Library" />
      <_Layout>
        <Hero />
        <Features />
      </_Layout>
    </>
  );
}