import { Inbox } from '@trycourier/react-inbox'
import { CourierProvider } from '@trycourier/react-provider'
import { Toast } from '@trycourier/react-toast'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <section style={{ display: 'flex' }}>
        <article style={{ width: '400px' }}>
          <h1>HomePage</h1>
          <p>
            Find me in <code>./web/src/pages/HomePage/HomePage.jsx</code>
          </p>
          <p>
            My default route is named <code>home</code>, link to me with `
            <Link to={routes.home()}>Home</Link>`
          </p>
        </article>
        <article>
          <CourierProvider
            userId={process.env.PUBLIC_COURIER_USER}
            clientKey={process.env.PUBLIC_COURIER_CLIENT_KEY}
          >
            <Inbox />
            <Toast />
          </CourierProvider>
        </article>
      </section>
    </>
  )
}

export default HomePage
