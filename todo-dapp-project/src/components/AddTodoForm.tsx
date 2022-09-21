import React, { useState } from 'react';
import { IconButton, Button,  Paper, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
  marginBottom: 20,
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#757de8',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    color: '#002984',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: 'rgba(0, 0, 0, .05)',
}));

export const AddTodoForm = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Todoを追加する</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    // <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
    //     <AccordionSummary
    //       expandIcon={<AddIcon />}
    //       aria-controls="panel1bh-content"
    //       id="panel1bh-header"
    //       sx={{ textAlign: 'center', color: 'primary'}}
    //     >
    //       <AddIcon color='primary'/>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         ここはフォームです
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    // <Card sx={{ mb: 5, textAlign: 'center' }}>
    //   <Button sx={{ width: '100%'}}>
    //     <AddIcon color='primary' fontSize='large'/>
    //   </Button>
    // </Card>
  );
};