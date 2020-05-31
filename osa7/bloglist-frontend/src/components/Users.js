import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'


const Users = ({Link}) => {
  const allUsers = useSelector(state => state.allUsers)
  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
          <thead>
            <tr>
              <td>
              </td>
              <td>
                <strong>Blogs created</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(u =>
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>)}
          </tbody>
      </Table>
    </div>
    )
}

export default Users