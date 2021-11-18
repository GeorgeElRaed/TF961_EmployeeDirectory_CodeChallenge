import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function EmployeeForm({ error, setNewUserFunction, setValidationFunction, employee = {
    gender: '',
    name: {
        title: '',
        first: '',
        last: ''
    },
    location: {
        street: {
            number: 0,
            name: ''
        },
        city: '',
        state: '',
        country: '',
        postcode: 0,
    },
    email: '',
    login: {
        uuid: uuidv4(),
        username: '',
        password: '',
    },
    dob: {
        date: new Date()
    },
    phone: '',
    cell: '',
    id: {
        name: '',
        value: ''
    },
    nat: ''
} }) {

    const [uuid] = useState(employee.login.uuid)
    const [username, setUsername] = useState(employee.login.username)
    const [password, setPassword] = useState(employee.login.password)
    const [email, setEmail] = useState(employee.email)
    const [title, setTitle] = useState(employee.name.title)
    const [first, setFirst] = useState(employee.name.first)
    const [last, setLast] = useState(employee.name.last)
    const [gender, setGender] = useState(employee.gender)
    const [streetNumber, setStreetNumber] = useState(employee.location.street.number)
    const [streetName, setStreetName] = useState(employee.location.street.name)
    const [city, setcity] = useState(employee.location.city)
    const [state, setstate] = useState(employee.location.state)
    const [country, setcountry] = useState(employee.location.country)
    const [postcode, setpostcode] = useState(employee.location.postcode)
    const [dob, setDob] = useState(employee.dob.date)
    const [phone, setPhone] = useState(employee.phone)
    const [idName, setIDName] = useState(employee.id.name)
    const [idValue, setIDValue] = useState(employee.id.value)
    const [nationality, setNationality] = useState(employee.nat)



    function validate() {
        if (uuid &&
            username &&
            email &&
            password &&
            first &&
            last &&
            streetNumber &&
            streetName &&
            city &&
            state &&
            country &&
            postcode &&
            dob &&
            phone &&
            title &&
            idName &&
            idValue &&
            nationality) return true;
        return false;
    }

    function getEmployee() {
        return {
            gender: gender,
            name: {
                title: title,
                first: first,
                last: last
            },
            location: {
                street: {
                    number: streetNumber,
                    name: streetName
                },
                city: city,
                state: state,
                country: country,
                postcode: postcode,
            },
            email: email,
            login: {
                uuid: uuid,
                username: username,
                password: password,
            },
            dob: {
                date: dob,
                age: getAge(dob)
            },
            registered: {
                date: new Date().toISOString(),
                age: 0
            },
            phone: phone,
            cell: phone,
            id: {
                name: idName,
                value: idValue
            },
            picture: {
                large: "https://randomuser.me/api/portraits/men/61.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/61.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/61.jpg"
            },
            nat: nationality
        }

    }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function handleNumberChange(setter, value) {
        if (/[0-9]+/.test(value))
            setter(value);
    }

    useEffect(() => { setValidationFunction({ validate }); setNewUserFunction({ getEmployee }) }, [uuid, username, email, password, first, last, gender, streetNumber, streetName, city, state, country, postcode, dob, phone, title, idName, idValue, nationality, setValidationFunction, setNewUserFunction]);


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <span>Login Info</span><br />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Required"
                    value={uuid}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    error={error}
                    label="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                />
            </div>
            <div>
                <span>Personal Information</span><br />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="First"
                    value={first}
                    onChange={({ target }) => setFirst(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Last"
                    value={last}
                    onChange={({ target }) => setLast(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Gender"
                    value={gender}
                    onChange={({ target }) => setGender(target.value)}
                />
            </div>
            <div>
                <span>Location</span><br />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Street Number"
                    value={streetNumber}
                    onChange={({ target }) => handleNumberChange(setStreetNumber, target.value)}
                    type="number"
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Street Name"
                    value={streetName}
                    onChange={({ target }) => setStreetName(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="city"
                    value={city}
                    onChange={({ target }) => setcity(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="state"
                    value={state}
                    onChange={({ target }) => setstate(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="country"
                    value={country}
                    onChange={({ target }) => setcountry(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Postcode"
                    value={postcode}
                    onChange={({ target }) => handleNumberChange(setpostcode, target.value)}
                    type="number"
                />
            </div>
            <div>
                <span>Other Information</span><br />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Date of birth"
                    value={dob}
                    onChange={({ target }) => setDob(target.value)}
                    type='date'
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Phone"
                    value={phone}
                    onChange={({ target }) => setPhone(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="ID Name"
                    value={idName}
                    onChange={({ target }) => setIDName(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="ID Value"
                    value={idValue}
                    onChange={({ target }) => setIDValue(target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    error={error}
                    label="Nationality"
                    value={nationality}
                    onChange={({ target }) => setNationality(target.value)}
                />

            </div>
        </Box>
    )
}
