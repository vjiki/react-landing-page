import React from 'react';

import axios, { AxiosError } from 'axios';

import { IPreviewResponse } from '../model/preview/response';

function handleAxiosError(error: AxiosError<any, any>) {
  console.log(error);
}

function handleUnexpectedError(error: unknown) {
  console.log(error);
}

async function fetchPreview(url: string) {
  try {
    console.log(url);
    const { data } = await axios.post('https://api.linkpreview.net', {
      q: url,
      key: '528aebfd0d3f6a97d7ed9e404a8ffab2',
    });
    const response: IPreviewResponse = data;
    console.log(response.title);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      handleUnexpectedError(error);
    }
  }
}

type PreviewProps = {
  url?: string;
};
const Preview = ({ url = 'https://www.google.com/' }: PreviewProps) => {
  fetchPreview(url);

  return (
    <div className={`w-full mb-4`}>
      <div
        className={`h-1 mx-auto bg-primary ${url} opacity-25 my-0 py-0 rounded-t mb-10`}
      ></div>
    </div>
  );
};

export default Preview;
