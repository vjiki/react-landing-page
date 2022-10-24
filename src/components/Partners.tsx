import React from 'react';

import config from '../config/index.json';

const Partners = () => {
  const { partners } = config;
  const { title, links } = partners;

  return (
    <div id="partners" className={`py-12 bg-background`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl m-8`}>
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`w-full my-2 text-5xl font-bold leading-tight text-center text-gray-900`}
          >
            {title}
          </h1>
          <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {links.map((link, index) => (
                <div key={link.name} className="relative">
                  <dt>
                    <div className={`flex flex-wrap`}>
                      <div className={`w-full sm:w-1/4 p-6`}>
                        <a
                          key={`${link.name}-${index}`}
                          href={link?.href}
                          className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="sr-only">{link?.name}</span>
                          <img
                            className="h-6/6"
                            src={link?.image}
                            alt={link?.name}
                          />
                        </a>
                      </div>
                      <div className={`w-5/6 sm:w-3/4`}>
                        <h3
                          className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
                        >
                          {link?.name}
                        </h3>
                        <p className={`text-gray-600 mb-3`}>
                          {link?.description}
                        </p>
                        <a
                          key={`${link?.name}-${index}`}
                          href={link?.href}
                          className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
                        >
                          {link?.href}
                        </a>
                      </div>
                    </div>
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
