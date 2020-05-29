import React from 'react'

const Users = ({allUsers}) => {
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
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>)}
          </tbody>
        </table>
    </div>
    )
}

export default Users