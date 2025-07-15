import React from 'react'
import Header from './components/Header.tsx'
import GameContainer from './components/GameContainer.tsx'
import Footer from './components/Footer.tsx'

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
