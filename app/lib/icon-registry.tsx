// Registry of React-Icons components addressable by string name, so JSON content
// files (edited from the admin panel) can reference icons without storing JSX.
// Used by ShopCatalog, products page, solutii page and the admin icon picker.
import type { IconType } from 'react-icons';
import {
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard, LuShieldCheck, LuZap,
  LuList, LuRadar, LuSettings2, LuPuzzle, LuCheck, LuHeadphones, LuTruck,
  LuBadgeCheck, LuTrendingUp, LuMapPin, LuCar, LuCamera, LuTicket, LuBanknote,
  LuCoins, LuDoorOpen, LuWifi, LuDatabase, LuServer, LuMonitor, LuQrCode,
  LuBuilding, LuLock, LuKey, LuPhone, LuGlobe, LuWrench, LuBoxes,
} from 'react-icons/lu';
import { TbBarrierBlock } from 'react-icons/tb';
import { PiBuildingApartment } from 'react-icons/pi';
import { CiShop } from 'react-icons/ci';
import { IoBusinessOutline } from 'react-icons/io5';
import { SlPlane } from 'react-icons/sl';
import { FaRegHospital } from 'react-icons/fa';
import { BiHotel } from 'react-icons/bi';

const REGISTRY: Record<string, IconType> = {
  LuLogIn, LuLogOut, LuCreditCard, LuLayoutDashboard, LuShieldCheck, LuZap,
  LuList, LuRadar, LuSettings2, LuPuzzle, LuCheck, LuHeadphones, LuTruck,
  LuBadgeCheck, LuTrendingUp, LuMapPin, LuCar, LuCamera, LuTicket, LuBanknote,
  LuCoins, LuDoorOpen, LuWifi, LuDatabase, LuServer, LuMonitor, LuQrCode,
  LuBuilding, LuLock, LuKey, LuPhone, LuGlobe, LuWrench, LuBoxes,
  TbBarrierBlock, PiBuildingApartment, CiShop, IoBusinessOutline, SlPlane,
  FaRegHospital, BiHotel,
};

export const ICON_NAMES = Object.keys(REGISTRY).sort();

export function Icon({
  name,
  className,
  style,
}: {
  name?: string | null;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Cmp = (name && REGISTRY[name]) || LuBoxes;
  return <Cmp className={className} style={style} />;
}
