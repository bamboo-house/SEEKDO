import React from 'react';
// 型
import { TodoType } from '../common/Types';
// mui
import { Card, CardMedia, CardActions, CardContent, Button, Typography, Chip, Box, Stack } from '@mui/material';
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

  const doneTodo = async (id: number) => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoFactoryContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const todoTxn = await todoFactoryContract.doneTodo(id);
        console.log('出金中...', todoTxn.hash);
        await todoTxn.wait();
        console.log('出金完了! --', todoTxn.hash)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardMedia
        sx={{paddingTop: "40.25%"}}
        image={
          "https://img.freepik.com/free-vector/beer-with-bubbles-foam-background_107791-2563.jpg?w=2000&t=st=1668497919~exp=1668498519~hmac=c939bcf6c73975fc1871ac467dc0c335177a3f1d87f69c1c21e4dcf1ed0ceca2"
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {items.title}
        </Typography>
        <Typography gutterBottom variant="body1">
          {items.body}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ marginTop: '20px'}}>
          <Chip 
            label={"ETH：" + items.amount}
            color="info"
            variant="outlined" 
          />
          <Chip 
            label={"期限：" + items.deadline.toLocaleDateString()}
            color="error"
            variant="outlined"
          />
        </Stack>
      </CardContent>
      <CardActions>
        {Boolean(items.isDone) && (
          <Box sx={{ display: 'inline-flex', marginLeft: 'auto', padding: '4px 5px' }}>
            <Chip label="完了済み" color="success" />
          </Box>
        )}
        {!Boolean(items.isDone) && (
          <Button onClick={() => {doneTodo(items.id)}} color="success" size="small" sx={{ ml: 'auto' }}>
            完了
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
