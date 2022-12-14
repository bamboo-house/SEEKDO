import React from 'react';
import { AccountContainer } from '../common/containers/AccountContainer';
// 型
import { TodoType } from '../common/Types';
// フォーム部分
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
// mui
import { Box, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// コントラクト関連のライブラリ
import { ethers } from 'ethers';
import { LOCAL_CONSTANT } from '../common/LocalConstant';
import abi from '../utils/TodoFactory.json';

export const TodoForm: React.FC = () => {
  const { currentAccount } = AccountContainer.useContainer();
  const contractAddress = LOCAL_CONSTANT.CONTRACT_ADDRESS;
  const contractABI = abi.abi;

  // フォームの設定
  // react-hooksとmuiを連携させるためにcontrolを使い、制御コンポーネントにする
  const { control, handleSubmit } = useForm<TodoType>({
    defaultValues: {
      title: '',
      body: '',
      // 空の整数を設定しないと警告がでる
      amount: 0,
      deadline: new Date(),
      isDone: false,
    },
  });

  // フォームの送信時
  const onSubmit: SubmitHandler<TodoType> = async (formData) => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoFactoryContract = new ethers.Contract(contractAddress, contractABI, signer);

        // 送金処理(先に送金できるか確認)
        let todoTxn = await todoFactoryContract.deposit({value: ethers.utils.parseEther(Number(formData.amount).toString())});
        console.log('送金中...', todoTxn.hash);
        await todoTxn.wait();
        console.log('送金完了! -- ', todoTxn.hash);

        // コントラクトにtodoを追加
        todoTxn = await todoFactoryContract.createTodo(
          formData.title,
          formData.body,
          ethers.utils.parseEther(Number(formData.amount).toString()),
          // jsはミリ秒単位である。UNIXタイムスタンプを生成するので秒単位にする
          Math.floor(formData.deadline.getTime() / 1000),
          // { gasLimit: 400000 },
        );
        console.log('Mining...', todoTxn.hash);
        await todoTxn.wait();
        console.log('Mined -- ', todoTxn.hash);

        const todos = await todoFactoryContract.getAllTodos();
        console.log('getAllTodos:', todos);
      }
    } catch (error) {
      alert("ウォレットの残高を確認してください");
      console.log(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextField
              required
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label="Todo名"
              margin="normal"
              size="small"
              variant="outlined"
            />
          </>
        )}
      />
      <Controller
        name="body"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextField
              multiline
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label="詳細"
              margin="normal"
              rows={4}
              size="small"
              variant="outlined"
            />
          </>
        )}
      />
      <Controller
        name="amount"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextField
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              inputProps={{ inputMode: 'numeric', type: 'number', step: '0.00001' }}
              label="ETH"
              margin="normal"
              size="small"
              variant="outlined"
            />
          </>
        )}
      />
      <Controller
        name="deadline"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns} dateFormats={{ monthAndYear: 'yyyy年MM月' }}>
              <DateTimePicker
                {...field}
                label="期限"
                inputFormat="yyyy年MM月dd日 hh時mm分"
                toolbarTitle=""
                toolbarFormat="yyyy年MM月"
                ampm={false}
                minDate={new Date(Date.now())}
                maxDate={new Date("2030-01-01")}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </LocalizationProvider>
          </>
        )}
      />
      <Button color="secondary" size="small" sx={{ mb: 1, mt: 2 }} type="submit" variant="contained">
        作成
      </Button>
    </Box>
  );
};
