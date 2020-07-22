import React,  { useState } from 'react'

import { Grid , Button, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

const Auth = () => {
    
    const handleSubmit = (e:any) => {
        e.preventDefault()
        setSubmitted(true)
    }
    const handleChange = (e:any) => {
        e.preventDefault()
        setToken(e.target.value)
    }

    const [token, setToken] = useState('')
    const [submitted, setSubmitted] = useState(false)

    if(submitted){
        return(
            <Redirect to={'/'+token} />
        )
    }
    
    return (
        <div>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <form 
                    style={{width:"400px"}} 
                    noValidate 
                    autoComplete="off"
                    ><Grid item xs={12} style={{padding: "20px", textAlign:"center"}}>
                        <TextField 
                            id="token-input" 
                            label="Insira seu Token GitHub"
                            fullWidth
                            onChange={handleChange} />
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            disableElevation 
                            style={{marginLeft:"20px", marginTop:"20px"}} 
                            onClick={handleSubmit}
                        >Ok</Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

export default Auth