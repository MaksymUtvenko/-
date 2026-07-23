import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Play, RotateCcw, ShieldAlert } from 'lucide-react'
import SectionTitle from './SectionTitle'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function HeartGame() {
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [objects, setObjects] = useState([])
  const [playerX, setPlayerX] = useState(50)
  const arenaRef = useRef(null)
  const playerRef = useRef(50)
  const scoreRef = useRef(0)
  const livesRef = useRef(3)

  const reset = () => {
    scoreRef.current = 0
    livesRef.current = 3
    setScore(0)
    setLives(3)
    setObjects([])
    setFinished(false)
    setRunning(false)
  }

  const start = () => {
    reset()
    setRunning(true)
  }

  const movePlayer = (event) => {
    const bounds = arenaRef.current?.getBoundingClientRect()

    if (!bounds) {
      return
    }

    const nextX = clamp(((event.clientX - bounds.left) / bounds.width) * 100, 8, 92)
    playerRef.current = nextX
    setPlayerX(nextX)
  }

  useEffect(() => {
    if (!running) {
      return undefined
    }

    let tick = 0

    // A lightweight interval loop is enough for this decorative mini-game.
    const intervalId = window.setInterval(() => {
      tick += 1

      setObjects((currentObjects) => {
        let nextObjects = currentObjects
          .map((object) => ({
            ...object,
            y: object.y + object.speed,
          }))
          .filter((object) => object.y < 108)

        nextObjects = nextObjects.filter((object) => {
          const hitPlayer =
            object.y > 78 && object.y < 96 && Math.abs(object.x - playerRef.current) < 10

          if (!hitPlayer) {
            return true
          }

          if (object.type === 'heart') {
            scoreRef.current += 1
          } else {
            livesRef.current -= 1
          }

          return false
        })

        if (tick % 14 === 0) {
          nextObjects.push({
            id: `${Date.now()}-${tick}`,
            type: Math.random() > 0.28 ? 'heart' : 'danger',
            x: 8 + Math.random() * 84,
            y: -6,
            speed: 2.1 + Math.random() * 1.25,
          })
        }

        setScore(scoreRef.current)
        setLives(livesRef.current)

        if (scoreRef.current >= 10 || livesRef.current <= 0) {
          window.clearInterval(intervalId)
          setRunning(false)
          setFinished(true)
          return []
        }

        return nextObjects
      })
    }, 42)

    return () => window.clearInterval(intervalId)
  }, [running])

  return (
    <section className="section-shell" id="game">
      <SectionTitle eyebrow="Игра" title="Поймай сердечки">
        Управляй светящимся сердцем и собери 10 маленьких сердец, обходя острые
        вспышки.
      </SectionTitle>

      <motion.div
        className="romantic-panel mx-auto max-w-3xl p-4 sm:p-6"
        initial={{ opacity: 0, y: 34 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3 text-sm font-bold">
            <span className="rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-cyan">
              Сердца: {score}/10
            </span>
            <span className="rounded-full border border-blush/30 bg-blush/10 px-4 py-2 text-blush">
              Жизни: {lives}
            </span>
          </div>

          <div className="flex gap-2">
            <button className="icon-button" onClick={start} title="Старт" type="button">
              <Play aria-hidden="true" size={18} />
            </button>
            <button className="icon-button" onClick={reset} title="Сброс" type="button">
              <RotateCcw aria-hidden="true" size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative h-[26rem] touch-none overflow-hidden rounded-lg border border-cyan/20 bg-night/80 shadow-inner"
          onPointerDown={movePlayer}
          onPointerMove={movePlayer}
          ref={arenaRef}
        >
          {objects.map((object) => {
            const Icon = object.type === 'heart' ? Heart : ShieldAlert
            const color = object.type === 'heart' ? 'text-blush' : 'text-cyan'

            return (
              <motion.div
                className={`absolute ${color}`}
                key={object.id}
                style={{ left: `${object.x}%`, top: `${object.y}%` }}
                transition={{ duration: 0.15 }}
              >
                <Icon fill="currentColor" size={28} />
              </motion.div>
            )
          })}

          <motion.div
            animate={{ left: `${playerX}%` }}
            className="absolute bottom-5 -translate-x-1/2 text-blush drop-shadow-[0_0_18px_rgba(244,114,182,0.95)]"
          >
            <Heart fill="currentColor" size={44} />
          </motion.div>

          {!running && !finished ? (
            <div className="absolute inset-0 flex items-center justify-center bg-night/55 p-6 text-center backdrop-blur-sm">
              <button className="soft-button" onClick={start} type="button">
                <Play aria-hidden="true" size={18} />
                Играть
              </button>
            </div>
          ) : null}

          {finished ? (
            <div className="absolute inset-0 flex items-center justify-center bg-night/70 p-6 text-center backdrop-blur-sm">
              <div>
                <p className="text-2xl font-black text-white">
                  {scoreRef.current >= 10 ? 'Ты поймала мое сердце ❤️' : 'Еще одна попытка?'}
                </p>
                <p className="mt-3 max-w-md text-slate-300">
                  {scoreRef.current >= 10
                    ? 'И честно говоря, оно давно было твоим.'
                    : 'У нас впереди еще много маленьких побед.'}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </section>
  )
}

export default HeartGame
