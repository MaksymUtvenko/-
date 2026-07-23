const stars = Array.from({ length: 86 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  top: (index * 53) % 100,
  delay: (index % 12) * 0.37,
  duration: 3.2 + (index % 7) * 0.45,
  size: 1 + (index % 3),
}))

function StarBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-night">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.20),transparent_34%),linear-gradient(180deg,#0F172A_0%,#111827_48%,#0F172A_100%)]" />
      <div className="aurora-line absolute left-[-10%] top-[18%] h-px w-[120%] rotate-[-8deg] animate-shimmer opacity-80" />
      <div className="aurora-line absolute bottom-[22%] left-[-15%] h-px w-[130%] rotate-[6deg] animate-shimmer opacity-60" />

      {stars.map((star) => (
        <span
          className="star animate-twinkle"
          key={star.id}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default StarBackground
