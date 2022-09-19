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
    <Card sx={{ maxWidth: 345, mb: 3 }}>
      <CardContent>
        <Typography gutterBottom component="div">
          {props.items.creator}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.items.body}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.items.timestamp}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.items.limit.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="success">Share</Button>
        <Button size="small" color="success">Learn More</Button>
      </CardActions>
    </Card>
  );
};