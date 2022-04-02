import React from 'react'
import IconButton from '@mui/material/IconButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import {FormControl, InputLabel, Select, MenuItem,} from '@mui/material/';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import Box from '@mui/material/Box';

export const Pagination = ({
    loading,
    skipBase,
    previousPage,
    nextPage,
    elementsPerPage,
    setElementsPerPage,
    setSkipBase,
    totalElementsInDB
}) => {

    const setElements = (e)=>{
        let elements = Number(e.target.value)
        /* if(elements >= totalElementsInDB){
            elements = totalElementsInDB
        } */
        setElementsPerPage(elements)
    }

    return (
        <Box sx={{my:2,display:'flex', }}>
        <small style={{marginTop:6}} >Elementos</small>
            <FormControl  sx={{mx:1}} >
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select style={{height: 32}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={elementsPerPage}
                    onChange={setElements}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={80}>80</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <hr className="m-0"/>
                    <MenuItem value={elementsPerPage}>{elementsPerPage}</MenuItem>
                </Select>
            </FormControl>
            
            <Box className="d-inline" >

            <IconButton sx={{mx:1, mt:0}} disabled={loading || skipBase <= 0} onClick={previousPage}
                aria-label="Anterior" size="small">
                    <ChevronLeftRoundedIcon fontSize="small" />
            </IconButton>
            {
            ((elementsPerPage === 1 ))?
                <span className="m-0 mt-4 text small" style={{width: '25%', color: 'var(--orange-abi)'}}>{skipBase + 1} de {totalElementsInDB}</span>
            :   (
                (elementsPerPage + skipBase === totalElementsInDB)?
            <span className="m-0 mt-4 text small" style={{width: '25%', color: 'var(--orange-abi)'}}>Total</span>
            :<span className="m-0 mt-4 text small" style={{width: '25%', color: 'var(--orange-abi)'}}>{skipBase + 1} {(skipBase + 1 !== totalElementsInDB)?` - ${(elementsPerPage + skipBase <= totalElementsInDB)? (elementsPerPage + skipBase): totalElementsInDB}`: ''} de {totalElementsInDB}</span>
            )
            } 
            <IconButton  sx={{mx:1, mt:0}}  disabled={loading || ((skipBase + elementsPerPage >= totalElementsInDB ))} onClick={nextPage}
                aria-label="Anterior" size="small">
                    <ChevronRightRoundedIcon fontSize="small" />
            </IconButton>

            </Box>
        </Box>
    )
}

