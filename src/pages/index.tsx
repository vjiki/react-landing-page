import React from 'react';

import About from '../components/About';
import Analytics from '../components/Analytics';
import Canvas from '../components/Canvas';
import Header from '../components/Header';
import LazyShow from '../components/LazyShow';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';
import Objectives from '../components/Objectives';
import Partners from '../components/Partners';
import Product from '../components/Product';
import Schedule from '../components/Schedular';
import Trainings from '../components/Trainings';

const App = () => {
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

export default App;
