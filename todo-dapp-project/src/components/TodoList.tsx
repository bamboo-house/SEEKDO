import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { dummyData } from "./DummyData";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState(dummyData);

  useEffect(() => {
    console.log(dummyData);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          なんか
        </Typography>
        <Typography variant="body2" color="text.secondary">
          やらないといけないことです。やらないといけないことです。
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="success">Share</Button>
        <Button size="small" color="success">Learn More</Button>
      </CardActions>
  </Card>
      // {/* {todoItems.map((item) => (
      //   <ul>
      //     <li>{item.creator}</li>
      //     <li>{item.text}</li>
      //   </ul>
      // ))} */}
  );
};