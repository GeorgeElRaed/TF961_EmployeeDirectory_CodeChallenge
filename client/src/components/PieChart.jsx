import { Animation, EventTracker } from '@devexpress/dx-react-chart';
import { Chart, PieSeries, Title, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';

export default function PieChart({ data }) {

    const ageMap = Object.keys(data)
        .map(key => data[key])
        .reduce((acc, cur) => {
            if (acc[cur.dob.age])
                acc[cur.dob.age] += 1;
            else acc[cur.dob.age] = 1;
            return acc;
        }, {});

    const employeeAgeData = Object.keys(ageMap).reduce((acc, curr) => {
        acc.push({ age: curr, count: ageMap[curr] });
        return acc;
    }, []);

    return (
        <Paper>
            <Chart
                data={employeeAgeData}
            >
                <PieSeries
                    argumentField='count'
                    valueField='age'
                />
                <Title text="Employee Age Distribution" />
                <EventTracker />
                <Tooltip />
                <Animation />
            </Chart>
        </Paper>
    )
}
