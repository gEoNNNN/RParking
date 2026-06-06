import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PiBuildingApartment } from 'react-icons/pi';
import { CiShop } from 'react-icons/ci';
import { IoBusinessOutline } from 'react-icons/io5';
import { SlPlane } from 'react-icons/sl';
import { FaRegHospital } from 'react-icons/fa';
import { BiHotel } from 'react-icons/bi';
import { LuSettings2, LuZap, LuHeadphones, LuTrendingUp, LuShieldCheck, LuMapPin, LuArrowRight, LuCheck } from 'react-icons/lu';
import { LiaLeafSolid } from 'react-icons/lia';

const domains = [
  {
    title: 'Parcări rezidențiale',
    image: '/img/parcari%20rezidentiale.png',
    icon: <PiBuildingApartment className="text-white" style={{ fontSize: '1.4rem' }} />,
    description: 'Control acces pentru locatari și vizitatori, abonamente, locuri rezervate.',
    features: ['Acces pe bază de abonament / QR', 'Locuri rezervate pentru locatari', 'Evidență vizitatori', 'Rapoarte și istoric acces'],
  },
  {
    title: 'Centre comerciale',
    image: '/img/centrul%20comercial.png',
    icon: <CiShop className="text-white" style={{ fontSize: '1.4rem' }} />,
    description: 'Gestionare eficientă a fluxului mare de vizitatori și creșterea veniturilor.',
    features: ['Tarifare flexibilă', 'Plăți rapide și multiple metode', 'Reducerea timpului de așteptare', 'Integrare cu sistemele existente'],
  },
  {
    title: 'Parcări corporate',
    image: '/img/parcari%20corporate.png',
    icon: <IoBusinessOutline className="text-white" style={{ fontSize: '1.4rem' }} />,
    description: 'Soluții de parcare pentru angajați și vizitatori, cu control și securitate ridicată.',
    features: ['White/Black List', 'Acces angajați și vizitatori', 'Rapoarte departamentale', 'Integrare cu HR și control acces'],
  },
  {
    title: 'Aeroporturi',
    image: '/img/aeropturi.png',
    icon: <SlPlane className="text-white" style={{ fontSize: '1.4rem' }} />,
    description: 'Sisteme performante pentru fluxuri mari de vehicule și securitate maximă.',
    features: ['Recunoaștere ANPR de înaltă precizie', 'Zone de parcare multiple', 'Statistici și monitorizare în timp real', 'Integrare cu sistemele aeroportuare'],
  },
  {
    title: 'Spitale',
    image: '/img/spitale.png',
    icon: <FaRegHospital className="text-white" style={{ fontSize: '1.4rem' }} />,
    description: 'Acces controlat pentru personal, pacienți și vizitatori, cu tarifare personalizată.',
    features: ['Acces pe bază de card / QR', 'Tarife diferențiate', 'Locuri dedicate personalului', 'Rapoarte și evidență detaliată'],
  },
  {
    title: 'Hoteluri',
    image: '/img/hoteluri.png',
    icon: <BiHotel className="text-white" style={{ fontSize: '1.4rem' }} />,
    description: 'Confort pentru oaspeți și control total asupra parcării.',
    features: ['Rezervare loc de parcare', 'Acces rapid pentru oaspeți', 'Integrare cu sistemul hotelului', 'Tarifare pe durată ședere'],
  },
];

const whyFeatures = [
  { title: 'Soluții personalizate',     description: 'Adaptăm sistemul la nevoile fiecărui proiect.',                      icon: <LuSettings2 className="w-5 h-5 text-green-600" /> },
  { title: 'Tehnologie avansată',       description: 'ANPR, QR, NFC și metode moderne de plată.',                           icon: <LuZap className="w-5 h-5 text-green-600" /> },
  { title: 'Suport dedicat',            description: 'Echipă locală, suport rapid și mentenanță eficientă.',                icon: <LuHeadphones className="w-5 h-5 text-green-600" /> },
  { title: 'Scalabilitate',             description: 'Sistemul crește odată cu nevoile afacerii tale.',                      icon: <LuTrendingUp className="w-5 h-5 text-green-600" /> },
  { title: 'Fiabilitate și securitate', description: 'Echipamente robuste și software stabil și sigur.',                    icon: <LuShieldCheck className="w-5 h-5 text-green-600" /> },
  { title: 'Produs autohton',           description: 'Dezvoltat și produs în Republica Moldova.',                           icon: <LuMapPin className="w-5 h-5 text-green-600" /> },
];

export default function SolutiiPage() {
  return (
    <main>
      {/* Navbar + Logo */}
      <div className="relative">
        <Navbar />
        <Link href="/" className="absolute top-0 left-20 z-50 h-20 flex items-center">
          <Image src="/img/logo.png" alt="RTi Parking Logo" width={210} height={80} priority className="object-contain" />
        </Link>

        {/* ── Hero ── */}
        <section className="relative w-full min-h-[75vh] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image src="/img/home.png" alt="" fill className="object-cover object-center" quality={95} priority />
          </div>
          {/* Left-only dark fog — only behind text */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-transparent pointer-events-none" style={{ width: '70%' }} />

          <div className="relative z-10 w-full px-6 lg:px-10 py-28 pt-40">
            <div className="max-w-4xl">
              <h1 data-reveal className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                Soluții pentru fiecare tip<br />de parcare
              </h1>
              <div data-reveal data-reveal-delay="150" className="w-12 h-1 bg-green-400 mb-6 rounded-full" />
              <p data-reveal data-reveal-delay="280" className="text-white/85 text-xl leading-relaxed max-w-lg">
                RParking oferă soluții complete și flexibile pentru
                orice tip de parcare: de la spații rezidențiale până la
                parcări municipale sau aeroporturi.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Domenii de aplicare ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Domenii de aplicare</h2>
            <div className="w-10 h-0.5 bg-green-500 mx-auto mb-4" />
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Soluțiile noastre sunt adaptate cerințelor specifice fiecărui domeniu de activitate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((d, idx) => (
              <div key={d.title} data-reveal data-reveal-delay={String(idx * 100)} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
                {/* Image with icon badge */}
                <div className="relative h-48 overflow-hidden">
                  <Image src={d.image} alt={d.title} fill quality={95} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                    {d.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{d.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{d.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {d.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <LuCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact" className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm hover:gap-2 transition-all">
                    Vezi detalii <LuArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── De ce să alegi RParking ── */}
      <section className="py-16" style={{ backgroundColor: '#f0f4ea' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: features */}
            <div data-reveal="fade-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                De ce să alegi <span className="text-green-600">R</span>Parking?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyFeatures.map((f, idx) => (
                  <div key={f.title} data-reveal data-reveal-delay={String(100 + idx * 80)} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm mb-0.5">{f.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: video */}
            <div data-reveal="fade-right" className="relative rounded-2xl overflow-hidden shadow-lg aspect-video w-full">
              <video
                src="/img/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Green bottom card */}
              <div className="absolute bottom-0 left-0 right-0 bg-green-800/90 backdrop-blur-sm px-5 py-4">
                <div className="flex items-start gap-3">
                  <LiaLeafSolid className="w-8 h-8 text-green-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Tehnologie verde pentru parcări inteligente</p>
                    <p className="text-green-200 text-xs mt-0.5 leading-snug">
                      Soluții eficiente energic, prietenoase cu mediul și construite pentru viitor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-green-800 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div data-reveal="fade-left">
            <h2 className="text-2xl font-bold text-white mb-1">Aveți nevoie de o soluție personalizată?</h2>
            <p className="text-green-200 text-sm">
              Discutăm despre proiectul dumneavoastră și găsim împreună cea mai bună soluție.
            </p>
          </div>
          <Link
            data-reveal="fade-right"
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold px-8 py-3 rounded-md transition-all duration-200 text-sm whitespace-nowrap"
          >
            Contactează-ne <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
