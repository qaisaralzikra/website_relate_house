import { useState } from "react";
import Graduation from "../../../../public/storage/portfolio/portfolio_1781688471_5a8Yl.JPG";
import SectionTitle from "../../Components/SectionTitle";
import { motion } from "framer-motion";

// ... (pricingPlans array diabaikan atau tetap biarkan seperti kode Anda jika dipakai)

function PricingCard({ plan, index }) {
    const [showAll, setShowAll] = useState(false);
    const Icon = plan.popular ? "ri-vip-crown-line" : "ri-star-line";
    const visibleItems = showAll ? plan.items : plan.items.slice(0, 5);
    const hasMoreItems = plan.items.length > 5;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className={`relative bg-white rounded-2xl border-2 shadow-xl overflow-hidden transition-all duration-300 flex flex-col ${
                plan.popular ? "border-accent" : "border-gray-200 hover:border-primary/30"
            }`}
        >
            {plan.popular && (
                <div className="absolute top-0 right-0">
                    <div className="bg-accent text-primary-dark text-xs font-bold px-4 py-1.5 rounded-bl-2xl shadow-md">
                        POPULAR
                    </div>
                </div>
            )}

            <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                        plan.popular ? "bg-accent text-primary-dark" : "bg-primary/10 text-primary"
                    }`}>
                        <i className={Icon}></i>
                    </div>
                    <h3 className="text-lg font-bold text-primary-dark">{plan.title}</h3>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 text-justify">{plan.desc}</p>
                <div className="h-px w-full bg-gray-100 mb-6" />

                <div className="flex-1 flex flex-col justify-between">
                    <ul className="space-y-3">
                        {visibleItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <i className={`text-lg flex-shrink-0 mt-0.5 ${
                                    plan.popular ? "ri-checkbox-circle-fill text-accent" : "ri-checkbox-circle-line text-primary"
                                }`}></i>
                                <span className="text-gray-600 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>

                    {hasMoreItems && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className={`text-xs font-semibold mt-3 flex items-center gap-1 transition-colors self-start ${
                                plan.popular ? "text-accent hover:text-accent-dark" : "text-primary hover:text-primary-dark"
                            }`}
                        >
                            {showAll ? (
                                <>Sembunyikan <i className="ri-arrow-up-s-line"></i></>
                            ) : (
                                <>Lihat semua (+{plan.items.length - 5}) <i className="ri-arrow-down-s-line"></i></>
                            )}
                        </button>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg ${
                        plan.popular ? "bg-accent text-primary-dark hover:bg-accent-dark shadow-accent/30" : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                >
                    Ajukan Penawaran
                </motion.button>
            </div>
        </motion.div>
    );
}

function DynamicPriceList({ services }) {
    // Mengambil langsung dari prop 'services' yang sudah dipastikan aman
    const categories = services?.image_services || [];
    const priceServices = services?.price_services || [];

    return (
        <div>
            {categories.map((cat, catIndex) => (
                <div key={cat.id} className="relative py-20 overflow-hidden">
                    <div className="h-[276px] mx-4 sm:mx-6 lg:mx-[70px] rounded-[40px] overflow-hidden relative text-center flex items-center justify-center mb-[40px]">
                        <img
                            src={`/storage/${cat.image || Graduation}`}
                            className="absolute object-cover w-full h-full z-1 blur-sm scale-105"
                            alt={cat.name}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-100 transition-opacity z-2" />
                        <h1 className="relative font-semibold text-[34px] sm:text-[40px] lg:text-[100px] text-white z-10">
                            {cat.name}
                        </h1>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle>
                            Pilihan <span className="text-primary">Paket</span>
                        </SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-start justify-items-center">
                            {priceServices
                                .filter((ps) => ps.id_image_service === cat.id)
                                .map((ps, i) => (
                                    <PricingCard
                                        key={ps.id}
                                        plan={{
                                            title: ps.paket_name,
                                            desc: ps.paket_desc,
                                            popular: ps.populer,
                                            items: (ps.list_pakets || []).map((lp) => lp.item_name),
                                        }}
                                        index={i}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function PriceList({ data }) {
    // DETEKSI: Inertia biasa mengirim data langsung atau dibungkus dalam properti (misal data.services)
    // Jalur A: Jika data yang dikirim adalah objek yang Anda sebutkan
    // Jalur B: Jika objek tersebut dibungkus di dalam data.services
    const targetData = data?.image_services ? data : (data?.services || null);

    // Cek apakah data valid dan memiliki price_services
    if (targetData && targetData?.price_services?.length > 0) {
        return <DynamicPriceList services={targetData} />;
    }

    console.log(targetData);

    // Jika tidak memenuhi syarat, tampilkan empty state
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="flex items-center justify-center">
                <img
                    src="https://st2.depositphotos.com/18722762/88115/v/600/depositphotos_881154956-stock-illustration-data-vector-illustration-featuring-empty.jpg"
                    alt="Data Kosong"
                />
            </div>
        </section>
    );
}