import { AppBar, Button, Dialog, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAPI } from "../hooks/useAPI";
import { FarmWorker } from "../utils/types";


type EditWorkerDialogProps = {
    open: boolean
    onClose: () => void,
    worker: FarmWorker | null
}


export function EditWorkerDialog ({ open, onClose, worker }: EditWorkerDialogProps) {
    const { editWorkerMutation } = useAPI()
    const emptyInputs = { firstname: '', lastname: '' }
    const [inputValues, setInputValues] = useState(worker === null ? emptyInputs : { firstname: worker.firstname, lastname: worker.lastname })

    const mutation = useMutation(editWorkerMutation())

    function resetFormAndClose () {
        setInputValues(emptyInputs)
        onClose()
    }

    function editWorker (worker: FarmWorker) {
        mutation.mutate(worker)
        resetFormAndClose()
    }

    useEffect(() => {
        setInputValues(worker === null ? emptyInputs : { firstname: worker.firstname, lastname: worker.lastname })
    }, [worker])

    if (worker === null){
        return (
            <Dialog fullScreen open={open} onClose={resetFormAndClose}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Edit Worker
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={resetFormAndClose}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Typography>Fehler</Typography>
            </Dialog>
        )
    }

    return (
        <Dialog fullScreen open={open} onClose={resetFormAndClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Edit Worker
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={resetFormAndClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TextField id="firstname" variant="outlined" label="Firstname" value={inputValues.firstname} onChange={(e) => setInputValues({...inputValues, firstname: e.target.value})} />
            <TextField id="lastname" variant="outlined"  label="Lastname" value={inputValues.lastname} onChange={(e) => setInputValues({...inputValues, lastname: e.target.value})} />
            <Button variant="contained" onClick={() => editWorker({id: worker.id, deleted: worker.deleted, ...inputValues})}>Save</Button>
        </Dialog>
    )
}