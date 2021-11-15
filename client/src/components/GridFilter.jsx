import { Button, Container, Divider, IconButton, Typography } from "@material-ui/core";
import { DeleteForeverRounded, FilterList, HeightRounded, MoreHoriz, PlusOneRounded, TableRowsRounded, UpdateRounded } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import GridHeightMenu from "./GridHeightMenu";
import GridMenu from "./GridMenu";
import ToolbarStyle from "./ToolbarStyle";

export default function GridFilter({ selected, setRowSize, updateGrid }) {

    const [visible, setVisible] = useState(false);
    const [heightMenuVisible, setHeightMenuVisible] = useState(false);


    function addEmployee() {

    }

    function deleteSelected() {
        updateGrid();
    }

    function updateEmployee() {
    }


    return (
        <>
            <Container style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '6vh',
                padding: '0',
                margin: '0'
            }}>

                <ToolbarStyle>

                    <Typography variant='body1'> <TableRowsRounded color='primary' /> <span style={{ marginLeft: '0.25rem' }}>Employee Directory</span></Typography>

                    <IconButton size='small' aria-label="moreOptions" onClick={_ => setVisible(true)}>
                        <MoreHoriz />
                        <GridMenu visible={visible} setVisible={setVisible} selected={selected} />
                    </IconButton>

                    <Divider orientation={'vertical'} flexItem></Divider>

                    <Button>
                        <FilterList /> <span style={{ marginLeft: '0.25rem' }}>Filter</span>
                    </Button>

                    <Button onClick={_ => setHeightMenuVisible(true)}>
                        <HeightRounded /> <span style={{ marginLeft: '0.25rem' }}>Row Height</span>
                        <GridHeightMenu visible={heightMenuVisible} setVisible={setHeightMenuVisible} setRowSize={setRowSize} />
                    </Button>

                    <Button onClick={addEmployee}>
                        <PlusOneRounded /> <span style={{ marginLeft: '0.25rem' }}>Add</span>
                    </Button>

                    <Button onClick={deleteSelected}>
                        <DeleteForeverRounded /> <span style={{ marginLeft: '0.25rem' }}>Delete</span>
                    </Button>

                    <Button onClick={updateEmployee}>
                        <UpdateRounded /> <span style={{ marginLeft: '0.25rem' }}>Update</span>
                    </Button>

                </ToolbarStyle>
            </Container>
        </>
    )
}
