import { AppBar, Button, Dialog, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAPI } from "../hooks/useAPI";
import { NewFarmWorker } from "../utils/types";


type WorkerDialogProps = {
    open: boolean
    onClose: () => void
}


export function WorkerDialog ({ open, onClose }: WorkerDialogProps) {
    const { addWorkerMutation } = useAPI()
    const [worker, setWorker] = useState({ firstname: '', lastname: '' })

    const mutation = useMutation(addWorkerMutation())

    function resetFormAndClose () {
        setWorker({ firstname: '', lastname: '' })
        onClose()
    }

    function postNewWorker (worker: NewFarmWorker) {
        mutation.mutate(worker)
        resetFormAndClose()
    }

    return (
        <Dialog fullScreen open={open} onClose={resetFormAndClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        New Worker
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={resetFormAndClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TextField id="firstname" variant="outlined" label="Firstname" value={worker.firstname} onChange={(e) => setWorker({...worker, firstname: e.target.value})} />
            <TextField id="lastname" variant="outlined"  label="Lastname" value={worker.lastname} onChange={(e) => setWorker({...worker, lastname: e.target.value})} />
            <Button variant="contained" onClick={() => postNewWorker(worker)}>Save</Button>
        </Dialog>
    )
}