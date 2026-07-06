import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Area, AreaChart,
} from 'recharts'

const formatNumber = (n) => (n ?? 0).toLocaleString('id-ID')

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} className="text-sm" style={{ color: entry.color }}>
                    {entry.name}: {formatNumber(entry.value)}
                </p>
            ))}
        </div>
    )
}

const tabs = [
    { key: 'weekly', label: 'Mingguan' },
    { key: 'monthly', label: 'Bulanan' },
    { key: 'yearly', label: 'Tahunan' },
]

export default function Dashboard({ visitorStats }) {
    const [view, setView] = useState('weekly')
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 100)
        return () => clearTimeout(timer)
    }, [])

    const stats = visitorStats ?? {
        today: { visitors: 0, pageViews: 0 },
        weekly: [],
        monthly: [],
        yearly: [],
    }

    const chartData = view === 'weekly' ? stats.weekly
        : view === 'monthly' ? stats.monthly
        : stats.yearly

    const dataKeyX = view === 'yearly' ? 'month' : 'day'

    const totalVisitors = chartData.reduce((s, d) => s + (d.visitors ?? 0), 0)
    const totalViews = chartData.reduce((s, d) => s + (d.pageViews ?? 0), 0)
    const avgVisitors = chartData.length ? Math.round(totalVisitors / chartData.length) : 0

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-primary-dark">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Statistik pengunjung website</p>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.key}
                            onClick={() => setView(tab.key)}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                view === tab.key
                                    ? 'bg-white text-primary-dark shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </motion.button>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Hari Ini</p>
                    <p className="text-2xl font-bold text-primary-dark mt-1">{formatNumber(stats.today.visitors)}</p>
                    <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: animated ? '100%' : '0%' }} />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Pengunjung</p>
                    <p className="text-2xl font-bold text-primary-dark mt-1">{formatNumber(totalVisitors)}</p>
                    <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: animated ? '100%' : '0%' }} />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Rata-rata Harian</p>
                    <p className="text-2xl font-bold text-primary-dark mt-1">{formatNumber(avgVisitors)}</p>
                    <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <p className="text-xs text-gray-400 mt-1">
                            {view === 'weekly' ? 'Per hari' : view === 'monthly' ? 'Per hari' : 'Per bulan'}
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Page Views</p>
                    <p className="text-2xl font-bold text-primary-dark mt-1">{formatNumber(totalViews)}</p>
                    <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-1000 ease-out delay-200" style={{ width: animated ? '100%' : '0%' }} />
                    </div>
                </motion.div>
            </motion.div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-primary-dark">
                        {view === 'weekly' ? 'Pengunjung 7 Hari Terakhir'
                            : view === 'monthly' ? 'Pengunjung 30 Hari Terakhir'
                            : 'Pengunjung 12 Bulan Terakhir'}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-0.5 rounded-full bg-primary" />
                            Pengunjung
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-0.5 rounded-full bg-accent" />
                            Page Views
                        </span>
                    </div>
                </div>
                <div className="h-72 lg:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B7303" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3B7303" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FCA34B" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#FCA34B" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey={dataKeyX} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={formatNumber} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="visitors" stroke="#3B7303" strokeWidth={2} fill="url(#colorVisitors)" name="Pengunjung" />
                            <Area type="monotone" dataKey="pageViews" stroke="#FCA34B" strokeWidth={2} fill="url(#colorViews)" name="Page Views" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
