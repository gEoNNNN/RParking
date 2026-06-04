import { CiShop } from 'react-icons/ci';
import { IoBusinessOutline } from 'react-icons/io5';
import { PiBuildingApartment } from 'react-icons/pi';
import { SlPlane } from 'react-icons/sl';
import { FaRegHospital } from 'react-icons/fa';
import { BiHotel } from 'react-icons/bi';
import { LuCircleParking } from 'react-icons/lu';
import { BsBank } from 'react-icons/bs';

const audiences = [
  { title: 'Centre comerciale',    icon: <CiShop style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { title: 'Business centre',      icon: <IoBusinessOutline style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { title: 'Complexe rezidentiale',icon: <PiBuildingApartment style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { title: 'Aeroporturi',          icon: <SlPlane style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { title: 'Spitale',              icon: <FaRegHospital style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { title: 'Hoteluri',             icon: <BiHotel style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { title: 'Parcări municipale',   icon: <LuCircleParking style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
  { title: 'Instituții publice',   icon: <BsBank style={{ fontSize: '2.5rem' }} className="text-green-600" /> },
];

export default function TargetAudience() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-reveal="fade" className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Pentru cine este <span className="text-green-600">R</span>Parking
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
          {audiences.map((a) => (
            <div key={a.title} className="flex flex-col items-center gap-3 text-center">
              <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-green-100 hover:shadow-lg hover:shadow-green-200/50 cursor-pointer">
                {a.icon}
              </div>
              <span className="text-gray-700 text-sm font-bold leading-tight">{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
