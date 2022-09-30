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
        <Typography color="text.secondary" variant="body1">
          {props.items.body}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          作成日：{props.items.timestamp}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          リミット：{props.items.limit.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="success" size="small"sx={{ ml: 'auto'}}>完了</Button>
      </CardActions>
    </Card>
  );
};