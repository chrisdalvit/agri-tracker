import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { OrchardCard } from "./OrchardCard";
import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../hooks/useAPI";

export function OrchardsPage() {

    const { queryUserOrchards } = useAPI()
    const userOrchardsQuery = useQuery(queryUserOrchards())

    if (userOrchardsQuery.isLoading) {
        return <Grid container rowSpacing={3}>
             <Stack spacing={1}>
                <Typography variant="h5"><Skeleton/></Typography>
                <Skeleton variant="rounded" width={275} height={120} />
            </Stack>
        </Grid>
    }

    return (
        <Grid container rowSpacing={3}>
            {
                userOrchardsQuery.data.map((orchard: any) => <OrchardCard id={orchard.id} name={orchard.name} />)
            }
        </Grid>
    )
}