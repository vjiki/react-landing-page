import React from 'react';

const Contacts = () => {
  return (
    <div id="contacts" className={`bg-background`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`}>
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`w-full my-2 text-5xl font-bold leading-tight text-center text-gray-900`}
          >
            Contact Us
          </h1>
          <dl className="space-y-10 md:space-y-0 mt-6">
            <div
              className={`flex flex-col sm:flex-row items-center justify-center`}
            >
              <dt>
                <img
                  className={`inline-block h-32 w-auto sm:h-32`}
                  src="/assets/images/team_working.jpg"
                  alt="Team Working"
                />
              </dt>
              <dd>
                <h2 className="ml-6 text-2xl text-base text-gray-800 font-bold font-semibold uppercase">
                  Vera Gorunova
                </h2>
                <h3 className="ml-6 text-xl text-base text-gray-800 font-bold font-semibold">
                  veragorunova@gmail.com
                </h3>
                <h3 className="ml-6 text-xl text-base text-gray-800 font-bold font-semibold">
                  +79992222999
                </h3>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
