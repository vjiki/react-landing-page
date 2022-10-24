import React from 'react';

import config from '../config/index.json';

const Objectives = () => {
  const { objectives } = config;
  const { title, items } = objectives;

  return (
    <div id="objectives" className={`py-12 bg-background`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl m-8`}>
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`w-full my-2 text-5xl font-bold leading-tight text-center text-gray-900`}
          >
            {title}
          </h1>
          <div className={`w-full mb-4`}>
            <div
              className={`h-1 mx-auto bg-primary w-64 opacity-25 my-0 py-0 rounded-t`}
            ></div>
          </div>
          <ul className={`w-full lg:text-left text-sm`}>
            {items.map((item) => (
              <li
                className={`border-b py-4`}
                key={`${objectives.title}-${item}`}
              >
                <div className={`flex flex-row`}>
                  <img
                    src="/assets/images/check.png"
                    alt="Check Image"
                    className="float:left h-6 w-auto sm:h-6"
                  />
                  <p className="float:left ml-4 text-base text-gray-500">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
