import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import { useSelector } from 'react-redux';
// import { useNavigate, Navigate, useParams } from 'react-router-dom';

// import { useAppSelector } from '../../../redux/hooks';
// import 'easymde/dist/easymde.min.css';
// import { selectIsAuth } from '../../../redux/slices/auth';
import axios from '../../../axios';
import 'easymde/dist/easymde.min.css';
import { useAppSelector } from '../../../redux/hooks';
import { selectIsAuth } from '../../../redux/slices/auth';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const router = useRouter();
  // const { id } = useParams();
  // const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuth);
  // const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef<any>(null);

  const SimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
  });

  // const isEditing = Boolean(id);

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      // needs to add authorization to this request
      if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.post('/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImageUrl(data.url);
      }
    } catch (err) {
      console.warn(err);
      alert('failed to upload file');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      // setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags: tags.split(','),
        text,
      };

      await axios.post('/posts', fields);

      // const { data } = isEditing
      //   ? await axios.patch(`/posts/${id}`, fields)
      //   : await axios.post('/posts', fields);

      // const _id = isEditing ? id : data._id;

      // navigate(`/posts/${_id}`);
      router.push('/blog');
    } catch (err) {
      console.warn(err);
      alert('failed to create post');
    }
  };

  React.useEffect(() => {
    // if (id) {
    //   axios
    //     .get(`/posts/${id}`)
    //     .then(({ data }) => {
    //       setTitle(data.title);
    //       setText(data.text);
    //       setImageUrl(data.imageUrl);
    //       setTags(data.tags.join(','));
    //     })
    //     .catch((err) => {
    //       console.warn(err);
    //       alert('failed to get post for update');
    //     });
    // }
  }, []);

  const options = React.useMemo(() => {
    return {
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        uniqueId: 'editpost',
        delay: 1000,
      },
    };
  }, []);

  if (typeof window !== 'undefined') {
    if (!window.localStorage.getItem('token') && !isAuth) {
      router.push('/blog');
      // return <Navigate to="/" />;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Paper style={{ padding: 30 }}>
        <Button
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="large"
        >
          Upload preview
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Удалить
            </Button>
            <img
              className={styles.image}
              // src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              src={`http://localhost:4444${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          autoFocus
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          autoFocus
        />
        <>
          <SimpleMdeEditor
            // value={post.content}
            // onChange={value => setPost({ ...post, content: value })}
            className={styles.editor}
            value={text}
            onChange={onChange}
            options={options}
          />
        </>
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            Publish
            {/* {isEditing ? 'Save' : 'Publish'} */}
          </Button>
          <Link href="/blog">
            <Button size="large">Отмена</Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
};
