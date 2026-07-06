import { motion } from 'framer-motion'
import useCountUp from '../hooks/useCountUp.jsx'

function StatItem({ item, index }) {
  const [count, ref] = useCountUp(item.value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="text-center p-6"
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-soft-yellow mb-2">
        {count} {item.suffix || '?'}
      </div>
      <p className="text-white/80 text-sm sm:text-base font-medium">{item.label}</p>
    </motion.div>
  )
}

export default function Statistics({ data }) {
  const d = data

  const gradient = { from: '#3B7303', to: '#1f4a02', angle: '180deg' }

  const grad = `linear-gradient(${gradient.angle || '180deg'}, ${gradient.from} 0%, ${gradient.to} 100%)`

  return (
    <section aria-label="Statistik" className="py-16 lg:py-20 relative" style={{ background: grad }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-soft-yellow/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {d.items.map((item, i) => (
            <StatItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
