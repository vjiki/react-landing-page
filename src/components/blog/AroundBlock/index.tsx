import React from 'react';

import About from '../../trainings/About';
import Canvas from '../../trainings/Canvas';
import Header from '../../trainings/Header';
import LazyShow from '../../trainings/LazyShow';

export interface IAroundBlockProps {
  children?: any;
}

const AroundBlock: React.FunctionComponent<IAroundBlockProps> = (props) => {
  const { children } = props;

  return (
    <div className={`bg-background grid gap-y-4 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-2 bg-background sm:pb-4 md:pb-4 lg:max-w-2xl lg:w-full lg:pb-8 xl:pb-12`}
          >
            <Header />
          </div>
        </div>
      </div>
      <LazyShow>
        <>
          {children}
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <About />
        </>
      </LazyShow>
    </div>
  );
};

export default AroundBlock;
