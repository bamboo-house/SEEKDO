import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

export type todoProps = {
  creator: any,
  timestamp: number,
  body: string,
  limit: Date
}

type Props = {
  items: todoProps
}

export const Todo = (props: Props) => {
  console.log(props);
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography gutterBottom component="div">
          {props.items.creator}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.items.body}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          作成日：{props.items.timestamp}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          リミット：{props.items.limit.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="success" sx={{ ml: 'auto'}}>完了</Button>
      </CardActions>
    </Card>
  );
};