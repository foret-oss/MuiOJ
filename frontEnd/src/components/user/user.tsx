import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import './user.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


const Main: FunctionComponent<unknown> = () => {
    return (
        <div></div>
    );
};

const Side: FunctionComponent<unknown> = () => {
    return (
        <>
            <Card sx={{ minWidth: 275, marginBottom: "1rem", alignItems:"center" }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        be{bull}a{bull}good{bull}day
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" >题库</Button>
                </CardActions>
            </Card>
            <Card sx={{ minWidth: 275, marginBottom: "1rem" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <Card sx={{ minWidth: 275, marginBottom: "1rem" }}>
                <CardActions>
                    <Button size="large">首页</Button>
                </CardActions>
            </Card>
        </>
    );
};

const User: FunctionComponent<unknown> = () => {
    const problemList = [
    ]
    return (
        <div className="container">
            <div className="side">
                <Side></Side>
            </div>
            <div className="main"></div>
        </div>

    )
}





export default User
