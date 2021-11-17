import { Button, Container, Divider, IconButton, Typography } from "@material-ui/core";
import { DeleteForeverRounded, FilterList, HeightRounded, MoreHoriz, PlusOneRounded, TableRowsRounded, UpdateRounded } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import EmployeeDialog from "./EmployeeDialog";
import DeleteConfirmation from "./DeleteConfirmation";
import GridHeightMenu from "./GridHeightMenu";
import GridMenu from "./GridMenu";
import ToolbarStyle from "./ToolbarStyle";

export default function GridToolbar({ selected, setRowSize, updateGrid }) {

    const [visible, setVisible] = useState(false);
    const [heightMenuVisible, setHeightMenuVisible] = useState(false);

    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    function addEmployee() {
        setAddOpen(true);
    }

    function confirmDelete() {
        setDeleteOpen(true)
    }

    function deleteSelected() {
        axios.delete(process.env.REACT_APP_API_FETCH_EMPLOYEES, { data: { usernames: selected.map(({ login }) => login?.username) } })
            .then(_ => { updateGrid(); setDeleteOpen(false); })
            .catch(err => console.error(err));

    }

    function updateEmployee() {
        setUpdateOpen(true);
    }


    return (
        <>
            <EmployeeDialog open={addOpen} setOpen={setAddOpen} updateGrid={updateGrid} />
            <EmployeeDialog open={updateOpen} setOpen={setUpdateOpen} updateGrid={updateGrid} employee={selected[0]} />
            <DeleteConfirmation open={deleteOpen} setOpen={setDeleteOpen} handleCancel={_ => setDeleteOpen(false)} handleOk={deleteSelected} />
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

                    <Button disabled={(!selected || (selected.length <= 0))} onClick={confirmDelete}>
                        <DeleteForeverRounded /> <span style={{ marginLeft: '0.25rem' }}>Delete</span>
                    </Button>

                    <Button disabled={(!selected || (selected.length !== 1))} onClick={updateEmployee}>
                        <UpdateRounded /> <span style={{ marginLeft: '0.25rem' }}>Update</span>
                    </Button>

                </ToolbarStyle>
            </Container>
        </>
    )
}
