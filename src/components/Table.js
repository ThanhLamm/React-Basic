import React, { useEffect, useState } from 'react'
import Row from './Row'

function Table({ listUser, deleteUser, update, setUserUpdate, setListUser }) {
    const [page, setPage] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    // const [listTemp, setListTemp] = useState();

    const getPage = () => {
        var arr = [];
        for (let i = 1; i <= Math.ceil(listUser.length / 5); i++) {
            arr.push(i);
        }
        setPage(arr);
    }

    const render = () => {
        const begin = (pageNumber - 1) * 5;
        const end = pageNumber * 5;

        switch (sort) {
            case 'name':
                setListUser(listUser.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }))
                break;
            case 'address':
                setListUser(listUser.sort((a, b) => {
                    if (a.address < b.address) return -1;
                    if (a.address > b.address) return 1;
                    return 0;
                }))
                break;
            default:
                break;
        }

        // return listUser.slice(begin, end);
        return search !== '' ? (listUser.filter(i => (i.name).toLowerCase().includes(search))).slice(begin, end) : (listUser.slice(begin, end))
    }

    useEffect(() => {
        getPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listUser, pageNumber, search, sort])

    return (
        <div>
            <input type="text" className="form-control col-4 float-left" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="form-group col-3 float-right">
                <select className="custom-select" defaultValue="" onChange={(e) => setSort(e.target.value)}>
                    <option value="">Select sort by</option>
                    <option value="name">Name</option>
                    <option value="address">Address</option>
                </select>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(listUser !== undefined) ? render().map((user, index) => <Row key={user.id} user={user} index={index} deleteUser={deleteUser} update={update} setUserUpdate={setUserUpdate} />) : null}
                </tbody>
            </table>
            <div className="row col justify-content-center" hidden={page.length <= 1}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={() => setPageNumber(pageNumber - 1 === 0 ? 1 : pageNumber - 1)}><span className="page-link"><i className="fas fa-chevron-left"></i></span></li>
                        {page.map(i => <li key={i} onClick={() => setPageNumber(i)} className={`page-item ${i === pageNumber ? 'active' : ''}`}><span className="page-link">{i}</span></li>)}
                        <li className="page-item" onClick={() => setPageNumber(pageNumber + 1 > Math.ceil(listUser.length / 5) ? Math.ceil(listUser.length / 5) : pageNumber + 1)}><span className="page-link"><i className="fas fa-chevron-right"></i></span></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default React.memo(Table)