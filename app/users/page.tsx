'use client'

import { signOut } from 'next-auth/react'

const Users = () => {
  return (
    <>
      <div>Hello User!</div>
      <button onClick={() => signOut()}>Logout</button>
    </>
  )
}

export default Users
