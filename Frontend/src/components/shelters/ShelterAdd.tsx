import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    Snackbar,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ShelterAdd = () => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);


    const [shelter, setShelter] = useState({
        name:"",
        city:"",
        postalCode:"",
        phoneNumber:"",
        capacity:1
    });

    const addShelter = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/shelter`, shelter);
            navigate("/shelter");
        } catch (error) {
            console.log(error);
            setErrorMessage("Shelter could not be added. Make sure the information is correct. ");
            setShowNotification(true);
        }
    };

    return (
        <Container>

            {showNotification && (
                <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setShowNotification(false)}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>

            )}

            <Card>
                <CardContent>

                    <form onSubmit={addShelter}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlockEnd:3}}>
                            <IconButton component={Link} sx={{ mr: 3 }} to={`/shelter`}>
                                <ArrowBackIcon />
                            </IconButton>{" "}
                            <Typography variant="h6" sx={{flexGrow: 1, textAlign: 'center'}}>
                                <b>Add New Shelter</b>
                            </Typography>

                            <Button type="submit" color="inherit" sx={{ color: 'black'}}>
                                <Tooltip title="Add" arrow>
                                    <AddIcon/>
                                </Tooltip>
                            </Button>
                        </Box>
                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
                                   id="name"
                                   label="Name"
                                   variant="outlined"
                                   fullWidth
                                   sx={{ mb: 2 }}
                                   onChange={(event) => setShelter({ ...shelter, name: event.target.value })}
                        />
                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
                                   id="city"
                                   label="City"
                                   variant="outlined"
                                   fullWidth
                                   sx={{ mb: 2 }}
                                   onChange={(event) => setShelter({ ...shelter, city: event.target.value })}
                        />

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
                                   id="postalCode"
                                   label="Postal Code"
                                   variant="outlined"
                                   fullWidth
                                   sx={{ mb: 2 }}
                                   onChange={(event) => setShelter({ ...shelter, postalCode: event.target.value })}
                        />

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
                                   id="phoneNumber"
                                   label="Phone Number"
                                   variant="outlined"
                                   fullWidth
                                   sx={{ mb: 2 }}
                                   onChange={(event) => setShelter({ ...shelter, phoneNumber: event.target.value })}
                        />

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
                                   id="capacity"
                                   label="Capacity"
                                   variant="outlined"
                                   fullWidth
                                   sx={{ mb: 2 }}
                                   onChange={(event) => setShelter({ ...shelter, capacity: Number(event.target.value) })}
                        />
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};