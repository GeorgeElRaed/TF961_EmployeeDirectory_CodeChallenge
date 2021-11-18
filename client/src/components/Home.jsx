import { Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

export default function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(process.env.REACT_APP_API_FETCH_EMPLOYEES);
            setData(data);
        })();

    }, []);

    return (
        <Grid container direction="row" >
            <Grid container direction="column" >
                <Grid item style={{ padding: '1rem' }}> <LineChart data={data} /></Grid>
                <Grid container direction="row" >
                    <Grid item style={{ flex: '1', padding: '1rem' }}> <PieChart data={data} /></Grid>
                    <Grid item style={{ flex: '3', padding: '1rem' }}> <BarChart data={data} /></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
