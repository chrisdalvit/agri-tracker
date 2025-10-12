import { Grid, Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const card = <Card sx={{ minWidth: 275 }}>
    <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Anlage
        </Typography>
        <Typography variant="h5" component="div">
            Stiermoos
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small">Details</Button>
    </CardActions>
</Card>

export function OrchardGrid() {
    return (
        <Grid container spacing={6}>
            <Grid size={3}>
                {card}
            </Grid>
        </Grid>
    )
}