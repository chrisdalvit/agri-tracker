import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";

type Orchard = {
    id: number
    name: string
}

export function OrchardCard({ id, name }: Orchard) {
    const navigate = useNavigate()
    return <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Anlage
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate("/orchards/" + id)}>Details</Button>
            </CardActions>
        </Card>
    </Grid>
}