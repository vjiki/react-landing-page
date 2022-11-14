/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unused-imports/no-unused-vars */
import React, { useContext, useEffect, useState, useRef } from 'react';

// import Button from '@mui/material/Button';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

import axios from '../../../axios';
import config from '../../../config/config';
import logging from '../../../config/logging';
import UserContext from '../../../contexts/user';
import ErrorText from '../ErrorText';
import Header from '../Header';
import SuccessText from '../SuccessText';
// import { useSelector } from 'react-redux';
// import 'easymde/dist/easymde.min.css';
// import { useAppSelector } from '../../../redux/hooks';
// import { selectIsAuth } from '../../../redux/slices/auth';
import styles from './AddPost.module.scss';
import '../../../styles/bootstrap.min.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const AddPost = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  // const isAuth = useAppSelector(selectIsAuth);
  // const [isLoading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef<any>(null);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [postId, setPostId] = useState<string>('');

  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { user } = useContext(UserContext).userState;

  // const isEditing = Boolean(id);

  useEffect(() => {
    // let blogID = props.match.params.blogID;

    if (id) {
      setPostId(id);
      getBlog(id);
    }

    // eslint-disable-next-line
    }, []);

  const getBlog = async (newId: string) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/blogs/read/${newId}`,
      });

      console.log(postId);
      console.log(response.data);
      if (response.status === (200 || 304)) {
        if (user._id !== response.data.blog.author._id) {
          logging.warn(`This blog is owned by someone else.`);
          setPostId('');
        } else {
          setTitle(response.data.blog.title);
          setContent(response.data.blog.content);
          setTags(response.data.blog.tags.join(','));
          setImageUrl(response.data.blog.imageUrl || '');

          /** Convert html string to draft JS */
          const contentBlock = htmlToDraft(response.data.blog.content);
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const newEditorState = EditorState.createWithContent(contentState);

          setEditorState(newEditorState);
        }
      } else {
        setError(`Unable to retrieve blog ${postId}`);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createBlog = async () => {
    if (title === '' || content === '' || tags === '') {
      setError('Please fill out all fields.');
      setSuccess('');
      return null;
    }

    //      setLoading(true);

    setError('');
    setSuccess('');
    setSaving(true);

    const fields = {
      title,
      imageUrl,
      tags: tags.split(','),
      content,
      author: user._id,
    };

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.server.url}/blogs/create`,
        data: fields,
      });

      if (response.status === 201) {
        setPostId(response.data.blog._id);
        setSuccess('Blog posted.  You can continue to edit on this page.');
      } else {
        setError(`Unable to save blog.`);
      }
      // navigate(`/blog/posts/${_id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const editBlog = async () => {
    if (title === '' || content === '' || tags === '') {
      setError('Please fill out all fields.');
      setSuccess('');
      return null;
    }

    setError('');
    setSuccess('');
    setSaving(true);

    const fields = {
      title,
      imageUrl,
      tags: tags.split(','),
      content,
    };

    try {
      const response = await axios({
        method: 'PATCH',
        url: `${config.server.url}/blogs/update/${id}`,
        data: fields,
      });

      if (response.status === 201) {
        setSuccess('Blog updated.');
      } else {
        setError(`Unable to save blog.`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      // needs to add authorization to this request
      if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.post(
          '/upload',
          formData
          // , {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
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

  // if (typeof window !== 'undefined') {
  //   if (!window.localStorage.getItem('token') && !isAuth) {
  //     return <Navigate to="/blog" />;
  //   }
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="usebootstrap">
        <Container fluid className="p-0">
          <Header
            // image="https://startbootstrap.github.io/startbootstrap-clean-blog/img/home-bg.jpg"
            image="https://img.freepik.com/premium-photo/nordic-blue-simple-indoor-home-background_149197-9.jpg"
            headline=""
            title={postId !== '' ? 'Edit Your Blog' : 'Create a Blog'}
          />
          <Container className="mt-5 mb-5">
            <ErrorText error={error} />
            <Form>
              <FormGroup>
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
                      // className={styles.image}
                      // src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                      src={`http://localhost:3000${imageUrl}`}
                      alt="Uploaded"
                    />
                  </>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={title}
                  id="title"
                  placeholder="Enter a title"
                  disabled={saving}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image URL</Label>
                <Input
                  type="text"
                  name="image"
                  value={imageUrl}
                  id="image"
                  placeholder="Image URL"
                  disabled={saving}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="tags">Tags</Label>
                <Input
                  type="text"
                  name="tags"
                  value={tags}
                  id="tags"
                  placeholder="Enter a tags"
                  disabled={saving}
                  onChange={(event) => {
                    setTags(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Text</Label>
                <Editor
                  className={styles}
                  editorState={editorState}
                  wrapperClassName="card"
                  editorClassName="card-body"
                  onEditorStateChange={(newState: any) => {
                    setEditorState(newState);
                    setContent(
                      draftToHtml(convertToRaw(newState.getCurrentContent()))
                    );
                  }}
                  toolbar={{
                    options: [
                      'inline',
                      'blockType',
                      'fontSize',
                      'list',
                      'textAlign',
                      'history',
                      'embedded',
                      'emoji',
                      'image',
                    ],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                />
              </FormGroup>
              <FormGroup>
                <SuccessText success={success} />
              </FormGroup>
              <FormGroup>
                <Button
                  block
                  onClick={() => {
                    if (postId !== '') {
                      editBlog();
                    } else {
                      createBlog();
                    }
                  }}
                  disabled={saving}
                >
                  <i className="fas fa-save mr-1"></i>
                  {postId !== '' ? 'Update' : 'Post'}
                </Button>
                {postId !== '' && (
                  <Button
                    block
                    color="success"
                    tag={Link}
                    to={`/blog/posts/${postId}`}
                  >
                    Go to your blog post!
                  </Button>
                )}
                <Button block color="failed" tag={Link} to={`/blog`}>
                  Cancel
                </Button>
              </FormGroup>
              <FormGroup>
                <Label>Preview</Label>
                <div className="border ql-container p-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  />
                </div>
              </FormGroup>
            </Form>
            <ErrorText error={error} />
          </Container>
        </Container>
      </div>
    </div>
  );
};
