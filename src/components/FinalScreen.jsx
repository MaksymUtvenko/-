import confetti from 'canvas-confetti'
import { HeartHandshake } from 'lucide-react'

const HEART_COUNT = 240

function FinalScreen() {
  const celebrate = () => {
    confetti({
      colors: ['#22D3EE', '#8B5CF6', '#F472B6', '#FFFFFF'],
      origin: { y: 0.68 },
      particleCount: 180,
      spread: 90,
    })
  }

  return (
    <section className="relative flex min-h-[92svh] items-center px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-bold uppercase text-cyan">Финал</p>
        <h2 className="text-4xl font-black leading-[1.15] text-white sm:text-6xl">
          Спасибо тебе за всё ❤️
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Реально зая спасибо тебе, я некогда и не думал что буду любить кого-то настолько
          сильно, каждое твое &quot;люблю тебя&quot; и &quot;Зая&quot; ранит мое сердце и
          пробивает меня на улыбку. Ну и на финалочку. За этот год я делал много ошибок,
          обижал тебя, иногда кричал и воводил на слезы, портил твои сюрпризы. Возможно
          кто-то другой и видить меня не хотел после такого. Но точно не ты... Поэтому
          эти сердечки для тебя
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blush">
          Люблю тебя очень сильно
        </p>
        <div
          aria-hidden="true"
          className="mx-auto mt-6 grid max-h-56 max-w-2xl grid-cols-8 gap-1 overflow-y-auto sm:grid-cols-12"
        >
          {Array.from({ length: HEART_COUNT }, (_, index) => (
            <span className="text-xl leading-none sm:text-2xl" key={index}>
              💗
            </span>
          ))}
        </div>
        <button className="soft-button mt-9 text-base" onClick={celebrate} type="button">
          <HeartHandshake aria-hidden="true" size={20} />
          С двумя годиками моя любимая ❤️
        </button>
      </div>
    </section>
  )
}

export default FinalScreen
