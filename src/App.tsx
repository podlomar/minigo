import React from 'react'
import Header from './components/Header'
import GameContainer from './components/GameContainer'
import Footer from './components/Footer'
import './App.css'

const App: React.FC = () => {
  return (
    <div id="app">
      <Header />
      <main>
        <GameContainer />
      </main>
      <Footer />
    </div>
  )
}

export default App
