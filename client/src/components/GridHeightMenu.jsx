import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@material-ui/core";
import { LineWeight } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function GridHeightMenu({ visible, setVisible, setRowSize }) {
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, closeMenu);

    function closeMenu() {
        if (visible)
            setVisible(false);
    }

    return (
        <>
            <Paper
                ref={wrapperRef}
                sx={{
                    visibility: `${visible ? 'visible' : 'hidden'}`,
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    margin: '0',
                    display: 'block',
                    zIndex: '1'
                }}>
                <MenuList>
                    <MenuItem onClick={_ => setRowSize(30)}>
                        <ListItemIcon>
                            <LineWeight fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Short</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={_ => setRowSize(undefined)}>
                        <ListItemIcon>
                            <LineWeight fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText>Medium</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={_ => setRowSize(80)}>
                        <ListItemIcon>
                            <LineWeight fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>Large</ListItemText>
                    </MenuItem>

                </MenuList>
            </Paper>
        </>
    )
}
