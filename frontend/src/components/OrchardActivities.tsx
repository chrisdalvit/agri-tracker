import { AppBar, Avatar, Chip, Dialog, Fab, Grid, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import { useState } from "react";


export function OrchardActivities() {

    const [dialog, setDialog] = useState({open: false})

    const data = [
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
        { activity: "Ernte", date: "12.10.2025", workers: ["Christian", "Marco", "Willi", "Oskar", "Monica"]},
    ]

    return (
        <div>
            <Stack spacing={2}>
                {
                    data.map(i => (
                        <>
                            <Paper elevation={3} style={{height: 100}}>
                                <Grid container spacing={2} padding={1} height={100}>
                                    <Grid alignContent='center'>
                                        <Avatar sx={{ bgcolor: green[500] }}>
                                            <AgricultureIcon />
                                        </Avatar>
                                    </Grid>
                                    <Grid size="grow" alignContent="center">
                                        <Typography variant="caption">{i.date}</Typography>
                                        <Typography variant="h6">{i.activity}</Typography>                                        
                                    </Grid> 
                                    <Grid flex="end" alignContent="center">
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Grid>                               
                                </Grid>
                            </Paper>
                        </>
                    ))
                }
            </Stack>
            <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setDialog({...dialog, open: true})}>
                <AddIcon />
            </Fab>
            <Dialog fullScreen open={dialog.open} onClose={() => setDialog({...dialog, open: false})}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            New Activity
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={() => setDialog({...dialog, open: false})}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </div>
    )
}