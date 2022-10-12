import React from 'react';

import config from '../config/index.json';

const Partners = () => {
  const { partners } = config;
  const { title, sections } = partners;

  return (
    <div
      id="partners"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <h1
          className={`w-full my-2 text-5xl text-gray-600 font-bold leading-tight text-center text-primary`}
        >
          {title}
        </h1>
        <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4 h-12">
          {sections.map((section, index) => (
            <a
              key={`${section.name}-${index}`}
              href={section.href}
              className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
              {section.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
