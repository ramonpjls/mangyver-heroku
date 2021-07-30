import React from 'react'
import {
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem, 
    TextField,
    Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '40ch',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

const Filtro = () => {
    const classes = useStyles();

    return (
    <div className={classes.root}>
      <Accordion fullWidth>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography variant="bold" className={classes.heading}>Busqueda simple</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Equipo</InputLabel>
        <Select>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <TextField id="standard-basic" label="Descripcion corta" />
        <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SearchIcon />}
        style={{margin: "10px"}}
        >
        Buscar
      </Button>
      </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Busqeda avanzada</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SearchIcon />}
        style={{margin: "10px"}}
        >
        Buscar
      </Button>
        </AccordionDetails>
      </Accordion>
    </div>
    )
}

export default Filtro
