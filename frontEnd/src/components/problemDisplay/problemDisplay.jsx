import './problemDisplay.css'
import React, { Component } from 'react'
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
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import GetProblem from '@apis/problem/problem'


export default class ProblemDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  problemUrl = "/question/item"

  problemList = [
    { id: '1', title: 'aa' },
    { id: '2', title: 'bb' },
    { id: '3', title: 'cc' },
    { id: '4', title: 'dd' },
    { id: '5', title: 'dd' },
    { id: '6', title: 'dd' }
  ]

  styles = { textDecoration: "none", color: "#71838f" }

  handleChange = (event, value) => {
    this.setState({ page: value })
    console.log("now Page:", this.state.page);
  };

  componentDidMount() {
    GetProblem(this.problemUrl + "/1")
    this.problemList = [
  { id: '7', title: 'aa' },
  { id: '8', title: 'bb' },
  { id: '9', title: 'cc' },
  { id: '10', title: 'dd' },
  { id: '11', title: 'dd' },
  { id: '12', title: 'dd' }
]
  }

render() {
  return (
    <div className='problemContainer'>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          //maps循环
          this.problemList.map(item => {
            return (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <Link to={'/edit'} style={this.styles}>
                  <ListItemText primary={item.title} secondary={item.id} />
                </Link>
              </ListItem>
            )
          })
        }
      </List>
      <Stack spacing={2}>
        <Typography>Page: {this.state.page}</Typography>
        <Pagination count={10} page={this.state.page} onChange={this.handleChange} />
      </Stack>
    </div>
  );

}


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
