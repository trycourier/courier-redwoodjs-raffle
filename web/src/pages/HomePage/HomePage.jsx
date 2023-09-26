//import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>Welcome to the Courier Raffle at RedwoodJS Conf 🌲</h1>
      <p>1) Send an SMS with your full name to:</p>
      <p
        style={{
          fontFamily: 'monospace ',
          fontSize: '250%',
          fontWeight: 'bold',
        }}
      >
        (206) 589-8548
      </p>
      <p>2) Send an email with your full name in the subject to:</p>
      <p
        style={{
          fontFamily: 'monospace ',
          fontSize: '250%',
          fontWeight: 'bold',
        }}
      >
        raffle@hacks.courier.com
      </p>
      <p>Good luck! 💜</p>
    </>
  )
}

export default HomePage
