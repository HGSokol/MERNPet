import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { SimpleMdeReact, SimpleMDEReactProps } from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { dataType } from '../../@types/appTypes';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [text, setText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/posts/${id}`)
        .then((e) => {
          setTitle(e.data.title);
          setTags(e.data.tags.join(' '));
          setText(e.data.text);
          setImageUrl(e.data.imageUrl);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data: Partial<dataType> = {
        title,
        text,
      };

      if (tags)
        data.tags = tags
          .replace(/[;, ]/g, ' ')
          .split(' ')
          .filter((e) => e !== '');
      if (imageUrl && imageUrl.length > 0) data.imageUrl = imageUrl;

      console.log(data);

      const post = id
        ? await axios.patch(`/api/posts/${id}`, data)
        : await axios.post('/api/posts', data);

      const postId = id ? id : post.data._id;

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
      console.log('ошибка создания поста');
    }
  };

  const handleChangeFile = async (e: any) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);

    const { data } = await axios.post('/api/upload', formData);

    setImageUrl(data.url);
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
    inputRef.current!.value = '';
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const options: SimpleMDEReactProps = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <form onSubmit={handleSubmitForm}>
        <Button
          onClick={() => inputRef.current?.click()}
          variant="outlined"
          size="large"
        >
          Загрузить превью
        </Button>
        <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
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
              src={`http://localhost:3001${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          value={title}
          variant="standard"
          placeholder="Заголовок статьи..."
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          value={tags}
          classes={{ root: styles.tags }}
          variant="standard"
          onChange={(e) => setTags(e.target.value)}
          placeholder="Введите тэги через пробелы"
          fullWidth
        />
        <SimpleMdeReact
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button
            // disabled={!isValid || text === ''}
            type="submit"
            size="large"
            variant="contained"
          >
            {id ? 'Сохранить изменения' : 'Опубликовать'}
          </Button>
          <Link to="/">
            <Button size="large">Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
