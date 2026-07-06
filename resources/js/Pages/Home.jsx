import About from "../Components/About";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Services from "../Components/Services";
import Portfolio from "../Components/Portfolio";
import WhyChooseUs from "../Components/WhyChooseUs";
import Statistics from "../Components/Statistics";
import Partners from "../Components/Partners";
import Testimonials from "../Components/Testimonials";
import Gallery from "../Components/Gallery";
import Workflow from "../Components/Workflow";
import CtaSection from "../Components/CtaSection";
import Footer from "../Components/Footer";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    defaultAbout,
    defaultCta,
    defaultFooter,
    defaultGallery,
    defaultHero,
    defaultPartners,
    defaultPortfolio,
    defaultServices,
    defaultStatistics,
    defaultTestimonials,
    defaultWhyChooseUs,
    defaultWorkflow,
} from "../data/defaults";

export default function Home(data) {
    const d = data || {};
    // console.log(d)
    return (
        <>
            <Head>
                <title>Relate House - Event Organizer Profesional</title>
                <meta
                    name="description"
                    content="Relate House menyediakan jasa event organizer profesional untuk acara Anda. Dari konsep hingga eksekusi, kami siap membantu."
                />
                <meta
                    property="og:title"
                    content="Relate House - Event Organizer Profesional"
                />
                <meta
                    property="og:description"
                    content="Relate House menyediakan jasa event organizer profesional untuk acara Anda."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.origin} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
            >
                <Navbar />
                <Hero data={data.heroData} />
                <About data={data.aboutData} />
                <Services data={data.servicesData} />
                <Portfolio data={data.portfolioData} />
                <WhyChooseUs data={data.whyChooseUs} />
                <Statistics data={data.statisticsData} />
                <Partners data={data.partner} />
                <Testimonials data={data.testimoni} />
                {/* <Gallery data={data.galery} /> */}
                <Workflow data={data.workflow} />
                <CtaSection data={data.ctaData} />
                <Footer data={data.footer} />
            </motion.div>
        </>
    );
}
