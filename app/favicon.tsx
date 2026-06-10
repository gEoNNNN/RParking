import Image from 'next/image';

export default function Favicon() {
  return (
    <Image
      src="/img/logo.png"
      alt="RParking Logo"
      width={32}
      height={32}
    />
  );
}
