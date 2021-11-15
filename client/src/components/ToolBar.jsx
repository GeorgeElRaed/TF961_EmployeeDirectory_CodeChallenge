import { Button, Typography } from '@material-ui/core'
import HideAppBar from './HideAppBar'

export default function ToolBar() {
    return (
        <HideAppBar>
            <Button variant="contained" color="secondary" href="/" >
                <Typography>Home</Typography>
            </Button>
            <Button variant="contained" color="secondary" href="/employees" >
                <Typography>Employees</Typography>
            </Button>
        </HideAppBar>
    );
}
