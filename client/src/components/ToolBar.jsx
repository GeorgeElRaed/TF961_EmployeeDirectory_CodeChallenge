import { Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HideAppBar from './HideAppBar';

export default function ToolBar() {
    return (
        <HideAppBar style={{
            margin: '0',
            padding: '0',
            overflow: 'hidden',
            backgroundColor: 'rgb(40, 40, 40)',
        }}>
            <StyledLink to="/" value={'Home'} />
            <StyledLink to="/employees" value={'Employees'} />

        </HideAppBar >
    );
}

function StyledLink({ to, value, ...props }) {
    return (
        <Link to={to} {...props} style={{
            margin: '1rem',
            color: 'white',
            textDecoration: 'none',
        }} >
            <Typography>{value}</Typography>
        </Link>
    );
}