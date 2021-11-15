import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@material-ui/core";
import { DownloadForOfflineOutlined, PrintOutlined } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function GridMenu({ visible, setVisible, selected }) {
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, closeMenu);

    function closeMenu() {
        if (visible)
            setVisible(false);
    }

    function print() {
        window.print()
    }

    function downloadJSON() {
        (async () => {
            const fileName = "employees";
            const json = JSON.stringify(selected);
            const blob = new Blob([json], { type: 'application/json' });
            const href = await URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = fileName + ".json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })();
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
                    <MenuItem disabled={(!selected || (selected.length <= 0))} onClick={_ => downloadJSON()}>
                        <ListItemIcon>
                            <DownloadForOfflineOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Download Selected as JSON</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={_ => print()}>
                        <ListItemIcon>
                            <PrintOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Print page</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </>
    )
}