import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProblemDisplay from '@src/components/problemDisplay/problemDisplay';
import './Content.css'
import Main from '@src/components/main/main'
import Submit from '@src/components/submission/submit'
import {useState} from 'react'
import styled from '@emotion/styled'


function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index:number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="学习" {...a11yProps(0)} />
          <Tab label="竞赛" {...a11yProps(1)} />
          <Tab label="题库" {...a11yProps(2)} />
          <Tab label="讨论" {...a11yProps(3)} />
          <Tab label="提交记录" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Main></Main>
      </TabPanel>
      <TabPanel value={value} index={1}>
        竞赛
      </TabPanel>
      <TabPanel value={value} index={2}>
          <ProblemDisplay ></ProblemDisplay>
      </TabPanel>
      <TabPanel value={value} index={3}>
        题库
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Submit></Submit>
      </TabPanel>
    </Box>
  );
}

const StyledTabs = styled(Tabs)`
  display: flex;
  align-items: center;
  justify-content: center;
`