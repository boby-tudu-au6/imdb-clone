import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FormGenerator from 'components/forms/FormGenerator';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    gender: yup.string().required('gender is required'),
    bio: yup.string().required('bio is required')
})

export default function AlertDialogSlide({ open, onClose, data, onChange }) {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            dob: new Date(),
            gender: "",
            bio: "",
        },
        resolver: yupResolver(validationSchema)
    });
    const genderOptions = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
    ]

    const onSubmit = async (values) => {
        const lastValue = data[data.length - 1]
        data[data.length - 1] = { value: "", label: lastValue.inputValue, ...values }
        onChange(data)
        handleClose()
    }
    const handleClose = () => {
        reset({
            name: "",
            dob: new Date(),
            gender: "",
            bio: "",
        })
        onClose()
    };

    React.useEffect(() => {
        if (data) {
            const lastValue = data[data.length - 1]

            if (lastValue) reset({
                dob: new Date(),
                gender: "",
                bio: "",
                name: lastValue.inputValue,
            })
        }
    }, [data])

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Add New Actor</DialogTitle>
            <DialogContent>
                <FormGenerator
                    control={control}
                    child={[
                        { type: 'text', name: 'name', label: "Name", gridProps: { xs: 12 } },
                        { type: 'select', name: 'gender', options: genderOptions, label: "Gender", gridProps: { xs: 12 } },
                        { type: 'date', name: 'dob', label: "DOB", gridProps: { xs: 12 } },
                        { type: 'text', name: 'bio', label: "Bio", gridProps: { xs: 12 } },
                    ]}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}
