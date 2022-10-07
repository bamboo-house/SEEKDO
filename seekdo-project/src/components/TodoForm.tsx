import React from 'react';
import { Box, TextField, Button } from '@mui/material';
// フォーム部分
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
// DatePicker部分
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';
// コントラクト関連のライブラリ
import { ethers } from "ethers";
import abi from "../utils/TodoFactory.json";


type TodoFormInputs = {
  title: string,
  body: string,
  amount: number,
}

export const TodoForm = () => {
    // コントラクトのデプロイ先のアドレス
    const contractAddress = "0x2729499Fa35Df456367e28B40437346259B4867B";
    // ABIの内容を参照する変数
    const contractABI = abi.abi;

  // フォームの設定
  // muiと連携させるためにcontrolを使い、制御コンポーネントにする
  const { control, handleSubmit } = useForm<TodoFormInputs>({
    defaultValues: {
        title: '',
        body: '',
        // 空の整数を設定しないと警告がでる
        amount: 0,
      }
    });

  // フォームの送信時
  const onSubmit: SubmitHandler<TodoFormInputs> = async (formData) => {
    try {
      // コントラクト呼び出し
      // createTodo()
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        );

        // コントラクトにtodoを追加
        const waveTxn = await todoPortalContract.createTodo({...formData}, {
          gasLimit: 300000,
        });
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column'}}>
      {/* ControllerTextFieldみたいなコンポーネントが必要かも、他にはControllerDatePickerなど */}
      <Controller name="title" control={control} render={({ field, fieldState }) => (
        <>
          <TextField required {...field} error={fieldState.invalid} helperText={fieldState.error?.message} label="Todo名" margin="normal" size="small" variant="outlined"/>
        </>
      )}/>
      <Controller name="body" control={control} render={({ field, fieldState }) => (
        <>
          <TextField multiline {...field} error={fieldState.invalid} helperText={fieldState.error?.message} label="詳細" margin="normal" rows={4} size="small" variant="outlined"/>
        </>
      )}/>
      <Controller name="amount" control={control} render={({ field, fieldState }) => (
        <>
          <TextField {...field} error={fieldState.invalid} helperText={fieldState.error?.message} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="金額" margin="normal" size="small" variant="outlined"/>
        </>
      )}/>
      <Button color="secondary" size="small" sx={{ mb: 1, mt: 2 }} type="submit" variant="contained">作成</Button>
    </Box>
  );
};