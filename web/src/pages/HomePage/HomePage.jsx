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
            userId="ba41ca49b43feb58982e686289aa71e7948824cf4e9677177c5cdd73aa903253"
            clientKey="ZjZmYTE5M2EtMWY1MC00MzQzLWIyYWQtZGM5YmQwMjU0NjI3"
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
