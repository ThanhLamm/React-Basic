import React, { useState } from 'react'

function Row({ user, index, deleteUser, update, setUserUpdate }) {

    const [isEdit, setEdit] = useState(false);
    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState(user.address);

    const edit = () => {
        setEdit(true)
    }

    const done = () => {
        setEdit(false)
    }

    const updateForm = () => {
        setUserUpdate({ name: user.name, address: user.address, age: user.age, phone: user.phone });
        deleteUser(user.id);
    }

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td onClick={edit}><input type="text" style={{ border: 'none' }} onChange={(e) => setName(e.target.value)} readOnly={!isEdit} value={name} /></td>
                <td onClick={edit}><input type="text" style={{ border: 'none' }} onChange={(e) => setAddress(e.target.value)} readOnly={!isEdit} value={address} /></td>
                <td>
                    <button className="btn btn-primary" hidden={!isEdit} onClick={() => { update(user.id, name, address); done() }}><i className="fas fa-check"></i></button>
                    <button className="btn btn-primary"
                        onClick={updateForm}
                        hidden={isEdit}><i className="fas fa-edit"></i></button>&nbsp;
                    <button className="btn btn-danger" hidden={isEdit} onClick={() => deleteUser(user.id)}><i className="fas fa-times"></i></button>
                </td>
            </tr>
        </>
    )
}

export default React.memo(Row)
