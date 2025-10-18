import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { OrchardGrid } from "./OrchardGrid";
import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../hooks/useAPI";

export function FarmsPage() {

    const { queryUserFarms } = useAPI()
    const userFarmsQuery = useQuery(queryUserFarms)

    if (userFarmsQuery.isLoading) {
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
                userFarmsQuery.data.map((farm: any) => {
                    return <Grid size={12}> 
                        <Typography variant="h5">{farm.name}</Typography>
                        <OrchardGrid orchards={farm.orchards}/>
                    </Grid>
                })
            }
        </Grid>
    )
}