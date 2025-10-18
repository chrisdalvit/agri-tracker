import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

type Orchard = {
    id: number
    farm_id: number,
    name: string
}

type OrchardGridProps = {
    orchards: Orchard[]
}

export function OrchardGrid({ orchards }: OrchardGridProps) {
    return <Grid container spacing={3}>
        {
            orchards.map(orchard => <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Anlage
                        </Typography>
                        <Typography variant="h5" component="div">
                            {orchard.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Details</Button>
                    </CardActions>
                </Card>
            </Grid>
        )}
    </Grid>
}