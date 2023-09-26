//import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>Welcome to the Courier Raffle at RedwoodJS Conf 🌲</h1>
      <p>Choose your own adventure ⚔️</p>
      <section style={{ display: 'flex' }}>
        <div
          style={{
            padding: '8px',
            borderRadius: '4px',
            background: '#FEF8DD',
            width: '40%',
            marginRight: '16px',
          }}
        >
          <p>Option #1 - Send an SMS with your full name to:</p>
          <p
            style={{
              fontFamily: 'monospace ',
              fontSize: '250%',
              fontWeight: 'bold',
            }}
          >
            (206) 589-8548
          </p>
        </div>
        <div
          style={{
            padding: '8px',
            borderRadius: '4px',
            background: '#CAF1DE',
            flex: 1,
          }}
        >
          <p>
            Option #2 - Send an email with your full name in the subject to:
          </p>
          <p
            style={{
              fontFamily: 'monospace ',
              fontSize: '250%',
              fontWeight: 'bold',
            }}
          >
            raffle@hacks.courier.com
          </p>
        </div>
      </section>
      <p>Good luck! 💜</p>
    </>
  )
}

export default HomePage
