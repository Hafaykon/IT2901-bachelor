import React, {useState} from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import {NavLink} from 'react-router-dom';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {refreshTableAtom, userAtom} from "../../globalVariables/variables";
import {checkIfOrgHasSoftware} from '../../api/calls';

type ReserveButtonProps = {
    spc_id: number;
    application_name: string;
};

const BuyButton: React.FC<ReserveButtonProps> = ({spc_id, application_name}) => {
    const accessToken = localStorage.getItem('access');
    const userInfo = useRecoilValue(userAtom);
    const isUnitHead = userInfo.is_unit_head;
    const setRefresh = useSetRecoilState(refreshTableAtom);
    const [open, setOpen] = useState(false);
    const [bought, setBought] = useState(false);
    const [visible] = useState(true);
    const [unusedLicenses, setUnusedLicenses] = useState(0);
    const [error, setError] = useState('');

    const fetchData = async () => {
        if (application_name) {
            const result = await checkIfOrgHasSoftware(application_name, userInfo.organization);
            if (result && !result.error) {
                setUnusedLicenses(result.count);
            }
        }
    };

    const checkIfUserHasRequested = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/requests/check?spc_id=${spc_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const data = await response.json();
        if (!response.ok) {
            setError(data.error);
        }
    };


    const handleClickOpen = async () => {
        await fetchData();
        await checkIfUserHasRequested();
        setOpen(true);
    };

    const handleClose = () => {
        setRefresh((old) => !old)
        setOpen(false);
    };


    const handleClick = async () => {
        const action = isUnitHead ? releaseLicense : requestReleaseLicense;
        const data = await action();
        if (data) {
            setBought(true);
        }
    };


    const requestReleaseLicense = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/requests/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'contact_organization': userInfo.organization,
                'application_name': application_name,
                'request': 'remove',
                'requested_by': userInfo.primary_user_email,
                'spc_id': spc_id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            return data;
        } else {
            alert(data.non_field_errors[0])
        }
    }

    const releaseLicense = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/pool/buy/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                'spc_id': spc_id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            alert(data.error)
        }
    }

    return (
        <>
            <IconButton onClick={handleClickOpen} color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon/>
            </IconButton>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <IconButton
                            onClick={handleClose}
                            sx={{display: "flex", justifyContent: "flex-end", padding: "10px", width: "auto"}}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    {error ? (
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description"
                                               style={{textAlign: "center", padding: "5px"}}>
                                <DialogTitle variant="h6" component="div" sx={{textAlign: "center"}}>
                                    {error}
                                </DialogTitle>
                            </DialogContentText>
                        </DialogContent>
                    ) : (
                        <>
                            <DialogTitle
                                id="alert-dialog-title"
                                sx={{textAlign: "center", padding: "25px"}}
                            >
                                {unusedLicenses > 0 ? `Du har ${unusedLicenses} uåpnede/ledige lisens(er) av ${application_name} fra før.` : `Du har ingen uåpnede lisens(er) av ${application_name}.`}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText
                                    id="alert-dialog-description"
                                    style={{textAlign: "center", padding: "5px"}}
                                >
                                    {unusedLicenses > 0 ? (
                                        <>
                                            Du kan finne de{" "}
                                            <NavLink to={`/Totale Lisenser?searchTerm=${application_name}`}>
                                                her
                                            </NavLink>
                                            <br/>
                                            Benytt deg av de før du du går til innkjøp fra andre enheter. Å
                                            hindre unødvendig innkjøp av lisenser sparer miljøet!
                                        </>
                                    ) : (
                                        <>
                                            Vurder nøye om du trenger en ny lisens før du kjøper.
                                            <br/>
                                            Å unngå unødvendige innkjøp av lisenser bidrar til å spare miljøet og
                                            redusere
                                            kostnader.
                                        </>
                                    )}
                                </DialogContentText>
                            </DialogContent>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <DialogActions sx={{paddingBottom: "20px"}}>
                                    {visible && (
                                        <Button
                                            variant="contained"
                                            onClick={handleClick}
                                            disabled={bought}
                                            sx={{
                                                padding: "10px",
                                                backgroundColor: bought ? "#ccc" : "#80ADD3",
                                                fontFamily: "Source Sans 3, sans-serif",
                                                "&:hover": {backgroundColor: bought ? "#ccc" : "#709CC2"},
                                            }}
                                        >
                                            Kjøp lisens
                                        </Button>
                                    )}
                                </DialogActions>
                            </div>
                            {bought && (
                                isUnitHead ? (
                                    <h2 style={{display: "flex", justifyContent: "center", color: "#3A5E7A"}}>
                                        Lisens kjøpt!
                                    </h2>
                                ) : (
                                    <h2 style={{display: "flex", justifyContent: "center", color: "#3A5E7A"}}>
                                        Forespørsel sendt til lisens ansvarlig!
                                    </h2>
                                )
                            )}
                        </>
                    )}
                </Dialog>
            </div>
        </>
    );

}

export default BuyButton;