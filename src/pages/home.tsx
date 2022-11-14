import React from 'react';

import About from '../components/trainings/About';
import Analytics from '../components/trainings/Analytics';
import Canvas from '../components/trainings/Canvas';
import Header from '../components/trainings/Header';
import LazyShow from '../components/trainings/LazyShow';
import MainHero from '../components/trainings/MainHero';
import MainHeroImage from '../components/trainings/MainHeroImage';
import Objectives from '../components/trainings/Objectives';
import Partners from '../components/trainings/Partners';
import Product from '../components/trainings/Product';
import Schedule from '../components/trainings/Schedular';
import Trainings from '../components/trainings/Trainings';

const Home = () => {
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
      <LazyShow>
        <>
          <Product />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Schedule />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Objectives />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Trainings />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Canvas />
          <Partners />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Canvas />
          <About />
        </>
      </LazyShow>
      <Analytics />
    </div>
  );
};

export default Home;
