import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
// フォーム部分
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
// DatePicker部分
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';

type TodoFormType = {
  title: string,
  body: string,
}

export const TodoForm = () => {
  // フォームの設定
  // muiと連携させるためにcontrolを使い、制御コンポーネントにする
  const { control, handleSubmit } = useForm<TodoFormType>();

  // フォームの送信時
  const onSubmit: SubmitHandler<TodoFormType> = (data) => {
    console.log(data);
  }

  return (
    <Box component="form"  sx={{ display: 'flex', flexDirection: 'column'}}>
      <TextField required label="Todo名" variant="outlined" size="small" margin="normal"/>
      <TextField multiline rows={4} label="詳細" variant="outlined" size="small" margin="normal"/>
      <Button color="secondary" variant="contained" size="small" sx={{ mb: 1, mt: 2 }}>作成</Button>
    </Box>
  );
};