import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export default function DeleteConfirmation({ open, setOpen, handleCancel, handleOk }) {
    return (
        <Dialog open={open} onClose={_ => setOpen(false)}>
            <DialogTitle>Delete Users</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to delete some users. Do you wish to proceed?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}
