import axios from 'axios'
import React from 'react'

async function UserPage() {
  const data = await axios.get("")
  return (
    <div>
      Hello from UserPage
    </div>
  )
}

export default UserPage
