export const defaultHero = {
  badge: '#RelateOrganize',
  title: 'Relate',
  titleHighlight: 'Organize',
  subtitle: 'Event Organizer & Creative Production yang mewujudkan ide dan konsep Anda menjadi acara yang tak terlupakan. Dari perencanaan hingga eksekusi, kami hadir untuk menciptakan momen spesial Anda.',
  gradient: { from: '#3B7303', via: '#2d5a02', to: '#FCA34B', angle: '135deg' },
  showScrollIndicator: true,
}

import team from '../../../public/assets/team.webp'
export const defaultAbout = {
  title: 'Tentang',
  titleHighlight: 'Relate Organize',
  description: 'Relate Organize adalah Event Organizer & Creative Production yang berbasis di Indonesia. Kami hadir untuk membantu mewujudkan acara impian Anda dengan konsep kreatif, eksekusi profesional, dan pelayanan penuh dedikasi.',
  description2: 'Dengan pengalaman di berbagai jenis event — mulai dari corporate gathering, wedding, konser, hingga pameran — kami percaya setiap detail kecil berkontribusi pada kesuksesan acara Anda.',
  image: team,
}

export const defaultServices = {
  badge: 'Our Services',
  title: 'Layanan',
  titleHighlight: 'Kami',
  description: 'Tiga layanan utama yang siap membantu mewujudkan acara impian Anda',
  sectionBg: 'linear-gradient(180deg, #FDFD96 0%, #fefec9 50%, #fff 100%)',
  items: [
    {
      icon: '🎪',
      title: 'Event Organizer',
      desc: 'Layanan event organizer lengkap untuk corporate event, wedding, gathering, konser, pameran, dan berbagai acara lainnya. Kami handle dari konsep hingga eksekusi.',
    },
    {
      icon: '🎨',
      title: 'Relate Design Creative',
      desc: 'Solusi desain kreatif untuk branding perusahaan, visual identity, booth design, backdrop panggung, souvenir, dan materi promosi cetak maupun digital.',
    },
    {
      icon: '⚙️',
      title: 'Relate Production',
      desc: 'Layanan produksi event profesional meliputi lighting, sound system, stage setup, rigging, LED screen, dan peralatan teknis modern lainnya.',
    },
  ],
}

import Event from '../../../public/assets/event.webp'
import Design from '../../../public/assets/design creative.webp'
import Production from '../../../public/assets/produksi.webp'

export const defaultPortfolio = {
  categories: ['All', 'Event', 'Design', 'Production'],
  items: [
    { id: 1, category: 'Event', title: 'Corporate Gathering 2025', sub_kategori: 'Corporate', desc: 'Acara tahunan perusahaan dengan konsep modern dan elegan untuk 500+ tamu.', image: Event, guest_count: '500+ Tamu', location: 'Hotel Indonesia Kempinski, Jakarta', preparation_time: '2 Bulan', challenge: 'Klien menginginkan acara corporate gathering yang bisa mengakomodasi 500+ tamu dengan konsep mewah namun tetap hangat dan interaktif. Tantangan utamanya adalah venue yang tersedia memiliki tata ruang terbatas untuk jumlah tamu sebanyak itu.', solution: 'Kami merancang tata panggung multifungsi dengan sistem crowd flow yang efisien. Menggunakan konsep circular seating dengan 3 stage point berbeda agar semua tamu mendapatkan pengalaman yang setara.', results: 'Acara berjalan lancar tanpa kendala berarti. 95% tamu memberikan feedback positif. Klien puas dan sudah memesan untuk acara tahun depan.', video: '', is_featured: true },
    { id: 2, category: 'Event', title: 'Music Festival 2024', sub_kategori: 'Festival', desc: 'Konser musik outdoor dengan panggung spektakuler dan tata cahaya memukau.', image: Event, guest_count: '3000+ Pengunjung', location: 'Lapangan Parkir GBK, Jakarta', preparation_time: '3 Bulan', challenge: 'Event outdoor dengan kapasitas besar membutuhkan sistem sound yang merata di seluruh area, serta manajemen crowd yang ketat mengingkat lokasi rawan macet.', solution: 'Kami menggunakan distributed sound system dengan 12 tower speaker dan 4 FOH mix point. Sistem tiket digital + RFID bracelet untuk akses cepat.', results: 'Zero delay pada jadwal performance. Tidak ada insiden keamanan. Vendor sponsor puas dengan exposure yang didapat.', video: '', is_featured: true },
    { id: 3, category: 'Design', title: 'Brand Identity', sub_kategori: 'Branding', desc: 'Perancangan identitas visual lengkap untuk startup teknologi terkemuka.', image: Design, guest_count: '', location: '', preparation_time: '1 Bulan', challenge: '', solution: '', results: '', video: '', is_featured: false },
    { id: 4, category: 'Design', title: 'Event Booth Design', sub_kategori: 'Pameran', desc: 'Desain booth pameran interaktif dengan konsep futuristik dan engaging.', image: Design, guest_count: '', location: '', preparation_time: '3 Minggu', challenge: '', solution: '', results: '', video: '', is_featured: false },
    { id: 5, category: 'Production', title: 'Stage Setup', sub_kategori: 'Produksi', desc: 'Setup panggung lengkap dengan lighting, sound system, dan LED screen.', image: Production, guest_count: '', location: '', preparation_time: '2 Minggu', challenge: '', solution: '', results: '', video: '', is_featured: false },
    { id: 6, category: 'Production', title: 'Wedding Production', sub_kategori: 'Pernikahan', desc: 'Produksi pernikahan megah dengan dekorasi, lighting, dan dokumentasi.', image: Production, guest_count: '400+ Tamu', location: 'Ballroom Hotel Mulia, Jakarta', preparation_time: '4 Bulan', challenge: 'Keluarga mempelai menginginkan konsep pernikahan adat modern dengan sentuhan tradisional yang kuat, sementara venue ballroom memiliki keterbatasan untuk dekorasi gantung.', solution: 'Kami merancang hybrid decor dengan struktur mandiri yang tidak perlu digantung ke plafon. Menggabungkan elemen kayu, kain batik modern, dan lighting hangat.', results: 'Acara berjalan sesuai jadwal. Semua tamu terkesan dengan dekorasi. Foto-foto pernikahan viral di media sosial.', video: '', is_featured: true },
  ],
}

export const defaultWhyChooseUs = {
  items: [
    'Creative Concept',
    'Professional Team',
    'On Time Production',
    'Full Service',
    'Modern Equipment',
    'Flexible Budget',
    'Young & Innovative Team',
  ],
}

export const defaultStatistics = {
  items: [
    { value: 10, label: 'Event Completed' },
    { value: 10, label: 'Clients' },
    { value: 4, label: 'Years Experience' },
    { value: 12, label: 'Creative Team' },
  ],
}

import partner from '../../../public/assets/partner.webp'
export const defaultPartners = {
  items: [
    { name: 'HIPMI Institute', logo: partner, color: 'from-primary/30 to-accent/30' },
    { name: 'HIPMI Institute', logo: partner, color: 'from-accent/30 to-soft-yellow/30' },
    { name: 'HIPMI Institute', logo: partner, color: 'from-primary/30 to-soft-yellow/30' },
    { name: 'HIPMI Institute', logo: partner, color: 'from-accent/30 to-primary/30' },
    { name: 'HIPMI Institute', logo: partner, color: 'from-soft-yellow/30 to-accent/30' },
    { name: 'HIPMI Institute', logo: partner, color: 'from-primary/30 to-accent/30' },
    { name: 'HIPMI Institute', logo: partner, color: 'from-accent/30 to-primary/30' },
    { name: 'HIPMI Institute', logo: partner, color: 'from-soft-yellow/30 to-primary/30' },
  ],
}

export const defaultTestimonials = {
  gradient: { from: '#FDFD96', to: '#fef0d6', angle: '135deg' },
  items: [
    { icon: '🎉', name: 'Sarah Wijaya', event: 'Corporate Gathering 2025', review: 'Relate Organize benar-benar profesional! Acara corporate gathering perusahaan kami berjalan lancar dan melebihi ekspektasi. Tim mereka sangat detail dan responsif.', role: 'HR Manager', rating: 5 },
    { icon: '💍', name: 'Andi & Rina', event: 'Wedding Reception', review: 'Terima kasih Relate sudah mewujudkan pernikahan impian kami. Dekorasinya cantik, acaranya terorganisir dengan baik. Semua tamu terkesan!', role: 'Client', rating: 5 },
    { icon: '🎶', name: 'Budi Santoso', event: 'Music Festival 2024', review: 'Konsep kreatif dan eksekusi yang luar biasa. Sound system dan lighting-nya premium. Relate adalah partner event terbaik yang pernah kami kerja sama.', role: 'Event Director', rating: 5 },
    { icon: '🏢', name: 'Dian Permata', event: 'Product Launch', review: 'Profesionalisme tim Relate patut diacungi jempol. Dari perencanaan hingga eksekusi, semua berjalan sesuai jadwal. Highly recommended!', role: 'Marketing Manager', rating: 5 },
  ],
}

export const defaultGallery = {
  items: [
    { id: 1, label: 'Team Meeting', icon: '👥', image: '' },
    { id: 2, label: 'Stage Setup', icon: '🎭', image: '' },
    { id: 3, label: 'Lighting Test', icon: '💡', image: '' },
    { id: 4, label: 'Photo & Video', icon: '📸', image: '' },
    { id: 5, label: 'Sound Check', icon: '🔊', image: '' },
    { id: 6, label: 'Documentation', icon: '📹', image: '' },
    { id: 7, label: 'Decoration Setup', icon: '🎨', image: '' },
    { id: 8, label: 'Team Collaboration', icon: '🤝', image: '' },
  ],
}

export const defaultWorkflow = {
  items: [
    { step: '01', title: 'Consultation', desc: 'Konsultasi awal untuk memahami visi, kebutuhan, dan anggaran Anda.', icon: '💬' },
    { step: '02', title: 'Concept Planning', desc: 'Kami rancang konsep kreatif yang sesuai dengan keinginan dan tujuan Anda.', icon: '✏️' },
    { step: '03', title: 'Design & Production', desc: 'Eksekusi desain dan produksi dengan standar kualitas tertinggi.', icon: '🎨' },
    { step: '04', title: 'Execution', desc: 'Pelaksanaan acara dengan koordinasi tim yang profesional dan terstruktur.', icon: '🚀' },
    { step: '05', title: 'Evaluation', desc: 'Evaluasi hasil acara untuk memastikan kepuasan dan perbaikan berkelanjutan.', icon: '📊' },
  ],
}

export const defaultCta = {
  gradient: { from: '#3B7303', via: '#FCA34B', to: '#FDFD96', angle: '135deg' },
  buttons: [
    { platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/6281234567890', enabled: true },
    { platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/relateorganize', enabled: true },
    { platform: 'email', label: 'Contact Us', url: 'mailto:hello@relateorganize.com', enabled: true },
  ],
}

export const defaultFooter = {
  brandName: 'Relate',
  brandHighlight: 'Organize',
  description: 'Event Organizer & Creative Production yang mewujudkan ide dan konsep Anda menjadi acara yang tak terlupakan.',
  navLinks: [
    { name: 'Beranda', href: '#hero' },
    { name: 'Tentang', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'Kontak', href: '#footer' },
  ],
  services: ['Event Organizer', 'Design Creative', 'Production'],
  socialLinks: [
    { platform: 'Instagram', url: 'https://instagram.com/relateorganize', enabled: true },
    { platform: 'TikTok', url: 'https://tiktok.com/@relateorganize', enabled: true },
  ],
  contact: {
    email: 'hello@relateorganize.com',
    whatsapp: '+62 812-3456-7890',
    whatsappUrl: 'https://wa.me/6281242611972',
    address: 'Jl. Example No. 123\nJakarta, Indonesia',
  },
  copyright: 'Relate Organize. All rights reserved.',
  tagline: 'Creative Event Solutions',
}

export const initialData = {
  hero: defaultHero,
  about: defaultAbout,
  services: defaultServices,
  portfolio: defaultPortfolio,
  whyChooseUs: defaultWhyChooseUs,
  statistics: defaultStatistics,
  partners: defaultPartners,
  testimonials: defaultTestimonials,
  gallery: defaultGallery,
  workflow: defaultWorkflow,
  cta: defaultCta,
  footer: defaultFooter,
}
