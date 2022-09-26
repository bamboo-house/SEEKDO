import React from 'react';
import { Box, TextField, Button } from '@mui/material';
// フォーム部分
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
// DatePicker部分
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';

type TodoFormInputs = {
  title: string,
  body: string,
}

export const TodoForm = () => {
  // フォームの設定
  // muiと連携させるためにcontrolを使い、制御コンポーネントにする
  const { control, handleSubmit } = useForm<TodoFormInputs>();

  // フォームの送信時
  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    console.log(data);
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column'}}>
      <TextField required label="Todo名" margin="normal" size="small" variant="outlined"/>
      <TextField multiline label="詳細" margin="normal" rows={4} size="small" variant="outlined"/>
      <Button color="secondary" size="small" sx={{ mb: 1, mt: 2 }} type="submit" variant="contained">作成</Button>
    </Box>
  );
};