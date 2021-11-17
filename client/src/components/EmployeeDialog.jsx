import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import EmployeeForm from './EmployeeForm'

export default function EmployeeDialog({ open, setOpen, employee, updateGrid }) {

    const [validationFunction, setValidationFunction] = useState()
    const [newUserFunction, setNewUserFunction] = useState({})
    const [error, setError] = useState(false)

    function handleOk() {
        if (validationFunction.validate()) {
            saveUser(newUserFunction.getEmployee(), () => {
                setError(false);
                setOpen(false);
                updateGrid();
            },
                (err) => { console.error(err); setError(true); });
        }
        else
            setError(true);
    }

    function saveUser(user, handleOk, handleError) {
        axios.post(process.env.REACT_APP_API_FETCH_EMPLOYEES, { employee: user })
            .then(handleOk)
            .catch(handleError);
    }

    return (
        <Dialog open={open} onClose={_ => setOpen(false)} scroll='paper'>
            <DialogTitle>New User</DialogTitle>
            <DialogContent>
                <EmployeeForm employee={employee} error={error} setNewUserFunction={setNewUserFunction} setValidationFunction={setValidationFunction} />
            </DialogContent>
            <DialogActions>
                <Button onClick={_ => setOpen(false)}>Cancel</Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}
