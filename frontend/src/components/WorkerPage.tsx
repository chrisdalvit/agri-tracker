import { useMutation, useQuery } from "@tanstack/react-query"
import { useAPI } from "../hooks/useAPI"
import { Avatar, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { WorkerDialog } from "./WorkerDialog";
import { FarmWorker } from "../utils/types";

export function WorkerPage() {
    const { queryWorkers, deleteWorkerMutation } = useAPI()
    const workersQuery = useQuery(queryWorkers())
    const [dialog, setDialog] = useState({open: false})
    const [moreVertMenu, setMoreVertMenu] = useState<{anchor: null | HTMLElement}>({anchor: null})
    const deleteMutation = useMutation(deleteWorkerMutation())

    function handleDeleteWorker (worker: FarmWorker) {
        deleteMutation.mutate(worker)
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
                            secondaryAction={<>
                                    <IconButton onClick={(event) => setMoreVertMenu({...moreVertMenu, anchor: event.currentTarget})}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>{w.firstname[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={w.firstname + " " + w.lastname} />
                        </ListItem>
                        <Menu id="moreVertMenu" anchorEl={moreVertMenu.anchor} open={Boolean(moreVertMenu.anchor)} onClose={() => setMoreVertMenu({...moreVertMenu, anchor: null})}>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem onClick={() => handleDeleteWorker(w)}>Delete</MenuItem>
                        </Menu>
                    </>
                    )
                }
            </List>
            <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setDialog({...dialog, open: true})}>
                <AddIcon />
            </Fab>
            <WorkerDialog open={dialog.open} onClose={() => setDialog({...dialog, open: false})}/>
        </>
    )
}