import { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [listUser, setListUser] = useState([]);
  const [userUpdate, setUserUpdate] = useState({});

  const deleteUser = (id) => {
    setListUser(listUser.filter(u => u.id !== id));
  }

  const update = (id, name, address) => {
    var phoneOld = '';
    var ageOld = '';
    listUser.forEach(i => {
      if (i.id === id) {
        phoneOld = i.phone;
        ageOld = i.age;
      }
    })
    setListUser([...listUser.filter(u => u.id !== id), { id: id, name: name, age: ageOld, address: address, phone: phoneOld }])
  }

  const cleanUserUpdate = () => {
    setUserUpdate({});
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6 offset-1">
            <Table listUser={listUser} deleteUser={deleteUser} update={update} setUserUpdate={setUserUpdate} setListUser={setListUser}/>
          </div>
          <div className="col-3 offset-1">
            <Form listUser={listUser} setListUser={setListUser} deleteUser={deleteUser} userUpdate={userUpdate} cleanUserUpdate={cleanUserUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;