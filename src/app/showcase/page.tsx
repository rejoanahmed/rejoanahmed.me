const itemData: {
  img?: string;
  comp?: React.FC;
  title: string;
  description: string;
  rows?: number;
  cols?: number;
  href?: string;
  featured?: boolean;
  tags?: (typeof Filters)[number][];
}[] = [
  {
    img: '/showcase/calmi.png',
    title: 'A therapeutic chatbot, built with GPT',
    description:
      'The Chatbot is programmed to help you with your mental health issues and it has custom system messages at every step of the way.',
    rows: 2,
    cols: 2,
    href: 'https://cbtchat.vercel.app/',
    featured: true,
    tags: ['Next JS', 'Firebase', 'OpenAI']
  },
  {
    comp: ExclusionTabs,
    title: 'Eclusion Tabs',
    description: 'Try clicking on the tabs and see what happens.',
    tags: ['Framer Motion']
  },
  {
    comp: MacDock,
    title: 'mimicing Mac OS Dock',
    description: 'Hover over the icons with a mouse to see the magic.',
    tags: ['Framer Motion']
  },
  {
    comp: HoverCard,
    title: 'Radial Background Hover Card',
    description: 'Hover over the card to see the magic.',
    tags: ['CSS']
  }
];

import { Filters } from '../constants';
import ExclusionTabs from './ExclusionTabs';
import FilterTab from './FilterTab';
import HoverCard from './HoverCard';
import MacDock from './Macdock';
import ShowCaseGrid from './ShowcaseGrid';

export default function page() {
  return (
    <div className="not-prose -mx-10 mb-10 overflow-hidden md:mx-0">
      <FilterTab />
      <ShowCaseGrid data={itemData} />
    </div>
  );
}
