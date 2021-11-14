import {
    AppBar, CssBaseline, Slide, Toolbar, useScrollTrigger
} from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function HideAppBar({ children, ...props }) {
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar position="sticky">
                    <Toolbar>
                        {children}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}
