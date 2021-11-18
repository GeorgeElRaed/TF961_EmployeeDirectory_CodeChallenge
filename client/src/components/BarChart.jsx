import { Animation, BarSeries, EventTracker } from '@devexpress/dx-react-chart';
import { ArgumentAxis, Chart, Title, Tooltip, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';

export default function BarChart({ data }) {

    const ageMap = Object.keys(data)
        .map(key => data[key])
        .reduce((acc, cur) => {
            if (acc[cur.location.country])
                acc[cur.location.country] += 1;
            else acc[cur.location.country] = 1;
            return acc;
        }, {});

    const employeeLocationData = Object.keys(ageMap).reduce((acc, curr) => {
        acc.push({ area: curr, count: ageMap[curr] });
        return acc;
    }, []);

    return (
        <Paper>
            <Chart
                data={employeeLocationData}
            >
                <BarSeries
                    argumentField='area'
                    valueField='count'
                />
                <ArgumentAxis />
                <ValueAxis />
                <Title text="Employee Location Distribution" />
                <EventTracker />
                <Tooltip />
                <Animation />
            </Chart>
        </Paper>
    )
}
