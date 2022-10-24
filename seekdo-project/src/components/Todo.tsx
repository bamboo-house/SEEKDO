import React from 'react';
// 型
import { TodoType } from '../common/Types';
// mui
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

interface Props {
  items: TodoType;
}

export const Todo: React.FC<Props> = ({ items }) => {
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
          金額：{items.poolAmount}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {/* 期限：{items.poolAmount} */}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {/* 完了済み：{items.done} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="success" size="small" sx={{ ml: 'auto' }}>
          完了
        </Button>
      </CardActions>
    </Card>
  );
};
