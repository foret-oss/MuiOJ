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
import GetProblem from '@apis/common/authRequest'


export default class ProblemDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      problemList : [],
      problemUrl : "/question/list/"
    }
  }

  styles = {textDecoration: "none", color: "#71838f" }

  handleChange = (event, value) => {
    const res = GetProblem(this.state.problemUrl+ this.state.page, {})
    res.then(res => {
      this.setState({ problemList: res.message, page: value})
      console.log("this.problemList", this.state.problemList)
    })
  };

  componentDidMount() {
    const res = GetProblem(this. state.problemUrl + this.state.page,{})
    res.then(res => {
      this.setState({ problemList: res.message})
      console.log("this.problemList", this.state.problemList)
    })
  }
     
  render() {
    return (
      <div className='problemContainer'>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            //maps循环
            this.state.problemList.map(item => {
              return (
                <ListItem key={item.tid}>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Link to={'/edit/' + item.tid} style={this.styles}>
                    <ListItemText primary={item.title} secondary={"提交次数："+ item.accept} />
                  </Link>
                </ListItem>
              )
            })
          }
        </List>
        <Stack spacing={2}>
          {/* <Typography>Page: {this.state.page}</Typography> */}
          <Pagination count={10} page={this.state.page} onChange={this.handleChange} />
        </Stack>
      </div>
    );

  }


}

