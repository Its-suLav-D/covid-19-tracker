import React from 'react';
import "./InfoBox.css";
import {Card, CardContent, Typography} from '@material-ui/core';

function InfoBox(props) {
    return (
        // If Active than add the class InfoBox--Selected. 
        <Card className={`InfoBox ${props.active && "InfoBox--selected"} ${props.isRed && "InfoBox--red"}`} onClick={props.onClick} >
            <CardContent>
                <Typography className="InfoBox_title" color="textSecondary">
                    {props.title} 
                </Typography>
                <h2 className={`InfoBox_cases ${props.isGreen && "InfoBox_cases--green"}`}>{props.cases} </h2>
                <Typography className="InfoBox_total">{props.total} Total </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
