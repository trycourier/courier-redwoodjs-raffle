import { useState, useEffect } from 'react'

import { Inbox } from '@trycourier/react-inbox'
import { CourierProvider } from '@trycourier/react-provider'
import { Toast } from '@trycourier/react-toast'

const AppLayout = ({ children }) => {
  const [userSignature, setUserSignature] = useState(null)

  useEffect(() => {
    async function getData() {
      const response = await fetch('/.netlify/functions/userSignature')
      const json = await response.json()
      setUserSignature(json.userSignature)
    }
    getData()
  }, [])

  return (
    <>
      <header
        style={{
          background: '#fff',
          borderBottom: '2px solid #ccc',
          padding: '8px',
          display: 'flex',
        }}
      >
        <div style={{ flex: 1 }}></div>
        <div style={{ width: '300px', textAlign: 'right' }}>
          <CourierProvider
            userId={process.env.PUBLIC_COURIER_USER}
            clientKey={process.env.PUBLIC_COURIER_CLIENT_KEY}
            userSignature={userSignature}
          >
            <Inbox />
            <Toast />
          </CourierProvider>
        </div>
      </header>
      <main style={{ padding: '16px' }}>{children}</main>
    </>
  )
}

export default AppLayout
