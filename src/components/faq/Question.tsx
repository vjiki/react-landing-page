import React from 'react';

import styles from './QFAQ.module.scss';

type QuestionProps = {
  question?: string,
  answer?: string,
};

export const Question = ({ question, answer }: QuestionProps) => {
  const [isActive, setActive] = React.useState(false);
  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <div className={styles.questionwrapper}>
      <div className={styles.question}>
        <h3>{question}</h3>
        <button onClick={() => handleClick()}>
          <svg
            className={isActive ? styles.active : ''}
            viewBox="0 0 320 512"
            width="100"
            // title="angle-down"
          >
            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
          </svg>
        </button>
      </div>
      <div className={isActive ? styles.answeractive : styles.answer}>
        {answer}
      </div>
    </div>
  );
};
