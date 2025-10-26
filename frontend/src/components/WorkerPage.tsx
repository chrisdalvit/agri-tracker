import { useMutation, useQuery } from "@tanstack/react-query"
import { useAPI } from "../hooks/useAPI"
import { Avatar, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { AddWorkerDialog } from "./AddWorkerDialog";
import { FarmWorker } from "../utils/types";
import { EditWorkerDialog } from "./EditWorkerDialog";

export function WorkerPage() {
    const { queryWorkers, deleteWorkerMutation } = useAPI()
    const workersQuery = useQuery(queryWorkers())
    const [addDialog, setAddDialog] = useState({open: false})
    const [editDialog, setEditDialog] = useState<{open: boolean, worker: FarmWorker | null}>({open: false, worker: null})
    const [moreVertMenu, setMoreVertMenu] = useState<{anchor: null | HTMLElement, workerId: number | null}>({anchor: null, workerId: null})
    const deleteMutation = useMutation(deleteWorkerMutation())

    function handleDeleteWorker (worker: FarmWorker) {
        deleteMutation.mutate(worker)
        setMoreVertMenu({...moreVertMenu, anchor: null})
    }

    function handleEditWorker (worker: FarmWorker) {
        setEditDialog({ open: true, worker: worker })
        setMoreVertMenu({...moreVertMenu, anchor: null})
    }

    if (workersQuery.isLoading || workersQuery.data === undefined){
        return <div>Loading...</div>
    }

    return (
        <>
            <Typography>Workers</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    workersQuery.data.map(w =>
                    <>
                        <ListItem key={w.id}
                            secondaryAction={
                                <IconButton onClick={(event) => setMoreVertMenu({anchor: event.currentTarget, workerId: w.id})}>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>{w.firstname[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={w.firstname + " " + w.lastname} />
                            <Menu id={`moreVertMenu-${w.id}`} anchorEl={moreVertMenu.workerId === w.id ? moreVertMenu.anchor : null} open={Boolean(moreVertMenu.anchor) && moreVertMenu.workerId === w.id} onClose={() => setMoreVertMenu({anchor: null, workerId: null})}>
                                <MenuItem onClick={() => handleEditWorker(w)}>Edit</MenuItem>
                                <MenuItem onClick={() => handleDeleteWorker(w)}>Delete</MenuItem>
                            </Menu>
                        </ListItem>
                    </>
                    )
                }
            </List>
            <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setAddDialog({...addDialog, open: true})}>
                <AddIcon />
            </Fab>
            <AddWorkerDialog open={addDialog.open} onClose={() => setAddDialog({...addDialog, open: false})}/>
            <EditWorkerDialog open={editDialog.open} onClose={() => setEditDialog({ ...editDialog, open: false, worker: null })} worker={editDialog.worker}/>
        </>
    )
}