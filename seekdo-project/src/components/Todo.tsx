import React from 'react';
// 型
import { TodoType } from "../common/Types"
// mui
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

type Props = {
  items: TodoType
}

export const Todo: React.FC<Props> = ({items}) => {
  console.log();
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
      </CardContent>
      <CardActions>
        <Button color="success" size="small"sx={{ ml: 'auto'}}>完了</Button>
      </CardActions>
    </Card>
  );
};