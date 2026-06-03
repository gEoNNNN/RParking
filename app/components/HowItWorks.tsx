import { Fragment } from 'react';
import { FaCarOn, FaArrowRightLong } from 'react-icons/fa6';
import { PiSecurityCamera } from 'react-icons/pi';
import { FaParking } from 'react-icons/fa';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdExitToApp } from 'react-icons/md';
import { BsGraphUpArrow } from 'react-icons/bs';

const steps = [
  { title: 'Intrare în parcare',             icon: <FaCarOn className="w-10 h-10 text-green-600" style={{ fontSize: '2.2rem' }} /> },
  { title: 'ANPR / QR / NFC Identificare',  icon: <PiSecurityCamera className="w-10 h-10 text-green-600" style={{ fontSize: '2.2rem' }} /> },
  { title: 'Timp petrecut în parcare',        icon: <FaParking className="w-10 h-10 text-green-600" style={{ fontSize: '2.2rem' }} /> },
  { title: 'Plată la Pay Point',              icon: <CiCreditCard1 className="w-10 h-10 text-green-600" style={{ fontSize: '2.2rem' }} /> },
  { title: 'Ieșire din parcare',              icon: <MdExitToApp className="w-10 h-10 text-green-600" style={{ fontSize: '2.2rem' }} /> },
  { title: 'Raport și analiză în BackOffice', icon: <BsGraphUpArrow className="w-10 h-10 text-green-600" style={{ fontSize: '2.2rem' }} /> },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Cum funcționează</h2>
          <div className="w-10 h-0.5 bg-green-500 mx-auto" />
        </div>

        {/* Steps row */}
        <div className="flex items-start w-full">
          {steps.map((step, idx) => (
            <Fragment key={step.title}>
              {/* Step block */}
              <div className="flex flex-col items-center gap-3 w-28 shrink-0">
                <div className="w-24 h-24 rounded-full bg-white shadow-md border border-green-100 flex items-center justify-center">
                  {step.icon}
                </div>
                <p className="text-gray-700 text-sm font-semibold text-center leading-tight">
                  {step.title}
                </p>
              </div>

              {/* Arrow centered between circles */}
              {idx < steps.length - 1 && (
                <div className="flex-1 flex justify-center mt-10">
                  <FaArrowRightLong className="text-green-700 shrink-0" style={{ fontSize: '1.5rem' }} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
