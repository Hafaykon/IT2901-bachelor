import { useEffect, useState } from 'react';
import { Box, TextField, Button, Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import './Login.css'

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()
        //signIn({ username, password })
    }

    // Naviger til fremside dersom allerede logget inn
    useEffect(() => {
        //if (userDetails) {
        //    router.push("/")
        //}
    })

    return (
        <>
            <Container component='main' maxWidth='sm'>
                <Box id="LogIn">
                    <Typography id="Headline">
                        Logg inn
                    </Typography>
                    <Box component='form'
                        onSubmit={onSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField onChange={(e) => setUsername(e.target.value)} margin='normal' required fullWidth id='loginID' label='E-post' name='LoginID' autoFocus />
                        <TextField onChange={(e) => setPassword(e.target.value)} margin='normal' required fullWidth id='password' label='Passord' name='password' type='password' />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, backgroundColor: '#005aa7' }}>Logg inn</Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

/* export default function Login({ onSubmit }: LoginFormProps){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(username, password);
    };
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <Container maxWidth="xs">
        <form onSubmit={handleSubmit} className="formContainer">
            <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            className="formField"
            />
            <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="formField"
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submitButton"
            >
            Login
            </Button>
        </form>
        </Container>
    );
    
} */