import { useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { Grid2X2, RotateCcw } from 'lucide-react'
import { defaultPuzzleImage } from '../data/siteData'
import SectionTitle from './SectionTitle'

const makePieces = (size) => Array.from({ length: size * size }, (_, index) => index)

const shufflePieces = (size) => {
  const pieces = makePieces(size)

  for (let index = pieces.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[pieces[index], pieces[randomIndex]] = [pieces[randomIndex], pieces[index]]
  }

  if (pieces.every((piece, position) => piece === position)) {
    ;[pieces[0], pieces[1]] = [pieces[1], pieces[0]]
  }

  return pieces
}

function PhotoPuzzle() {
  const [gridSize, setGridSize] = useState(3)
  const [pieces, setPieces] = useState(() => shufflePieces(3))
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [solved, setSolved] = useState(false)
  const draggedIndex = useRef(null)

  const gridTemplate = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
    }),
    [gridSize],
  )

  const resetPuzzle = (size = gridSize) => {
    setPieces(shufflePieces(size))
    setSelectedIndex(null)
    setSolved(false)
  }

  const changeGrid = (size) => {
    setGridSize(size)
    resetPuzzle(size)
  }

  const swapPieces = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || solved) {
      setSelectedIndex(null)
      return
    }

    setPieces((currentPieces) => {
      const nextPieces = [...currentPieces]
      ;[nextPieces[fromIndex], nextPieces[toIndex]] = [
        nextPieces[toIndex],
        nextPieces[fromIndex],
      ]
      return nextPieces
    })
    setSelectedIndex(null)
  }

  const handleTileClick = (index) => {
    if (selectedIndex === null) {
      setSelectedIndex(index)
      return
    }

    swapPieces(selectedIndex, index)
  }

  useEffect(() => {
    const isSolved = pieces.every((piece, position) => piece === position)
    setSolved(isSolved)

    if (isSolved) {
      confetti({
        colors: ['#8B5CF6', '#22D3EE', '#F472B6', '#FFFFFF'],
        origin: { y: 0.72 },
        particleCount: 120,
        spread: 72,
      })
    }
  }, [pieces])

  return (
    <section className="section-shell" id="puzzle">
      <SectionTitle eyebrow="Пазл" title="Собери наше фото">
        Выбери сетку и собери изображение обратно из перемешанных кусочков.
      </SectionTitle>

      <motion.div
        className="romantic-panel mx-auto max-w-5xl p-4 sm:p-6 lg:grid lg:grid-cols-[0.78fr_1fr] lg:gap-8"
        initial={{ opacity: 0, y: 34 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.25 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6 space-y-5 lg:mb-0">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <img
              alt="Фото для пазла"
              className="h-72 w-full object-cover"
              src={defaultPuzzleImage}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="ghost-button" onClick={() => resetPuzzle()} type="button">
              <RotateCcw aria-hidden="true" size={18} />
              Перемешать
            </button>
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {[3, 4].map((size) => (
              <button
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  gridSize === size
                    ? 'bg-cyan text-night shadow-glow'
                    : 'text-slate-300 hover:text-white'
                }`}
                key={size}
                onClick={() => changeGrid(size)}
                type="button"
              >
                <Grid2X2 aria-hidden="true" className="mr-2 inline" size={16} />
                {size}x{size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div
            className="mx-auto grid aspect-square w-full max-w-[34rem] overflow-hidden rounded-lg border border-cyan/20 bg-night/70 shadow-glow"
            style={gridTemplate}
          >
            {pieces.map((piece, index) => {
              const row = Math.floor(piece / gridSize)
              const col = piece % gridSize
              const x = gridSize === 1 ? 0 : (col / (gridSize - 1)) * 100
              const y = gridSize === 1 ? 0 : (row / (gridSize - 1)) * 100
              const selected = selectedIndex === index

              return (
                <motion.button
                  aria-label={`Кусочек пазла ${index + 1}`}
                  className={`relative aspect-square cursor-grab border border-night/80 bg-cover bg-no-repeat transition focus:outline-none focus:ring-2 focus:ring-cyan/80 ${
                    selected ? 'z-10 scale-[0.96] ring-2 ring-blush' : ''
                  } ${solved ? 'cursor-default border-transparent' : ''}`}
                  draggable={!solved}
                  key={`${piece}-${index}`}
                  onClick={() => handleTileClick(index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDragStart={() => {
                    draggedIndex.current = index
                  }}
                  onDrop={() => swapPieces(draggedIndex.current, index)}
                  style={{
                    backgroundImage: `url("${defaultPuzzleImage}")`,
                    backgroundPosition: `${x}% ${y}%`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  }}
                  type="button"
                  whileHover={solved ? undefined : { scale: 0.97 }}
                />
              )
            })}
          </div>

          <motion.div
            animate={{ opacity: solved ? 1 : 0, y: solved ? 0 : 12 }}
            className="mt-5 min-h-10 text-center text-lg font-bold text-blush"
          >
            {solved ? 'Ты собрала мое сердце ❤️' : ''}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default PhotoPuzzle
