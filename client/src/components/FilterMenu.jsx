import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Select, TextField } from "@material-ui/core";
import { ClearRounded, ControlPoint } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import useOutsideClick from "../hooks/useOutsideClick";

export default function FilterMenu({ visible, setVisible, setFilters }) {
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, closeMenu);

    function closeMenu({ target }) {
        if (target.tagName !== 'LI')
            if (visible)
                setVisible(false);
    }

    const [filters, setInternalFilters] = useState([]);

    function addFilter(field = 'login.username', condition = 'EQUALS', value = '') {
        setInternalFilters([...filters, { field, condition, value }])
    }

    function updateField(index, value) {
        setInternalFilters([
            ...filters.slice(0, index),
            {
                ...filters[index],
                field: value
            },
            ...filters.slice(index + 1)
        ])
    }
    function updateCondition(index, value) {
        setInternalFilters([
            ...filters.slice(0, index),
            {
                ...filters[index],
                condition: value
            },
            ...filters.slice(index + 1)
        ])
    }
    function updateValue(index, value) {
        setInternalFilters([
            ...filters.slice(0, index),
            {
                ...filters[index],
                value: value
            },
            ...filters.slice(index + 1)
        ])
    }

    function removeFilter(index) {
        setInternalFilters(filters.filter((_, i) => i !== index))
    }

    useEffect(() => {
        setFilters([...filters]
            .filter(({ value }) => value)
            .map(({ field, condition, value }) => `${field}-${condition}-${value}`).join(','));
    }, [filters])

    return (
        <>
            <Paper
                ref={wrapperRef}
                sx={{
                    visibility: `${visible ? 'visible' : 'hidden'}`,
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    margin: '0',
                    display: 'block',
                    zIndex: '1',
                    width: '45vw',
                    maxWidth: '100vw'
                }}>
                <MenuList autoFocus={false} autoFocusItem={false}>
                    <span>Filters</span>
                    {filters.map(({ field, condition, value }, index) => (
                        <MenuItem key={uuidv4()}>
                            <Filter
                                field={field}
                                setField={(i, v) => updateField(i, v)}
                                condition={condition}
                                setCondition={(i, v) => updateCondition(i, v)}
                                value={value}
                                setValue={(i, v) => updateValue(i, v)}
                                index={index}
                                removeFilter={removeFilter}
                            />
                        </MenuItem>
                    ))}
                    <MenuItem onClick={_ => addFilter()}>
                        <ListItemIcon>
                            <ControlPoint fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText>Add Filter</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </>
    )
}

function Filter({ field, condition, value, setField, setCondition, setValue, index, removeFilter }) {

    const CONDITIONS = ['EQUALS', 'NOT_EQUALS', 'CONTAINS', 'NOT_CONTAINS', 'STARTS_WITH', 'ENDS_WITH'];
    const FIELDS = {
        'UUID': 'login.uuid',
        'Username': 'login.username',
        'Email': 'email',
        'Title': 'name.title',
        'First Name': 'name.first',
        'Last Name': 'name.last',
        'Gender': 'gender',
        'City': 'location.city',
        'State': 'location.state',
        'Country': 'location.country',
        'Postcode': 'location.postcode',
        'Age': 'dob.age',
        'phone': 'phone',
        'cell': 'cell',
        'Nationality': 'nat'
    }

    return (
        <div style={{ display: 'inline-flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <ClearRounded onClick={_ => removeFilter(index)} />
            Field:
            <Select
                id='filter'
                value={field}
                label="Field"
                onChange={({ target }) => setField(index, target.value)}
            >
                {Object.keys(FIELDS).map(e => <MenuItem key={uuidv4()} value={FIELDS[e]}>{e}</MenuItem>)}
            </Select>
            <Divider style={{ marginLeft: '10px' }} orientation='vertical' />
            Condition:
            <Select
                id='filter'
                value={condition}
                label="Condition"
                onChange={({ target }) => setCondition(index, target.value)}
            >
                {CONDITIONS.map(e => <MenuItem key={uuidv4()} value={e}>{e}</MenuItem>)}
            </Select>
            <Divider style={{ marginLeft: '10px' }} orientation='vertical' />
            Value:
            <TextField
                key={`filter - ${index}`}
                value={value}
                onChange={({ target }) => setValue(index, target.value)}
                autoFocus
            >

            </TextField>
        </div >
    )
}
