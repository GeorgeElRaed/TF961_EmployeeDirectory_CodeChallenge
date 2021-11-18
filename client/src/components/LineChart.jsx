import { Animation } from '@devexpress/dx-react-chart';
import {
    ArgumentAxis, Chart, Legend, LineSeries, ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';

export default function LineChart({ data }) {


    const employeesCountChartData = Object.keys(data)
        .map(key => data[key])
        .sort((a, b) => new Date(a.registered.date) - new Date(b.registered.date))
        .reduce((acc, cur, index) => {
            acc.push({ value: index, argument: String(new Date(cur.registered.date).getFullYear()) })
            return acc;
        }, [])

    return (
        <Paper>
            <Chart
                data={employeesCountChartData}
            >
                <ArgumentAxis />
                <ValueAxis />

                <LineSeries
                    name="Employee Count Per Year"
                    valueField="value"
                    argumentField="argument"
                />
                <Legend />
                <Animation />
            </Chart>
        </Paper>
    )
}
