import React, { useEffect } from 'react';
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
      poolAmount: 0,
      deadline: new Date(),
      done: false,
    },
  });

  // フォームの送信時
  const onSubmit: SubmitHandler<TodoType> = async (formData) => {
    // console.log(formData.deadline.getTime());
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoFactoryContract = new ethers.Contract(contractAddress, contractABI, signer);

        // コントラクトにtodoを追加
        const todoTxn = await todoFactoryContract.createTodo(
          formData.title,
          formData.body,
          formData.poolAmount,
          // jsはミリ秒単位。UNIXタイムスタンプを生成するので秒単位にする
          Math.floor(formData.deadline.getTime() / 1000),
          { gasLimit: 300000 },
        );
        console.log('Mining...', todoTxn.hash);
        await todoTxn.wait();
        console.log('Mined -- ', todoTxn.hash);
        const todos = await todoFactoryContract.getAllTodos();
        console.log('getAllTodos:', todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 竹内：eth送信処理のサンプル（動くこと確認済み）
  const sample = async () => {
    console.log("カレントアカウント", currentAccount);
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const tx = {
          from: currentAccount,
          to: contractAddress,
          value: ethers.utils.parseEther("0.0001"),
          nonce: await provider.getTransactionCount(currentAccount, "latest"),
          gasPrice: ethers.utils.hexlify(await provider.getGasPrice()),
          gasLimit: ethers.utils.hexlify(100000), // 100 gwei
        };
        
        signer.sendTransaction(tx).then((transaction) => {
            console.log("transaction", transaction);
            alert("Send finished!");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // sample();
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* ControllerTextFieldみたいなコンポーネントが必要かも、他にはControllerDatePickerなど */}
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
        name="poolAmount"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextField
              {...field}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label="eth"
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
