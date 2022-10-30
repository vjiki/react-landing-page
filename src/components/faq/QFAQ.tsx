import React from 'react';

import styles from './QFAQ.module.scss';
import { Question } from './Question';
import { Searchbar } from './Searchbar';

const questions = [
  {
    id: 1,
    question: 'Popular Articles',
    answer:
      'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  },
  {
    id: 2,
    question: 'Fix problems & request removals',
    answer:
      'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  },
  {
    id: 3,
    question: 'Browse the web',
    answer:
      'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  },
  {
    id: 4,
    question: 'Search on your phone or tablet',
    answer:
      'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  },
];

export const QFAQ = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> },
  }) => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    const results = questions.filter((item: { question: string }) =>
      item.question.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>How can we help you?</h2>
      <Searchbar onSearchChange={handleSearchChange} />
      <section className={styles.faq}>
        {searchResults.map((item: any, index) => (
          <div key={index}>
            <Question question={item.question} answer={item.answer} />
          </div>
        ))}
      </section>
    </div>
  );
};

// ReactDOM.render(<FAQ data={questions}/>, document.querySelector('#root'));
