import React, { ReactNode } from 'react'
import { HouseIcon, OfficeIcon, AirbnbIcon, YachtIcon } from './ServiceIcons'

export interface ServiceCardData {
  id: string | number
  title: string
  icon: ReactNode       // 🆕 Now accepts SVG components
  features: string[]
  link: string
}

export const servicesData: ServiceCardData[] = [
  {
    id: 1,
    title: 'Carpet Cleaning',
    icon: React.createElement(HouseIcon),
    features: [
      'Pre-event surface wipe-down',
      'Restroom stocking & sanitization',
      'Floor & carpet spot treatment',
      'Post-event breakdown & final sweep',
    ],
    link: '/services/house-cleaning',
  },
  {
    id: 2,
    title: 'Move-in-out Cleaning',
    icon: React.createElement(OfficeIcon),
    features: [
      'Deep kitchen clean',
      'Full bathroom scrub',
      'Baseboard, wall wipe-down',
      'Carpet steam clean & hard floor full polish',
    ],
    link: '/services/office-cleaning',
  },
  {
    id: 3,
    title: 'Commercial Cleaning',
    icon: React.createElement(YachtIcon),
    features: [
      'Workstation & desk sanitization',
      'Common areas & breakroom',
      'Restroom disinfection',
      'Trash removal, recycling management & floor care',
    ],
    link: '/services/yacht-cleaning',
  }, {
    id: 4,
    title: 'Residential Cleaning',
    icon: React.createElement(YachtIcon),
    features: [
      'Living room dusting',
      'Kitchen cleaning',
      'Bathroom scrubbing & sanitization',
      'Bedroom tidying, dusting & floor cleaning',
    ],
    link: '/services/yacht-cleaning',
  },
]