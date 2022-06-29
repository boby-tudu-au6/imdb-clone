import * as React from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, CardActions, Collapse, Chip, Divider } from '@mui/material'
import MovieForm from 'components/MovieForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { deleteMovie } from 'api';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function MovieCard(props) {
    const { title, poster, plot, actors, producers, year } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false)

    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);
    const handleExpandClick = () => setExpanded(!expanded);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const editDialog = () => {
        setShowDialog(true)
        handleClose()
    }

    return (
        <Card>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={editDialog}>Edit</MenuItem>
                <MenuItem onClick={() => deleteMovie({ id: props._id })}>Delete</MenuItem>
            </Menu>
            <MovieForm open={showDialog} edit={props} data={props} setOpen={setShowDialog} />
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} src={poster}></Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Release year"
                subheader={new Date(year).getFullYear()}
            />
            <CardMedia
                component="img"
                height="194"
                image={poster}
                alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ cursor: "pointer" }} variant="h5" noWrap title={title}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Plot: </strong>
                    <br />
                    {plot}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="h6">Details</Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h5">Actors: </Typography>
                    {actors.map(item => <Chip sx={{ mr: 1 }} variant="filled" label={item.name} key={item._id} />)}
                    <Divider sx={{ m: 2 }} />
                    <Typography variant="h5">Producers: </Typography>
                    {producers.map(item => <Chip sx={{ mr: 1 }} variant="filled" label={item.name} key={item._id} />)}
                </CardContent>
            </Collapse>
        </Card>
    );
}
