import {
    Container,
    Card,
    CardContent,
    IconButton,
    CardActions,
    Button,
    Snackbar,
    Typography,
    Tooltip, Box
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import React, {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {BACKEND_API_URL} from "../../constants";
import UpgradeIcon from "@mui/icons-material/Upgrade";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ShelterDelete = () => {
    const { shelterId } = useParams();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);

    const [shelter, setShelter] = useState({
        name: ""
    });

    useEffect(() => {
        const fetchShelter = async () => {
            const response = await fetch(`${BACKEND_API_URL}/shelter/${shelterId}`);
            const shelter = await response.json();
            setShelter({
                name: shelter.name
            })
            console.log(shelter);
        };
        fetchShelter();
    }, [shelterId]);

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.delete(`${BACKEND_API_URL}/shelter/${shelterId}`);
            navigate("/shelter");
        } catch (error: any) {
            console.error(error.message);
            setErrorMessage("Shelter could not be deleted. Make sure it does not accommodate any animals. ");
            setShowNotification(true);
        }
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        navigate("/shelter");
    };

    return (

        <Container>

            {showNotification && (
                <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCancel}>
                    <Alert onClose={handleCancel} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>

            )}

            <Card>
                <CardContent>

                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlockEnd:2, paddingRight:1}}>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/shelter`}>
                            <ArrowBackIcon />
                        </IconButton>{" "}
                        <Typography variant="h6" sx={{flexGrow: 1, textAlign: 'center', color:'black'}}>
                            <b>Delete {shelter.name} Shelter</b>
                        </Typography>

                    </Box>

                    <Typography sx={{flexGrow: 1, textAlign: 'center', color:'black'}}>
                        Are you sure?
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleDelete} style={{color:'red'}}>Delete</Button>
                </CardActions>
            </Card>
        </Container>
    );
};