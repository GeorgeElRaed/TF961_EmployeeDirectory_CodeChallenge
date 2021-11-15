import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GridFilter from "./GridFilter";

export default function EmployeesGrid() {

    const navigate = useNavigate();

    const createColumn = useCallback((field, header) => {
        return {
            field: field,
            headerName: header,
            sortable: false,
            flex: 1
        }
    }, []);

    const columns = [
        createColumn('id', 'ID'),
        createColumn('name', 'Name'),
        createColumn('dob', 'Date of birth'),
        createColumn('age', 'Age'),
        createColumn('nat', 'Nationality'),
    ];

    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loadiang, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowSize, setRowSize] = useState(undefined);
    const [selected, setSelected] = useState([]);
    const [isUpdateGrid, setUpdateGrid] = useState(false);

    function updateGrid() { setUpdateGrid(!isUpdateGrid) }

    useEffect(() => {
        let active = true;


        (async () => {
            setLoading(true);

            {
                const { data } = await axios.get(process.env.REACT_APP_API_FETCH_EMPLOYEES_COUNT);
                setRowCount(data.count)
            }
            const { data } = await axios.get(`${process.env.REACT_APP_API_FETCH_EMPLOYEES}?offset=${page * pageSize}&limit=${pageSize}`);
            const newRows = Object.keys(data).map(key => {
                const { name, login, dob, nat } = data[key];
                return {
                    id: login?.uuid,
                    name: `${name?.first} ${name?.last}`,
                    dob: moment(dob?.date).format('Do MMMM YYYY'),
                    age: dob?.age,
                    nat: nat,
                    username: login?.username
                }
            });

            if (!active) {
                return;
            }

            setData(Object.keys(data).map(key => data[key]))
            setRows(newRows);
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [page, pageSize, rowCount, isUpdateGrid]);


    return (
        <Paper style={{ height: '86.5vh', width: '100%' }}>
            <GridFilter selected={selected} setRowSize={setRowSize} updateGrid={updateGrid} />
            <DataGrid
                rows={rows}
                rowHeight={rowSize}
                columns={columns}
                rowsPerPageOptions={[pageSize]}
                paginationMode="server"
                loading={loadiang}
                rowCount={rowCount}
                autoPageSize
                checkboxSelection
                pagination
                onPageChange={(nv) => setPage(nv)}
                onPageSizeChange={(nv) => setPageSize(nv)}
                onRowDoubleClick={({ row }) => navigate(row.username)}
                onSelectionModelChange={e => setSelected(data.filter(v => e.includes(v.login.uuid)))}
            />
        </Paper>
    )
}
