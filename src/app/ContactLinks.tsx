'use client';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useWindowSize } from '@/hooks.ts';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';

const SOCAIL_LINKS = [
  {
    name: 'Github',
    url: 'https://github.com/rejoanahmed',
    icon: GitHubIcon
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/rexcode_',
    icon: TwitterIcon
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/md-rejoan-ahmed-737621138/',
    icon: LinkedInIcon
  },
  {
    name: 'Email',
    url: 'mailto:rejoanahmed8@gmail.com',
    icon: EmailIcon
  }
];

type LINKTYPE = (typeof SOCAIL_LINKS)[number];

export default function ContactList({
  responsive = true
}: {
  responsive?: boolean;
}) {
  let mouseX = useMotionValue(Infinity);

  const { width: windowWidth } = useWindowSize();

  return (
    <div
      className={`realtive group flex ${
        responsive && 'rotate-90'
      } justify-center sm:rotate-0`}
    >
      <div className="absolute -left-28 -mt-3 hidden sm:block">
        <h3 className="text-rose-700/10 underline transition-colors duration-200 group-hover:text-rose-700/50">
          Contacts:
        </h3>
      </div>
      <motion.div
        onMouseMove={(e) => {
          const val = windowWidth > 640 ? e.pageX : e.pageY;
          mouseX.set(val);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`${
          responsive && 'absolute'
        } bottom-32 right-28 mx-auto flex h-14 w-60 items-center justify-center gap-4 rounded-2xl bg-pink-200/10 px-4 shadow shadow-pink-100 dark:bg-gray-700 dark:hover:bg-gray-800 sm:relative sm:bottom-0 sm:right-0 sm:items-end sm:pb-2`}
      >
        {SOCAIL_LINKS.map((l, i) => (
          <AppIcon mouseX={mouseX} key={i} link={l} responsive={responsive} />
        ))}
      </motion.div>
    </div>
  );
}

function AppIcon({
  mouseX,
  link,
  responsive = true
}: {
  mouseX: MotionValue;
  link: LINKTYPE;
  responsive?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
      y: 0,
      height: 0
    };
    // check if window is defined
    if (typeof window === 'undefined') return val - bounds.x - bounds.width / 2;

    const windowWidth = window.innerWidth;
    if (windowWidth <= 640) {
      return val - bounds.y - bounds.height / 2;
    }

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-100, 0, 100], [40, 70, 40]);

  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={`aspect-square h-10 w-10 shrink-0 ${
        responsive && '-rotate-90'
      } rounded-full p-1 text-black transition-colors duration-100 hover:text-pink-500 hover:shadow-xl dark:bg-slate-400 dark:hover:text-pink-200 sm:rotate-0`}
    >
      <Link
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-inherit"
      >
        <Tooltip title={link.name}>
          <IconButton
            sx={{
              width: '100%',
              height: '100%',
              color: 'inherit'
            }}
          >
            <link.icon className="text-inherit" />
          </IconButton>
        </Tooltip>
      </Link>
    </motion.div>
  );
}
