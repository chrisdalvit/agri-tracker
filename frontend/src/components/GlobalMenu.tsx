import { Box, AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react"
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeWorkIcon from '@mui/icons-material/HomeWork';


export function GlobalMenu () {
    const { handleLogout } = useAuth()
    const navigate = useNavigate()
    const [drawer, setDrawer] = useState({open: false})
    const toggleDrawer = () => setDrawer(old => ({open: !old.open}))

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
        <List>
            <ListItem key="orchards" disablePadding>
                <ListItemButton onClick={() => navigate("/orchards")}>
                    <ListItemIcon>
                        <HomeWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orchards" />
                </ListItemButton>
            </ListItem>
            <ListItem key="workers" disablePadding>
                <ListItemButton onClick={() => navigate("/workers")}>
                    <ListItemIcon>
                        <HomeWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Workers" />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem key="Logout" disablePadding>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </ListItem>
        </List>
        </Box>
    );

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
            </AppBar>
            </Box>
            <div style={{margin: '8px'}}>
                <Outlet />
            </div>
            <Drawer open={drawer.open} onClose={toggleDrawer}>
                {DrawerList}
            </Drawer>
        </div>
    )
}