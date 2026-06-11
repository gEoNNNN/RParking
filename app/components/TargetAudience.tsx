import { useTranslations } from 'next-intl';
import { CiShop } from 'react-icons/ci';
import { IoBusinessOutline } from 'react-icons/io5';
import { PiBuildingApartment } from 'react-icons/pi';
import { SlPlane } from 'react-icons/sl';
import { FaRegHospital } from 'react-icons/fa';
import { BiHotel } from 'react-icons/bi';
import { LuCircleParking } from 'react-icons/lu';
import { BsBank } from 'react-icons/bs';

const audiences = [
  { key: 'mall',         icon: <CiShop style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { key: 'business',     icon: <IoBusinessOutline style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { key: 'residential',  icon: <PiBuildingApartment style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { key: 'airports',     icon: <SlPlane style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { key: 'hospitals',    icon: <FaRegHospital style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { key: 'hotels',       icon: <BiHotel style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { key: 'municipal',    icon: <LuCircleParking style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { key: 'institutions', icon: <BsBank style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
];

export default function TargetAudience() {
  const t = useTranslations('TargetAudience');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal="fade" className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            {t('titlePrefix')}<span className="text-green-600">R</span>Parking{t('titleSuffix')}
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
          {audiences.map((a) => (
            <div key={a.key} className="flex flex-col items-center gap-3 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-green-100 hover:shadow-lg hover:shadow-green-200/50 cursor-pointer">
                {a.icon}
              </div>
              <span className="text-gray-700 text-sm font-bold leading-tight">{t(a.key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
