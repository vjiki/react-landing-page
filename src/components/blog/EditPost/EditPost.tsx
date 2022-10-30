import { FC } from 'react';

// import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Editor } from 'react-draft-wysiwyg';

// const DraftEditor = dynamic(() => import('react-draft-wysiwyg'), {
//   ssr: false,
// });

// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//   { ssr: false }
// );

// const SimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
// });

export const EditPost: FC = () => {
  // const componentProps: any = {
  //   wrapperClassName: 'card',
  //   editorClassName: 'card-body',
  // };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <Editor {...componentProps} /> */}
    </div>
  );
};
