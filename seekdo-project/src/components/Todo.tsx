import React from 'react';
// 型
import { TodoType } from '../common/Types';
// mui
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
// コントラクト関連ライブラリ
import { ethers } from 'ethers';
import { LOCAL_CONSTANT } from '../common/LocalConstant';
import abi from '../utils/TodoFactory.json';

interface Props {
  items: TodoType;
}

export const Todo: React.FC<Props> = ({ items }) => {
  const contractAddress = LOCAL_CONSTANT.CONTRACT_ADDRESS;
  const contractABI = abi.abi;

  const doneTodo = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoFactoryContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        // withdrowテスト
        const todoTxn = await todoFactoryContract.withdrow(ethers.utils.parseEther("0.01"))
        console.log('出金中...', todoTxn.hash);
        await todoTxn.wait();
        console.log('出金完了! --', todoTxn.hash)
  
        const balance = await todoFactoryContract.getBalance();
        console.log('残高--', Number(ethers.utils.formatEther(balance)));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography gutterBottom component="div">
          {items.title}
        </Typography>
        <Typography color="text.secondary" variant="body1">
          {items.body}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          金額：{items.amount}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          期限：{items.deadline.toLocaleDateString()}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {/* 完了済み：{items.done} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => {doneTodo()}} color="success" size="small" sx={{ ml: 'auto' }}>
          完了
        </Button>
      </CardActions>
    </Card>
  );
};
