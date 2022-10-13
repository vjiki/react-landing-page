import React, { useEffect } from 'react';

import axios, { AxiosError } from 'axios';

import config from '../config/index.json';
import { IPreviewResponse } from '../model/preview/response';

function handleAxiosError(error: AxiosError<any, any>) {
  console.log(error);
}

function handleUnexpectedError(error: unknown) {
  console.log(error);
}

// function wait(ms: number | undefined) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

async function fetchPreview(name: string, href: string) {
  // const response = await axios
  //   .post('https://api.linkpreview.net', {
  //     q: 'https://www.google.com',
  //     key: '123456',
  //   })
  //   .then((resp) => {
  //     console.log(resp.data);
  //   })
  //   .catch((err) => {
  //     // something went wrong
  //     console.log(err.response.status);
  //   });
  // console.log(response);
  // let user: User = null;
  // const { data } = await axios.get('/user?ID=12345');
  try {
    console.log(href);
    console.log(name);
    const { data } = await axios.post('https://api.linkpreview.net', {
      q: href,
      key: '528aebfd0d3f6a97d7ed9e404a8ffab2',
    });
    // user = data.userDetails;
    // console.log(data);
    const response: IPreviewResponse = data;
    console.log(response.title);

    // console.log(response.description);
    // console.log(response.image);
    // console.log(response.url);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      handleUnexpectedError(error);
    }
  }
}

const Partners = () => {
  const { partners } = config;
  const { title, links } = partners;
  // const [previewResponses, setPreviewResponses] = React.useState<IPreviewResponse[]>([]);

  // useEffect(() => {
  //   links.forEach((link: { name: string; href: string }) => {
  //     fetchPreview(link.name, link.href);
  //   }, []);
  // }, []);

  // useEffect(() => {
  //   const getData = setTimeout(() => {
  //     axios
  //     .get(`https://api.postalpincode.in/pincode/${pinCode}`)
  //     .then((response) => {
  //       console.log(response.data[0]);
  //     });
  //   }, 2000)

  //   return () => clearTimeout(getData)
  // }, [pinCode]);

  useEffect(() => {
    let i = 0;
    links.forEach((link: { name: string; href: string }) => {
      setTimeout(() => {
        fetchPreview(link.name, link.href);
      }, i * 2000);
      i += 1;
    }, []);
  }, []);

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
          {links.map((section, index) => (
            <a
              key={`${section.name}-${index}`}
              href={section.href}
              className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
              {section.name}
              {/* {fetchPreview(section.href)} */}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
