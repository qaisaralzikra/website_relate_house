import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { router } from '@inertiajs/react'

export default function Login({ errors }) {
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    router.post('/login', { password }, {
      preserveState: true,
      onError: () => {},
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30 rotate-[6deg]"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-bold text-primary-dark tracking-tight">
              Relate<span className="text-accent">Admin</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">Masuk ke panel administrasi</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Password Admin</label>
              <div className={`relative transition-all duration-300 rounded-2xl ${focused ? 'ring-2 ring-primary/30 shadow-lg shadow-primary/10' : ''}`}>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-primary transition-all duration-300"
                  autoFocus
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {errors?.password && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl"
                >
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-600 text-sm font-medium">{errors.password}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-sm hover:from-primary-light hover:to-primary transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="flex items-center justify-center gap-2">
                Masuk
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </span>
            </motion.button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} Relate Organizer. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
