import { Typography, CardMedia, Grid, Container, Button } from '@material-ui/core';
import { Card } from '@mui/material';
import { AppRegistration, CalendarToday, EmailOutlined, ExploreOutlined, Fingerprint, LocationOnOutlined, PermIdentity } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import Colors from '../utils/Colors'

export default function EmployeeDetails() {
    const { username } = useParams();

    const [user, setUser] = useState({});
    const [isError, setError] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_FETCH_EMPLOYEES}/${username}`)
            .then(({ data }) => setUser(data))
            .catch(err => setError(true));
    }, [username])

    return (
        <>
            <Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justifyContent='center'
                style={{ minHeight: '100%' }}
            >

                {isError ?
                    <span>User: {username} does not exist</span> : //TODO: Improve
                    <Card sx={{ minWidth: 600, minHeight: 600 }} style={{ // TODO: use stylable components
                        marginTop: '7rem',
                        padding: '2rem',
                        border: '2px solid lightgray',
                        overflow: 'visible'

                    }}>
                        <Grid
                            container
                            spacing={0}
                            direction='column'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <CardMedia
                                component='img'
                                style={{
                                    borderRadius: '50%',
                                    width: '150px',
                                    height: '150px',
                                    filter: 'drop-shadow(0px 0px 8px black)',
                                    marginBottom: '-5rem',
                                    overflow: 'visible',
                                    transform: 'translateY(-6.5rem)',
                                }}
                                image={user?.picture?.large}
                                alt={`${username}'s photo`}
                            />
                            <Typography gutterBottom variant='h5' component='div' style={{ fontWeight: 'bold' }}>
                                {user?.name?.title}. {user?.name?.first} {user?.name?.last}
                            </Typography>
                            <Typography style={{
                                fontSize: '1rem', display: 'flex',
                                alignItems: 'center', padding: '0.5rem'
                            }} >
                                <LocationOnOutlined /> <span style={{ marginLeft: '0.25rem', fontSize: '0.9rem' }}>{user?.location?.city}, {user?.location?.state}, {user?.location?.country}</span>
                            </Typography>
                            <Container style={{
                                marginTop: '1rem',
                                display: 'inline-flex',
                            }}>
                                <Container style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
                                    <StyledCard>
                                        <DetailsRow icon={<Fingerprint />}>UUID: {user?.login?.uuid}</DetailsRow>
                                        <DetailsRow icon={<PermIdentity />}>Username: {user?.login?.username}</DetailsRow>
                                    </StyledCard>
                                    <StyledCard>
                                        <DetailsRow icon={<CalendarToday />}>Date Of Birth: {moment(user?.dob?.date).format('Do MMMM YYYY')}</DetailsRow>
                                        <DetailsRow icon={<AppRegistration />}>Registered On: {moment(user?.registered?.date).format('Do MMMM YYYY')}</DetailsRow>
                                        <DetailsRow icon={<ExploreOutlined />}>Nationality: {user?.nat}</DetailsRow>
                                    </StyledCard>
                                </Container>
                                <Container style={{ padding: '0', display: 'flex' }}>
                                    <StyledCard>
                                        <DetailsRow icon={<EmailOutlined />}>Email: {user?.email}</DetailsRow>
                                        <DetailsRow icon={<PermIdentity />}>Home Phone: {user?.phone}</DetailsRow>
                                        <DetailsRow icon={<CalendarToday />}>Cellphone: {user?.cell}</DetailsRow>
                                        <DetailsRow icon={<AppRegistration />}>
                                            Full Address: {user?.location?.street?.number} {user?.location?.street?.name}, {user?.location?.city}, {user?.location?.state}, {user?.location?.country}
                                        </DetailsRow>
                                        <DetailsRow icon={<ExploreOutlined />}>Postcode: {user?.location?.postcode}</DetailsRow>
                                    </StyledCard>
                                </Container>
                            </Container>
                            <Container style={{
                                display: 'inline-flex',
                                justifyContent: 'space-evenly',
                                textAlign: 'center',
                                height: '100%',
                                marginTop: '2rem',
                                padding: '0'
                            }}>
                                <StyledButton username={username} variant="contained" color="primary" href={`mailto:${user?.email}`}>Email</StyledButton>
                                <StyledButton username={username} variant="contained" color="primary" href={`tel:${user?.cell}`}>Call</StyledButton>
                            </Container>
                        </Grid>

                    </Card>
                }
            </Grid >
        </>
    )
}

function generateLinearGradient(s) {
    const v = s.split('').map(e => e.charCodeAt(0)).reduce((acc, cur) => acc += cur, 0);
    const angle = (v % 12) * 30;
    const stops = v % 3 + 2;

    const colors = [...new Array(stops)]
        .map((_, i) => Colors[(v * (i + 1)) % Colors.length])
        .join(', ');

    const gradient = `linear-gradient(${angle}deg, ${colors})`
    return gradient;
}

function DetailsRow({ icon, children, ...props }) {
    return (
        <Typography {...props} style={{
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem'
        }} >
            {icon}
            <span style={{ marginLeft: '0.25rem', fontSize: '0.9rem' }}>
                {children}
            </span>
        </Typography>
    )
}

function StyledButton({ username, children, ...props }) {
    return (
        <Button {...props} style={{
            height: '3.5srem',
            width: '15rem',
            borderRadius: '3rem',
            border: 'none',
        }}>
            {children}
        </Button>
    );
}

function StyledCard({ children, ...props }) {
    return (
        <Card {...props} style={{ // TODO: use stylable components
            padding: '1rem',
            margin: '1rem',
            border: '2px solid lightgray',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
        }}>
            {children}
        </Card>
    );
}
