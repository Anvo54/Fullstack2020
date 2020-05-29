import React from 'react'

const Users = ({allUsers, Link}) => {
  return (
    <div>
      <h2>Blogs</h2>
        <table>
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
        </table>
    </div>
    )
}

export default Users