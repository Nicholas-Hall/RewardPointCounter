import React, { useEffect, useState } from 'react';
import { getDataSet, calculateSpent, filterPurchasesByMonth, calculatePoints} from '../../sharedFunctions/dataFunctions/dataSetFunctions';
import {Paper, Typography, Select, MenuItem, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: '#FF7700',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh'
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: 500,
        backgroundColor: theme.palette.warning.light
    },
    grid: {
        height: '70%',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    greenText: {
        color: theme.palette.secondary.dark
    },
    dropdownContainer: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4)
    },
    dropdown: {
        '& .MuiSelect-select': {
            backgroundColor: theme.palette.warning.light,
            borderRadius: theme.spacing(.25),
            paddingLeft: theme.spacing(1)
        }
    },
    list: {
        backgroundColor: theme.palette.warning.light
    }
  }));

const Dashboard = (props) => {
    const classes = useStyles(props);
    const [purchases, setPurchases] = useState(getDataSet());
    const [selectedMonth, setSelectedMonth] = useState("0");
    const [totalSpent, setTotalSpent] = useState(undefined);
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        if (selectedMonth === "0") {
            setPurchases(getDataSet());
        }   else {
            setPurchases(filterPurchasesByMonth(getDataSet(), selectedMonth))
        }
    }, [selectedMonth]);

    useEffect(() => {
        setTotalSpent(calculateSpent(purchases));
        setTotalPoints(calculatePoints(purchases));
    }, [purchases]);

    return (
        <div className={classes.background}>
                <div className={classes.dropdownContainer}>
                    <Select id="monthSelect" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className={classes.dropdown} MenuProps={{ classes: { list: classes.list } }}>
                        <MenuItem value="0">All Months</MenuItem>
                        <MenuItem value="1">Januraury</MenuItem>
                        <MenuItem value="2">Feburaury</MenuItem> 
                        <MenuItem value="3">March</MenuItem>
                        <MenuItem value="4">April</MenuItem>
                        <MenuItem value="5">May</MenuItem>
                    </Select>
                </div>
                <Grid container spacing={10} justify="center" alignItems="center" className={classes.grid}>
                    <Grid item>
                        <Paper className={classes.paper} elevation={10}>
                            <Typography variant="h2" component="h2" color="textPrimary">
                                Amount Spent:
                            </Typography>
                            <div className={classes.center}>
                                <Typography variant="h1" component="p" className={classes.greenText}>
                                    ${totalSpent}
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.paper} elevation={10}>
                            <Typography variant="h2" component="h2">
                                Points:
                            </Typography>
                            <div className={classes.center}>
                                <Typography variant="h1" component="p" className={classes.greenText}>
                                    {totalPoints}
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
    );
};

export default Dashboard;