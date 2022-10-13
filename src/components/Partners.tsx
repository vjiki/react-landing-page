import React from 'react';

import config from '../config/index.json';
import Preview from './Preview';

const Partners = () => {
  const { partners } = config;
  const { title, links } = partners;

  return (
    <div id="partners" className={`py-12 bg-background`}>
      <dl className="space-y-10 md:space-y-0 md:grid md:gap-x-8 md:gap-y-10">
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`w-full my-2 text-5xl text-gray-600 font-bold leading-tight text-center text-primary`}
          >
            {title}
          </h1>
          <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4">
            <dl className="space-y-10 md:space-y-0 md:grid md:gap-x-8 md:gap-y-10">
              {links.map((link) => (
                <div key={link.name} className="relative">
                  <dt>
                    <p className="mt-2 ml-16 text-base text-gray-500">
                      {link.name}
                    </p>
                    <Preview url={link.href} />
                    {/* <a
                  key={`${link.name}-${index}`}
                  href={link.href}
                  className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
                >
                  {link.name}
                </a> */}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default Partners;
