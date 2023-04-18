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
    id: number;
    application_name: string;
};

const BuyButton: React.FC<ReserveButtonProps> = ({id, application_name}) => {
    const accessToken = localStorage.getItem('access');
    const userInfo = useRecoilValue(userAtom);
    const isUnitHead = userInfo.is_unit_head;
    const setRefresh = useSetRecoilState(refreshTableAtom);
    const [open, setOpen] = useState(false);
    const [bought, setBought] = useState(false);
    const [visible, setVisible] = useState(true);
    const [unusedLicenses, setUnusedLicenses] = useState(0);

    const fetchData = async () => {
        if (application_name) {
            const result = await checkIfOrgHasSoftware(application_name, userInfo.organization);
            if (result && !result.error) {
                setUnusedLicenses(result.count);
            }
        }
    };

    const handleClickOpen = async () => {
        await fetchData();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const buyLicense = async () => {
        const data = await releaseLicense();
        if (data) {
            setBought(true);
            setVisible(false);
        }
    };

    const handleClick = async () => {
        const action = isUnitHead ? releaseLicense : requestReleaseLicense;
        const data = await action();

        if (data) {
            const message = isUnitHead ? 'Lisens frigjort!' : 'Forespørsel sendt sendt til lisensansvarlig!';
            alert(message);
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
                'spc_id': id,
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
                'spc_id': id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setRefresh((old) => !old)
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
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <IconButton
                            onClick={handleClose}
                            sx={{display: 'flex', justifyContent: 'flex-end', padding: '10px', width: 'auto'}}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <DialogTitle
                        id="alert-dialog-title"
                        sx={{textAlign: "center", padding: '25px'}}
                    >
                        {unusedLicenses > 0 ? `Du har ${unusedLicenses} uåpnede lisenser av denne typen fra før.` : 'De har ingen uåpnede lisenser av denne typen. Skriv noe lurt her'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            style={{textAlign: 'center', padding: '5px'}}

                        >
                            {unusedLicenses > 0 ? (
                                <>
                                    Du kan finne de{' '}
                                    <NavLink to={`/licenses/Ubrukte Lisenser?searchTerm=${application_name}`}>

                                        her
                                    </NavLink>
                                    . Benytt deg av de før du du går til innkjøp fra andre enheter. Å
                                    hindre unødvendig innkjøp av lisenser sparer miljøet!
                                </>
                            ) : (
                                'De har ingen uåpnede lisenser av denne typen. Skriv noe lurt her'
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <DialogActions sx={{paddingBottom: '20px'}}>
                            {visible && (
                                <Button
                                    variant="contained"
                                    onClick={buyLicense}
                                    sx={{
                                        padding: '10px',
                                        backgroundColor: '#80ADD3',
                                        fontFamily: 'Source Sans 3, sans-serif',
                                        '&:hover': {backgroundColor: '#709CC2'},
                                    }}
                                >
                                    Kjøp lisens
                                </Button>
                            )}
                        </DialogActions>
                    </div>
                    {bought && (
                        <h2 style={{display: 'flex', justifyContent: 'center', color: '#3A5E7A'}}>Lisens kjøpt!</h2>
                    )}
                </Dialog>
            </div>
        </>
    );

}

export default BuyButton;
