import { useParams } from "react-router"
import { useAPI } from "../hooks/useAPI"
import { useQuery } from "@tanstack/react-query"
import { Box, Tab, Typography } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { useState } from "react"
import { OrchardActivities } from "./OrchardActivities"


export function OrchardPage (){
    const { id } = useParams()
    const { queryUserOrchard } = useAPI()
    const userOrchardQuery = useQuery(queryUserOrchard(id as string))
    const [activeTab, setActiveTab] = useState('1')

    if (userOrchardQuery.isLoading){
        return <div>Loading...</div>
    }

    let {
        id: orchard_id, 
        name
    } = userOrchardQuery.data

    return (
        <>
            <Typography variant="h5">{name}</Typography>
            <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(event, value) => setActiveTab(value)} aria-label="lab API tabs example">
                        <Tab label="Übersicht" value="1" />
                        <Tab label="Aktivitäten" value="2" />
                        <Tab label="Lieferungen" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">Übersicht</TabPanel>
                <TabPanel value="2"><OrchardActivities/></TabPanel>
                <TabPanel value="3">Lieferungen</TabPanel>
            </TabContext>
        </>
    )
}