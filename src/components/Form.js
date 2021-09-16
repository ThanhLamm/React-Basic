import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid';

function Form({ listUser, setListUser, userUpdate, cleanUserUpdate }) {

    const [currentName, setCurrentName] = useState('');
    const [currentAge, setCurrentAge] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [currentPhone, setCurrentPhone] = useState('');

    const [nameErr, setNameErr] = useState(true);
    const [ageErr, setAgeErr] = useState(true);
    const [addressErr, setAddressErr] = useState(true);
    const [phoneErr, setPhoneErr] = useState(true);

    const regexAlphabet = /^[a-zA-Z ]+$/;
    const regexPhone = /^0+\d{9}$/;
    const regexAge = /\d/

    const onHandleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setListUser([...listUser, { id: v4(), name: currentName, age: currentAge, address: currentAddress, phone: currentPhone }])

            setCurrentName('')
            setCurrentAge('')
            setCurrentAddress('')
            setCurrentPhone('')
        }
    }

    const validate = () => {
        let check = true;
        if (currentName === '' || !regexAlphabet.test(currentName)) {
            setNameErr(false);
            check = false;
        } else {
            setNameErr(true);
        }

        if (currentAge === '' || !regexAge.test(currentAge) || currentAge < 1) {
            setAgeErr(false);
            check = false;
        } else {
            setAgeErr(true);
        }

        if (currentAddress === '' || !regexAlphabet.test(currentAddress)) {
            setAddressErr(false);
            check = false;
        } else {
            setAddressErr(true);
        }

        if (currentPhone === '' || !regexPhone.test(currentPhone)) {
            setPhoneErr(false);
            check = false;
        } else {
            setPhoneErr(true);
        }

        return check;
    }

    useEffect(() => {
        setCurrentName(userUpdate.name === undefined ? currentName : userUpdate.name)
        setCurrentAge(userUpdate.age === undefined ? currentAge : userUpdate.age)
        setCurrentAddress(userUpdate.address === undefined ? currentAddress : userUpdate.address)
        setCurrentPhone(userUpdate.phone === undefined ? currentPhone : userUpdate.phone)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userUpdate])

    return (
        <div>
            <form onSubmit={(e) => { onHandleSubmit(e); cleanUserUpdate() }}>
                <div className="form-group">
                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" name="txtName" id="name"
                        className={`form-control ${nameErr === true ? '' : 'is-invalid'}`}
                        value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                    <span className="invalid-feedback">Name is invalid</span>
                </div>
                <div className="form-group">
                    <label htmlFor="age"><b>Age</b></label>
                    <input type="text" name="txtAge" id="age"
                        className={`form-control ${ageErr === true ? '' : 'is-invalid'}`}
                        value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
                    <span className="invalid-feedback">Age is invalid</span>
                </div>
                <div className="form-group">
                    <label htmlFor="address"><b>Address</b></label>
                    <input type="text" name="txtAddress" id="address"
                        className={`form-control ${addressErr === true ? '' : 'is-invalid'}`}
                        value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
                    <span className="invalid-feedback">Address is invalid</span>
                </div>
                <div className="form-group">
                    <label htmlFor="phone"><b>Phone</b></label>
                    <input type="text" name="txtPhone" id="phone"
                        className={`form-control ${phoneErr === true ? '' : 'is-invalid'}`}
                        value={currentPhone} onChange={(e) => setCurrentPhone(e.target.value)} />
                    <span className="invalid-feedback">Phone is invalid</span>
                </div>
                {/* {console.log(userUpdate.name===undefined)} */}
                <button className="btn btn-success">{userUpdate.name === undefined ? 'Create' : 'Update'}</button>
            </form>
        </div>
    )
}

export default React.memo(Form)
