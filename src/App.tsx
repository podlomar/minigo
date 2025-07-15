import { JSX } from 'react'
import Header from './components/Header'
import GameContainer from './components/GameContainer'
import Footer from './components/Footer'
import './App.css'

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <GameContainer />
      </main>
      <Footer />
    </>
  )
}

export default App
