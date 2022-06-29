import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FormGenerator from 'components/forms/FormGenerator';
import { useForm } from 'react-hook-form'
import ActorForm from 'components/ActorForm';
import ProducerForm from 'components/ProducerForm';
import { useSelector } from 'react-redux';
import { createMovie, updateMovie } from 'api';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, edit }) {
    const [openActor, setOpenActor] = React.useState(false)
    const [openProducer, setOpenProducer] = React.useState(false)
    const { actors, producers } = useSelector(state => ({ actors: state.actor.data, producers: state.producer.data }))

    const validationSchema = yup.object({
        title: yup.string().required("title is required"),
        year: yup.date().required("release year is required"),
        plot: yup.string().required('Movie plot is required'),
        poster: yup.string().required("Movie poster is required")
    })

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: "",
            year: new Date(),
            plot: "",
            poster: "",
            actors: [],
            producers: []
        },
        resolver: yupResolver(validationSchema)
    });

    React.useEffect(() => {
        if (Boolean(edit)) {
            reset({
                ...edit,
                actors: edit.actors.map(item => ({ ...item, value: item._id, label: item.name })),
                producers: edit.producers.map(item => ({ ...item, value: item._id, label: item.name })),
            })
        }
    }, [edit])

    const onSubmit = async (values) => {
        const actors = values.actors.map(item => {
            if (item._id) return item._id
            return item
        })
        const producers = values.producers.map(item => {
            if (item._id) return item._id
            return item
        })
        if (!Boolean(edit)) await createMovie({ ...values, actors, producers })
        if (Boolean(edit)) await updateMovie({ ...values, actors, producers, id: edit._id })
        handleClose()
    }
    const onerror = (errors) => {
        console.log(errors);
    };

    const handleClose = () => {
        setOpen(false);
        reset({
            title: "",
            year: new Date(),
            plot: "",
            poster: "",
            actors: [],
            producers: []
        })
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >


            <DialogTitle>{Boolean(edit) ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
            <DialogContent>
                <FormGenerator
                    control={control}
                    child={[
                        { type: 'text', name: 'title', label: "Movie Title", gridProps: { xs: 12 } },
                        { type: 'date', views: ['year'], name: 'year', label: "Release Year", gridProps: { xs: 12 } },
                        { type: 'text', name: 'plot', label: "Plot", multiline: true, maxRows: 10, gridProps: { xs: 12 } },
                        { type: 'text', name: 'poster', label: "Poster", gridProps: { xs: 12 } },
                        {
                            type: 'auto-complete',
                            options: actors,
                            multiple: true,
                            name: 'actors',
                            label: "Actors",
                            gridProps: { xs: 12 },
                            extraComponent: ActorForm
                        },
                        {
                            type: 'auto-complete',
                            options: producers,
                            multiple: true,
                            name: 'producers',
                            label: "Producers",
                            gridProps: { xs: 12 },
                            extraComponent: ProducerForm
                        },
                    ]}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit, onerror)}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}
