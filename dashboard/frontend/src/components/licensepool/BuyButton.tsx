import React, {useEffect, useState} from 'react';
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
import {checkIfOrgHasSoftware} from '../../api/calls';

type ReserveButtonProps = {
    id: number;
    full_name: string;
    appName: string;
    organization: string;
};
const BuyButton: React.FC<ReserveButtonProps> = ({id, full_name, appName, organization}) => {
    const [open, setOpen] = useState(false);
    const [bought, setBought] = useState(false);
    const [visible, setVisible] = useState(true);
    const [unusedLicenses, setUnusedLicenses] = useState(0);


    const fetchData = async () => {
            if (appName && organization) {
                const result = await checkIfOrgHasSoftware(appName, organization);
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
    const buyLicense = () => {
        console.log(appName, organization);
        setBought(true);
        setVisible(false);
    };

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
                                    <NavLink to={`/licenses/Uåpnede Lisenser?search=${appName}`}>
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
};

export default BuyButton;