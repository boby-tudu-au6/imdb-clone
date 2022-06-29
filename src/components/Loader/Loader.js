import React from 'react';
import { Backdrop, CircularProgress, styled } from '@mui/material';
import { useSelector } from 'react-redux'

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    color: '#fff',
    zIndex: theme.zIndex.modal + 1
}))

function Loader() {
    const loading = useSelector(state => state.loader);
    return (
        <StyledBackdrop
            open={loading}
        >
            <CircularProgress color="inherit" />
        </StyledBackdrop>
    )
}

export default Loader
