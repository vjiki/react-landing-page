import React from 'react';

import Faq from 'react-faq-component';

const data = {
  title: 'FAQ (How it works)',
  rows: [
    {
      title: 'What to bring',
      content: 'Lorem ipsum dolor sit amet, consectetur',
    },
    {
      title: 'Covid rules',
      content:
        'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.',
    },
    {
      title: 'Accomodation',
      content:
        'Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc',
    },
    {
      title: 'Transportation',
      content: 'v1.0.5',
    },
    {
      title: 'Participants',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, possimus, quia cupiditate tempore molestiae repellendus expedita illum doloribus distinctio cum magni adipisci eaque et. Molestias iusto nesciunt quos repellendus aperiam.',
    },
  ],
};

export const FAQ = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Faq
        data={data}
        styles={{
          bgColor: 'white',
          titleTextColor: '#555555',
          rowTitleColor: '#696969',
          rowContentColor: 'gray',
          rowTitleTextSize: 'large',
          rowContentTextSize: '16px',
          rowContentPaddingTop: '10px',
          rowContentPaddingBottom: '10px',
          rowContentPaddingLeft: '20px',
          rowContentPaddingRight: '20px',
          arrowColor: 'black',
        }}
      />
    </div>
  );
};
