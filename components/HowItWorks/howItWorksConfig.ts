import { QuoteIcon, CleanerIcon, QualityIcon } from './TimelineIcons'
import { ComponentType } from 'react'

export interface PricingCardData {
  id: number
  smallText: string
  largeText: string
  gradient: string
  isWide: boolean
  clipPath: string
  height: string // 🆕 Dynamic height for each card
}

export interface TimelineStepData {
  id: number
  step: number
  title: string
  description: string
  position: 'left' | 'right'
  icon: ComponentType<{ className?: string }>
}

export const pricingCardsData: PricingCardData[] = [
   {
    id: 1,
    smallText: 'Weekly Services',
    largeText: '30% Off',
    gradient: 'to right',
    isWide: false,
    clipPath: 'polygon(32.2492676px 0px, calc(100% - 29.883191px) 0.16707739px, calc(100% - 29.883191px) 0.16707739px, calc(100% - 24.96109729px) 0.87537044px, calc(100% - 20.31945472px) 2.29591631px, calc(100% - 16.01424199px) 4.36886114px, calc(100% - 12.1014378px) 7.03435112px, calc(100% - 8.63702087px) 10.23253242px, calc(100% - 5.67696992px) 13.90355119px, calc(100% - 3.27726365px) 17.98755362px, calc(100% - 1.49388076px) 22.42468587px, calc(100% - 0.38279998px) 27.1550941px, calc(100% - 5.68434189E-14px) 32.1189245px, calc(100% - 0px) calc(100% - 32.02092px), calc(100% - 0px) calc(100% - 32.02092px), calc(100% - 0.41860061px) calc(100% - 26.8269604px), calc(100% - 1.63050344px) calc(100% - 21.89983258px), calc(100% - 3.56985995px) calc(100% - 17.30546357px), calc(100% - 6.1708216px) calc(100% - 13.10978045px), calc(100% - 9.36753988px) calc(100% - 9.37871025px), calc(100% - 13.09416624px) calc(100% - 6.17818003px), calc(100% - 17.28485217px) calc(100% - 3.57411685px), calc(100% - 21.87374912px) calc(100% - 1.63244774px), calc(100% - 26.79500858px) calc(100% - 0.41909978px), calc(100% - 31.982782px) calc(100% - 5.68434189E-14px), 31.9827822px calc(100% - 14px), 31.9827822px calc(100% - 14px), 26.79500879px calc(100% - 14.41909978px), 21.87374934px calc(100% - 15.63244774px), 17.28485237px calc(100% - 17.57411685px), 13.09416641px calc(100% - 20.17818003px), 9.36754001px calc(100% - 23.37871025px), 6.1708217px calc(100% - 27.10978045px), 3.56986001px calc(100% - 31.30546357px), 1.63050347px calc(100% - 35.89983258px), 0.41860062px calc(100% - 40.8269604px), 5.29492535E-31px calc(100% - 46.02092px), 0px 32.0209204px, 0px 32.0209204px, 0.41860062px 26.82696079px, 1.63050347px 21.89983293px, 3.56986001px 17.30546389px, 6.1708217px 13.10978071px, 9.36754001px 9.37871045px, 13.09416641px 6.17818017px, 17.28485237px 3.57411693px, 21.87374934px 1.63244779px, 26.79500879px 0.41909979px, 31.9827822px 5.30123935E-31px, 31.9827822px 0px, 32.11152455px 0px, 32.2175794px 0px, 32.30094672px 0px, 32.36162654px 0px, 32.39961884px 0px, 32.41492362px 0px, 32.40754089px 0px, 32.37747064px 0px, 32.32471288px 0px, 32.2492676px 0px)', // 🆕 Arrow pointing down
  height: '150px',
  },
  {
    id: 2,
    smallText: 'Big Savings On',
    largeText: 'Recurring Services',
    gradient: 'to bottom',
    isWide: true,
    clipPath: 'polygon(26px 0px, calc(100% - 26px) 0px, calc(100% - 26px) 0px, calc(100% - 21.78266507px) 0.34029611px, calc(100% - 17.78198925px) 1.32549726px, calc(100% - 14.05150328px) 2.90207274px, calc(100% - 10.6447379px) 5.01649179px, calc(100% - 7.61522387px) 7.61522369px, calc(100% - 5.01649194px) 10.64473769px, calc(100% - 2.90207283px) 14.05150306px, calc(100% - 1.32549731px) 17.78198906px, calc(100% - 0.34029612px) 21.78266495px, calc(100% - 5.68434189E-14px) 26px, calc(100% - 0px) calc(100% - 41.664951px), calc(100% - 0px) calc(100% - 41.664951px), calc(100% - 0.28314835px) calc(100% - 37.52769571px), calc(100% - 1.12230525px) calc(100% - 33.73023642px), calc(100% - 2.50203846px) calc(100% - 30.27056944px), calc(100% - 4.40691574px) calc(100% - 27.14669103px), calc(100% - 6.82150487px) calc(100% - 24.3565975px), calc(100% - 9.73037362px) calc(100% - 21.89828513px), calc(100% - 13.11808973px) calc(100% - 19.7697502px), calc(100% - 16.96922099px) calc(100% - 17.96898902px), calc(100% - 21.26833516px) calc(100% - 16.49399785px), calc(100% - 26px) calc(100% - 15.342773px), calc(100% - 26px) calc(100% - 15.342773px), calc(100% - 26.30946044px) calc(100% - 15.28144496px), calc(100% - 26.60546875px) calc(100% - 15.22412083px), calc(100% - 26.88802493px) calc(100% - 15.17080061px), calc(100% - 27.15712898px) calc(100% - 15.1214843px), calc(100% - 27.41278087px) calc(100% - 15.07617188px), calc(100% - 27.65498062px) calc(100% - 15.03486334px), calc(100% - 27.88372822px) calc(100% - 14.9975587px), calc(100% - 28.09902365px) calc(100% - 14.96425793px), calc(100% - 28.30086691px) calc(100% - 14.93496103px), calc(100% - 28.489258px) calc(100% - 14.909668px), calc(50% - 0px) calc(100% - 0.664951px), 23.470978px calc(100% - 15.664951px), 23.470978px calc(100% - 15.664951px), 19.57789667px calc(100% - 16.34794967px), 15.91648486px calc(100% - 17.58424402px), 12.52869848px calc(100% - 19.3260983px), 9.45649339px calc(100% - 21.52577671px), 6.7418255px calc(100% - 24.1355435px), 4.42665069px calc(100% - 27.10766289px), 2.55292484px calc(100% - 30.3943991px), 1.16260386px calc(100% - 33.94801638px), 0.29764361px calc(100% - 37.72077893px), 3.75493181E-31px calc(100% - 41.664951px), 0px 26px, 0px 26px, 0.34029612px 21.78266495px, 1.32549731px 17.78198906px, 2.90207283px 14.05150306px, 5.01649194px 10.64473769px, 7.61522387px 7.61522369px, 10.6447379px 5.01649179px, 14.05150328px 2.90207274px, 17.78198925px 1.32549726px, 21.78266507px 0.34029611px, 26px 4.30444289E-31px)', // 🆕 Arrow pointing up (inverted)
   height: '160px',
  },
  {
    id: 3,
    smallText: 'Bi-Weekly Services',
    largeText: '25% Off',
    gradient: 'to left',
    isWide: false,
    clipPath: 'polygon(32.2492676px 0px, calc(100% - 29.883191px) 0.16707739px, calc(100% - 29.883191px) 0.16707739px, calc(100% - 24.96109729px) 0.87537044px, calc(100% - 20.31945472px) 2.29591631px, calc(100% - 16.01424199px) 4.36886114px, calc(100% - 12.1014378px) 7.03435112px, calc(100% - 8.63702087px) 10.23253242px, calc(100% - 5.67696992px) 13.90355119px, calc(100% - 3.27726365px) 17.98755362px, calc(100% - 1.49388076px) 22.42468587px, calc(100% - 0.38279998px) 27.1550941px, calc(100% - 5.68434189E-14px) 32.1189245px, calc(100% - 0px) calc(100% - 46.02092px), calc(100% - 0px) calc(100% - 46.02092px), calc(100% - 0.41860061px) calc(100% - 40.8269604px), calc(100% - 1.63050344px) calc(100% - 35.89983258px), calc(100% - 3.56985995px) calc(100% - 31.30546357px), calc(100% - 6.1708216px) calc(100% - 27.10978045px), calc(100% - 9.36753988px) calc(100% - 23.37871025px), calc(100% - 13.09416624px) calc(100% - 20.17818003px), calc(100% - 17.28485217px) calc(100% - 17.57411685px), calc(100% - 21.87374912px) calc(100% - 15.63244774px), calc(100% - 26.79500858px) calc(100% - 14.41909978px), calc(100% - 31.982782px) calc(100% - 14px), 31.9827822px calc(100% - 0px), 31.9827822px calc(100% - 0px), 26.79500879px calc(100% - 0.41909978px), 21.87374934px calc(100% - 1.63244774px), 17.28485237px calc(100% - 3.57411685px), 13.09416641px calc(100% - 6.17818003px), 9.36754001px calc(100% - 9.37871025px), 6.1708217px calc(100% - 13.10978045px), 3.56986001px calc(100% - 17.30546357px), 1.63050347px calc(100% - 21.89983258px), 0.41860062px calc(100% - 26.8269604px), 5.29492535E-31px calc(100% - 32.02092px), 0px 32.0209204px, 0px 32.0209204px, 0.41860062px 26.82696079px, 1.63050347px 21.89983293px, 3.56986001px 17.30546389px, 6.1708217px 13.10978071px, 9.36754001px 9.37871045px, 13.09416641px 6.17818017px, 17.28485237px 3.57411693px, 21.87374934px 1.63244779px, 26.79500879px 0.41909979px, 31.9827822px 5.30123935E-31px, 31.9827822px 0px, 32.11152455px 0px, 32.2175794px 0px, 32.30094672px 0px, 32.36162654px 0px, 32.39961884px 0px, 32.41492362px 0px, 32.40754089px 0px, 32.37747064px 0px, 32.32471288px 0px, 32.2492676px 0px)', // 🆕 Arrow pointing down (same as 1st)
   height: '150px',
  },
]

export const timelineStepsData: TimelineStepData[] = [
  {
    id: 1,
    step: 1,
    title: 'Fill In Quote',
    description: 'Secure your booking in minutes with a quick free quote.',
    position: 'right',
    icon: QuoteIcon,
  },
  {
    id: 2,
    step: 2,
    title: 'Cleaners Arrive',
    description: 'Relax while our expert team makes your space hygienic and pristine.',
    position: 'left',
    icon: CleanerIcon,
  },
  {
    id: 3,
    step: 3,
    title: 'Quality Check',
    description: 'We double check every spot to ensure we clean like no one else.',
    position: 'right',
    icon: QualityIcon,
  },
]