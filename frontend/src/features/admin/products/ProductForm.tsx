import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '@/UI/FileInput/FileInput';
import { ProductMutation } from '@/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCategories } from '@/features/categories/categoriesThunks';
import { selectCategories, selectCategoriesFetching } from '@/features/categories/categoriesSlice';
import { Editor } from '@tinymce/tinymce-react';

interface Props {
  onSubmit: (product: ProductMutation) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);

  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editorChangeHandler = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        {categoriesFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Category"
            id="category"
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
          >
            <MenuItem value="" disabled>
              Select category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      <Grid item>
        <TextField required label="Title" id="title" name="title" value={state.title} onChange={inputChangeHandler} />
      </Grid>
      <Grid item>
        <Editor
          licenseKey="gpl"
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'preview',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Roboto,Arial,sans-serif; font-size:14px }',
          }}
          value={state.description}
          onEditorChange={editorChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          type="number"
          label="Price"
          id="price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
