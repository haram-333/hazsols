'use client';

import Header from './components/header';
import Hero from './components/hero';
import Marquee from './components/marquee';
import Expertise from './components/expertise';
import InsightsSection from './components/insights-section';
import CounterSection from './components/counter-section';
import Insights from './components/Insights';

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <Expertise />
      <InsightsSection />
      <CounterSection />
      <Insights />
    </>
  );
}
