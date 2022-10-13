import React, { useEffect } from 'react';

import axios, { AxiosError } from 'axios';

import { IPreviewResponse } from '../model/preview/response';

function handleAxiosError(error: AxiosError<any, any>) {
  console.log(error);
}

function handleUnexpectedError(error: unknown) {
  console.log(error);
}

type PreviewProps = {
  url?: string;
};

const Preview = ({ url = 'https://www.google.com/' }: PreviewProps) => {
  const [previewResponse, setPreviewResponse] =
    React.useState<IPreviewResponse>();

  async function fetchPreview() {
    try {
      console.log(url);
      const { data } = await axios.post('https://api.linkpreview.net', {
        q: url,
        key: '528aebfd0d3f6a97d7ed9e404a8ffab2',
      });
      const response: IPreviewResponse = data;
      setPreviewResponse(response);
      console.log(response.title);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        handleUnexpectedError(error);
      }
    }
  }

  useEffect(() => {
    fetchPreview();
  });

  return (
    <div key={url} className="relative">
      <dt>
        <img
          className="h-32 w-full object-cover sm:h-72 md:h-96 lg:w-1/2 lg:h-1/2"
          src={previewResponse?.image}
          alt="preview image"
        />
        <p className="mt-4 text-xl text-gray-500 has-text-weight-bold">
          {previewResponse?.title}
        </p>
        <p className="mt-4 text-xl text-gray-500">
          {previewResponse?.description}
        </p>
        <p className="mt-4 text-xl text-gray-500 is-size-7">
          {previewResponse?.url}
        </p>
      </dt>
    </div>
  );
};

export default Preview;
