import React from 'react';

import config from '../config/index.json';

const Trainings = () => {
  const { trainings } = config;
  const { items: itemsList } = trainings;
  return (
    <div className={`py-12 bg-background`} id="trainings">
      <dl className="space-y-10 md:space-y-0 md:grid md:gap-x-8 md:gap-y-10">
        {itemsList.map((item) => (
          <div key={item.title} className="relative">
            <dt>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                  className={`mt-2 text-2xl text-base text-primary font-semibold tracking-wide uppercase lg:text-center`}
                >
                  {item.title}
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-center">
                  {item.subtitle}
                </p>
                <p className="mt-4 text-xl text-gray-500">{item.description}</p>

                <div className="mt-10">
                  <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    {item.objectives.map((objective) => (
                      <div key={objective.description} className="relative">
                        <dt>
                          <div
                            className={`absolute flex items-center justify-center h-12 w-12 rounded-md bg-background text-tertiary border-primary border-4`}
                          >
                            <img
                              className={`inline-block h-6 w-6 rounded-full`}
                              src={objective.icon}
                              alt={objective.description}
                            />
                          </div>
                          <p className="mt-2 ml-16 text-base text-gray-500">
                            {objective.description}
                          </p>
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Trainings;
