import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Stars, Music, Camera, PenTool, ArrowRight } from 'lucide-react'
import './App.css'

// Import local assets
import img01 from './assets/01.jpeg'
import img02 from './assets/02.jpeg'
import img03 from './assets/03.jpeg'
import img04 from './assets/04.jpeg'
import img05 from './assets/05.jpeg'
import img06 from './assets/06.jpeg'
import img08 from './assets/08.jpeg'
import img09 from './assets/09.jpeg'
import img10 from './assets/10.jpeg'
import img11 from './assets/11.jpeg'
import img12 from './assets/12.jpeg'
import img13 from './assets/13.jpeg'
import img14 from './assets/14.jpeg'
import img15 from './assets/15.jpeg'
import img16 from './assets/16.jpeg'


const App = () => {
  const [stage, setStage] = useState('landing') // landing, quiz, proposal, celebration
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })

  const questions = [
    { text: "Do you remember the very first time we met?", img: img15, rotation: "-5deg" },
    { text: "Do you believe our stars were meant to align?", img: img02, rotation: "4deg" },
    { text: "Will you always be with me?", img: img14, rotation: "-3deg" },
    { text: "Will you travel with me till the end of the world?", img: img10, rotation: "5deg" },
    { text: "Do you think we are each other's 'One'?", img: img05, rotation: "-2deg" },
  ]

  const handleAnswer = (answer) => {
    const newAnswers = [...quizAnswers, { question: questions[currentQuestion].text, answer }]
    setQuizAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      localStorage.setItem('valentine_quiz_results', JSON.stringify(newAnswers))
      setStage('proposal')
    }
  }

  const handleNoHover = () => {
    const newX = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50)
    const newY = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50)
    setNoButtonPos({ x: newX, y: newY })
  }

  const handleYes = () => {
    setStage('celebration')
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
    })
  }

  const finalPolaroids = [
    { id: 1, caption: "Better Together", rotation: "-8deg", img: img01 },
    { id: 2, caption: "Pure Magic", rotation: "5deg", img: img16 },
    { id: 3, caption: "Always You", rotation: "-4deg", img: img06 },
    { id: 4, caption: "Better Together", rotation: "5deg", img: img11 },
  ]

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="landing-section"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart size={100} color="#ff4d6d" fill="#ff4d6d" />
            </motion.div>
            <h1 className="title">My Dearest Love...</h1>
            <p className="subtitle calligraphy">Before I ask the big question, I have a few small ones...</p>
            <button className="btn btn-yes" onClick={() => setStage('quiz')}>
              Start the Love Quiz <ArrowRight size={20} style={{ marginLeft: '10px' }} />
            </button>
          </motion.div>
        )}

        {stage === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="quiz-container"
          >
            <div className="quiz-content">
              <div className="question-card">
                <p className="question-text calligraphy">{questions[currentQuestion].text}</p>
                <div className="quiz-buttons">
                  <button className="btn btn-yes" onClick={() => handleAnswer('Yes')}>Definitely Yes!</button>
                  <button className="btn btn-no" onClick={() => handleAnswer('Of Course')}>Of Course!</button>
                </div>
              </div>
              <motion.div
                key={currentQuestion}
                className="polaroid quiz-polaroid"
                style={{ '--rotation': questions[currentQuestion].rotation }}
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{ rotate: questions[currentQuestion].rotation, scale: 1 }}
              >
                <img src={questions[currentQuestion].img} alt="quiz" className="polaroid-img" />
                <p className="polaroid-caption">Memory #{currentQuestion + 1}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="hero-section"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart size={120} color="#ff4d6d" fill="#ff4d6d" />
            </motion.div>
            <h1 className="title calligraphy">You've answered everything perfectly...</h1>
            <h2 className="title">Now... Will you be my Valentine?</h2>
            <div className="button-group">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-yes"
                onClick={handleYes}
              >
                Yes, Forever!
              </motion.button>
              <motion.button
                className="btn btn-no"
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={handleNoHover}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="celebration-section"
          >
            <h1 className="title calligraphy">My Heart is Yours! ❤️</h1>

            <div className="polaroid-gallery">
              {finalPolaroids.map((p, idx) => (
                <motion.div
                  key={p.id}
                  className="polaroid"
                  style={{ '--rotation': p.rotation }}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: p.rotation }}
                  transition={{ delay: idx * 0.3 }}
                >
                  <img src={p.img} alt={p.caption} className="polaroid-img" />
                  <p className="polaroid-caption">{p.caption}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="love-note"
            >
              <p className="note-text calligraphy">
                My dearest, every answer today only confirms what I already knew.
                Our love is a beautiful journey, and I'm so glad we're walking it together.
                I promise to love you, laugh with you, and cherish you through every memory we've made
                and every memory yet to come.
                I can't wait to see where our love takes us.
                I love you more than words can express.

                "Ennaku theriayala yen oona Pidichiruku yen pichidhu nu but I Really Felt for you"
                I will what ever the future brings and ready to make it till it workout. <br />
                <span className="font-strong">Finally Love you dii Papa so much</span>
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, delay: 2 }}
                style={{ height: '2px', background: 'var(--primary)', marginTop: '2rem', opacity: 0.4 }}
              />
              <p className="calligraphy" style={{ marginTop: '1.5rem', fontSize: '2rem', color: 'var(--primary)' }}>- Yours Eternally </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Hearts */}
      <div className="background-decorations">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            style={{
              position: 'fixed',
              left: `${Math.random() * 100}vw`,
              top: '100vh',
              color: 'rgba(255, 77, 109, 0.15)',
            }}
            animate={{
              y: '-110vh',
              x: [0, 30, -30, 0],
              rotate: [0, 90, -90, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          >
            <Heart size={Math.random() * 40 + 15} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default App
