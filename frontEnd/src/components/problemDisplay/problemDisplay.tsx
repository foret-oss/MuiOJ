import './problemDisplay.css'
import * as React from 'react'
import Tab from '@mui/material/Tab';
import styled from "@emotion/styled";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


export default function ProblemDisplay() {

  const problemList = [
    { id: '1', title: 'aa' },
    { id: '2', title: 'bb' },
    { id: '3', title: 'cc' },
    { id: '4', title: 'dd' },
    { id: '4', title: 'dd' },
    { id: '4', title: 'dd' }
  ]

  return (
    <div className='problemContainer'>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          //maps循环
          problemList.map(item => {
            return (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.id} />
            </ListItem>
            )
          })
        }
        </List>
    </div>
  );
}


// const MyTab = styled(Tab)`
//   margin-top: 0rem;
//   font-size: 1rem;
//   font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
// `;

// const MyTabPanel = styled(TabPanel)`
//    width: 80%;
//    margin-top: -25rem;
//    z-index : 0;
// `;
