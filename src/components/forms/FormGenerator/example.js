import React from 'react'
import { useForm } from 'react-hook-form'


function Example() {
    const { control } = useForm()
    //  generator will generate form in grid 
    //  to modify root container put values in rootProps 
    //  to modify item grid, put values in gridProps 
    //  to modify form items, put values, in child 
    return (
        <FormGenerator
            control={control}
            rootProps={{
                spacing: 2
            }}
            child={[
                { type: 'text', name: 'name', label: "name", gridProps: { xs: 3 }, variant: "standard" },
                { type: 'text', name: 'asdf', label: "asdf" },
                { type: 'text', name: 'asdfggsa', label: "asdfggsa" },
                { type: 'text', name: 'asdfs', label: "asdfs" },
                {
                    type: 'select', name: 'erer', label: "erer", options: [
                        { value: 'one', label: 'one' },
                        { value: 'two', label: 'two' },
                        { value: 'three', label: 'three' }]
                },
                { type: 'text', name: 'trrt', label: "trrt" },
                { type: 'text', name: 'dfgdfg', label: "dfgdfg" },
                { type: 'text', name: 'dfgsaer', label: "dfgsaer" },
            ]}
        />
    )
}

export default Example