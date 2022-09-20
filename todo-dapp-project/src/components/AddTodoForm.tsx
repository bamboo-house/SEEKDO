import React, { useState } from 'react';
import { IconButton, Button,  Paper, Card, CardContent, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';


export const AddTodoForm = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ textAlign: 'center', color: 'primary'}}
        >
          <AddIcon color='primary'/>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ここはフォームです
          </Typography>
        </AccordionDetails>
      </Accordion>
    // <Card sx={{ mb: 5, textAlign: 'center' }}>
    //   <Button sx={{ width: '100%'}}>
    //     <AddIcon color='primary' fontSize='large'/>
    //   </Button>
    // </Card>
  );
};