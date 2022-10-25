import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Typography, Box } from '@mui/material';
// 自作コンポーネント
import { TodoForm } from './TodoForm';
// Accordion部分
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

interface Props {
  currentAccount: string;
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    marginBottom: 20,
    '&:before': {
      display: 'none',
    },
  })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<AddIcon sx={{ fontSize: '1.5rem' }} />} {...props} />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    color: `${theme.palette.primary.main}`,
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({}));

export const TodoFormAccordion: React.FC<Props> = (props) => {
  // アコーディオンの開閉を記憶する
  const [expanded, setExpanded] = useState<string | false>(false);

  // アコーディオンの開閉
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Todoを追加</Typography>
        </AccordionSummary>
      </Box>
      <AccordionDetails>
        <TodoForm currentAccount={props.currentAccount}/>
      </AccordionDetails>
    </Accordion>
  );
};
