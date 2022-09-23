import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Typography, Box, TextField } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const Accordion = styled((props: AccordionProps) => (<MuiAccordion disableGutters elevation={0} {...props} />))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
  marginBottom: 20,
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '1.5rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    color: `${theme.palette.primary.main}`,
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
}));

export const AddTodoForm = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <Box sx={{ display: "flex", justifyContent: 'center' }}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Todoを追加</Typography>
          </AccordionSummary>
        </Box>
        <AccordionDetails>
          <Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <TextField required label="Todo名" variant="outlined" size="small" margin="normal"/>
              <TextField multiline rows={4} label="詳細" variant="outlined" size="small" margin="normal"/>
            </Box>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <div
                <label>Title</label>
                <input id="title" {...register('title')}/>
              </div>
              <div>
                <label>Body</label>
                <input id="body" {...register('body')}/>
              </div>
              <button type="submit">保存</button>
            </form> */}
          </Typography>
        </AccordionDetails>
      </Accordion>
  );
};