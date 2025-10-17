import { Box, AppBar, Toolbar, Button, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { ReactNode, useState } from "react"
import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";


export function GlobalMenu () {
    const { handleLogout } = useAuth()
    const [drawer, setDrawer] = useState({open: false})
    const toggleDrawer = () => setDrawer(old => ({open: !old.open}))
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit">Agritracker</Button>
                </Toolbar>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </AppBar>
            </Box>
            <div style={{margin: '8px'}}>
                <Outlet />
            </div>
        </div>
    )
}