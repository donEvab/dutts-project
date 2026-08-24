import { NavItem, CoreValue, ServiceItem, ShowcaseItem, ReviewItem, ContactInfo } from '../types';

export const VIDEO_SOURCE = `${import.meta.env.BASE_URL}about-video.mp4`;

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'showcase', label: 'Showcase', href: '#showcase' },
  { id: 'review', label: 'Review', href: '#review' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const CONTACT_INFO: ContactInfo = {
  website: 'www.duttsproject.com',
  instagram: '@dutts.project',
  instagramUrl: 'https://instagram.com/dutts.project',
  email: 'duttsproject@email.com',
  phone: '+62-881-023-042-439',
  whatsappUrl: 'https://wa.me/62881023042439?text=Halo%20Dutts.Project,%20saya%20tertarik%20untuk%20konsultasi%20produksi%20konveksi%20dan%20katalog%20produk.',
  address: 'Sentra Konveksi & Kreatif, Indonesia',
  businessHours: 'Senin - Sabtu (08:30 - 17:30 WIB)'
};

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'quality',
    title: 'Quality',
    description: 'Menjaga standar tinggi dalam setiap detail jahitan, ketelitian pola, dan ketahanan bahan.',
    icon: 'Sparkles'
  },
  {
    id: 'creativity',
    title: 'Creativity',
    description: 'Mendukung ide-ide unik dari UMKM, komunitas, dan merek lokal untuk tampil beda.',
    icon: 'Palette'
  },
  {
    id: 'commitment',
    title: 'Commitment',
    description: 'Berfokus pada ketepatan waktu produksi dan tanggung jawab penuh dalam pelayanan.',
    icon: 'Clock'
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Membuka peluang sinergi tak terbatas dengan para pelaku industri kreatif dan brand.',
    icon: 'Users'
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'Mempromosikan praktik kerja ramah lingkungan dan memberdayakan penjahit lokal berpengalaman.',
    icon: 'Leaf'
  }
];

export const WHY_CHOOSE_US = [
  {
    step: '01',
    title: 'Proses Cepat dan Tepat Waktu',
    desc: 'Kami memahami pentingnya deadline peluncuran brand Anda dan berkomitmen menyelesaikan setiap pesanan sesuai jadwal yang disepakati.'
  },
  {
    step: '02',
    title: 'Kualitas Jahitan & Bahan Unggul',
    desc: 'Menggunakan material premium, benang pilihan, dan quality control berlapis untuk memastikan hasil rapi, nyaman, dan tahan lama.'
  },
  {
    step: '03',
    title: 'Fleksibel untuk Berbagai Kebutuhan',
    desc: 'Melayani pesanan dalam jumlah besar maupun kecil (MOQ ramah), cocok untuk UMKM, merek fesyen rintisan, komunitas, dan institusi.'
  },
  {
    step: '04',
    title: 'Dukungan Desain & Konsultasi Ahli',
    desc: 'Tim kami siap membantu dari konsultasi pemilihan bahan, penyesuaian pola (pattern making), hingga aplikasi sablon/bordir.'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'service-kaos-hoodie',
    title: 'Kaos, Hoodie & Sweater',
    category: 'Streetwear & Apparel',
    description: 'Solusi produksi kaos oblong, oversized tee, hoodie pullover, sweater crewneck, dan zipper jaket dengan standar fitting streetwear modern.',
    features: [
      'Pola Oversized, Regular, & Boxy Cut Presisi',
      'Jahitan Rantai Pundak & Kerah Rib Anti-Melar',
      'Pilihan Gramasi 180 GSM - 380 GSM Heavyweight',
      'Finishing Steam Ironing & Polybag Satuan'
    ],
    materials: [
      'Cotton Combed 20s / 24s / 30s',
      'Heavyweight Cotton 16s (220-240 GSM)',
      'Cotton Fleece 300 - 330 GSM',
      'French Terry & Baby Terry Premium'
    ],
    moq: 'Minimal 24 pcs / desain',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller UMKM'
  },
  {
    id: 'service-kemeja-celana',
    title: 'Kemeja, Workshirt & Celana',
    category: 'Workwear & Casual',
    description: 'Pembuatan kemeja kasual, workshirt berkerah kokoh, celana cargo, chino pant, hingga short pants santai dengan potongan rapi.',
    features: [
      'Jahitan Make-up Triple Chainstitch Kuat',
      'Kancing Custom Laser & Bartack Titik Kritis',
      'Saku Dada Fungsional & Ventilasi Udara',
      'Fitting Ergonomis dan Nyaman Dipakai'
    ],
    materials: [
      'Katun Poplin, Oxford, & Linen',
      'Japan Drill & American Drill Premium',
      'Canvas Twill & Ripstop Anti-Sobek',
      'Chino Stretch Cotton'
    ],
    moq: 'Minimal 36 pcs / artikel',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    badge: 'High Durability'
  },
  {
    id: 'service-seragam-institusi',
    title: 'Seragam Sekolah, Kantor & Komunitas',
    category: 'Corporate & Community',
    description: 'Produksi seragam resmi korporat, kemeja PDH/PDL, polo shirt berkerah bordir, jaket almamater, rompi, dan jersey komunitas.',
    features: [
      'Bordir Komputer Tajima Presisi Micro',
      'Pilihan Warna Kain Lengkap Sesuai Identitas',
      'Size Chart Lengkap (S sampai 5XL)',
      'Pengemasan Rapi Siap Distribusi'
    ],
    materials: [
      'Taipan Tropical & Nagata Drill',
      'Lacoste CVC Pique (Polo Shirt)',
      'Taslan Milky & Parasut Waterproof',
      'High Twist Semi-Wool'
    ],
    moq: 'Minimal 30 pcs / batch',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    badge: 'Instansi & Komunitas'
  },
  {
    id: 'service-sablon-bordir',
    title: 'Cetak Sablon & Bordir Kustom',
    category: 'Custom Art & Technique',
    description: 'Layanan pengerjaan detail sablon mutakhir dan bordir komputer digital mikro untuk mewujudkan grafis paling rumit sekalipun.',
    features: [
      'Sablon Manual Plastisol & High Density 3D',
      'Direct-to-Film (DTF) True Color 1440 DPI',
      'Discharge (Cabut Warna) Lembut di Tangan',
      'Bordir Komputer Tajima Presisi Tinggi'
    ],
    materials: ['Semua jenis kain katun, fleece, drill, dan polyester'],
    moq: 'Bisa satuan untuk sampling massal',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    badge: 'High Precision'
  }
];

export const SHOWCASE_DATA: ShowcaseItem[] = [
  {
    id: 'showcase-1',
    title: 'WANDERLUST Heavy Oversized Tee',
    client: 'Local Streetwear Movement',
    category: 'T-Shirt',
    tag: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    description: 'Kaos oversized 220 GSM dengan sablon Plastisol High-Density timbul dan rib leher tebal anti-kendur.',
    technique: 'Plastisol Puff + Double Stitching',
    fabric: 'Heavy Cotton Combed 16s',
    year: '2024',
    specs: {
      material: 'Heavy Cotton Combed 16s',
      technique: 'Plastisol Puff + Double Stitching',
      quantity: '120 pcs',
      leadTime: '10 Hari Kerja'
    }
  },
  {
    id: 'showcase-2',
    title: 'NOCTURNE Heavy Boxy Hoodie',
    client: 'Arcade Apparel Co.',
    category: 'Hoodie',
    tag: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Hoodie berpotongan boxy dengan kantong kangaroo tersembunyi dan bordir tatami mikro di bagian dada.',
    technique: 'Computerized Micro Embroidery',
    fabric: 'Cotton Fleece Heavy 330 GSM',
    year: '2024',
    specs: {
      material: 'Cotton Fleece Heavy 330 GSM',
      technique: 'Micro Embroidery + Hidden Pocket',
      quantity: '80 pcs',
      leadTime: '12 Hari Kerja'
    }
  },
  {
    id: 'showcase-3',
    title: 'CORP PDH Tactical Field Shirt',
    client: 'Himpunan Mahasiswa & Instansi',
    category: 'Uniform',
    tag: 'Uniform',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Seragam kemeja lapangan PDH dengan ventilasi punggung, bahan adem, dan emblem bordir presisi.',
    technique: 'HD Digital Embroidery + Piping',
    fabric: 'Taipan Tropical Premium',
    year: '2024',
    specs: {
      material: 'Taipan Tropical Premium',
      technique: 'HD Digital Embroidery + Piping',
      quantity: '250 pcs',
      leadTime: '14 Hari Kerja'
    }
  },
  {
    id: 'showcase-4',
    title: 'URBAN WORKWEAR Canvas Chore Coat',
    client: 'Subtle Culture Studio',
    category: 'Outerwear',
    tag: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Jaket kerja bergaya vintage chore dengan kancing kuningan antik dan triple needle chainstitch.',
    technique: 'Triple Chainstitch + Vintage Wash',
    fabric: 'Heavy Duck Canvas 12oz',
    year: '2024',
    specs: {
      material: 'Heavy Duck Canvas 12oz',
      technique: 'Triple Chainstitch + Vintage Wash',
      quantity: '60 pcs',
      leadTime: '14 Hari Kerja'
    }
  },
  {
    id: 'showcase-5',
    title: 'VARSITY CLUB Chenille Letterman',
    client: 'Graduation Project batch #09',
    category: 'Varsity',
    tag: 'Varsity',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    description: 'Jaket varsity klasik perpaduan bahan wool laken dan faux leather dengan patch chenille timbul.',
    technique: 'Chenille Patch + Satin Lining',
    fabric: 'Laken Wool & Synthetic Leather',
    year: '2024',
    specs: {
      material: 'Laken Wool & Synthetic Leather',
      technique: 'Chenille Patch + Satin Lining',
      quantity: '90 pcs',
      leadTime: '14 Hari Kerja'
    }
  },
  {
    id: 'showcase-6',
    title: 'RHYTHM Vintage Washed Graphic Tee',
    client: 'Indie Band Merchandise',
    category: 'Merch',
    tag: 'Merch',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80',
    description: 'Kaos merchandise band dengan teknik acid stone-wash vintage dan sablon discharge super halus.',
    technique: 'Acid Wash + Discharge Screenprint',
    fabric: 'Cotton Combed 24s Soft Vintage',
    year: '2024',
    specs: {
      material: 'Cotton Combed 24s Soft Vintage',
      technique: 'Acid Wash + Discharge Screenprint',
      quantity: '200 pcs',
      leadTime: '9 Hari Kerja'
    }
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Dimas Satria',
    role: 'Founder & Creative Director',
    company: 'KALA Studio Local Brand',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Kualitas sablon Plastisol High-Density dan ketebalan kain 16s untuk rilisan pertama brand kami luar biasa presisi. Customer sangat puas dengan finishing jahitannya.',
    projectType: 'Heavyweight Oversized Tees (150 pcs)',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Sarah Amanda',
    role: 'Ketua Divisi Logistik',
    company: 'BEM Fakultas Ekonomi & Bisnis',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Pesan kemeja PDH 200 pcs dengan bordir logo detail selesai tepat waktu sebelum acara pelantikan. Bahan Taipan Tropical sangat adem dan tidak gerah.',
    projectType: 'Kemeja PDH Instansi (200 pcs)',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Rian Pratama',
    role: 'Head of Brand',
    company: 'Nomad Supply Co.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Dutts.Project sangat komunikatif dalam konsultasi sample dan fitting pola boxy hoodie. Sablon DTF dan woven label terpasang sangat rapi.',
    projectType: 'Cotton Fleece Boxy Hoodies (80 pcs)',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Kevin Wijaya',
    role: 'Event Organizer Lead',
    company: 'Sound of Youth Festival',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Pengerjaan kaos official merch crew 350 pcs selesai hanya dalam 6 hari kerja saat deadline mepet. Pelayanan responsif dan kualitas tetap terjaga.',
    projectType: 'Official Crew Merchandise (350 pcs)',
    verified: true
  }
];
