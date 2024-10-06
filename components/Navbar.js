"use client"

import { useState } from 'react';
import { AppShell as MantineAppShell, Burger, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { IconScissors, IconPuzzle, IconMicrophone, IconSearch, IconCut, IconLink, IconVinyl, IconMenu2 } from '@tabler/icons-react';

const navItems = [
  { name: 'Remover', icon: IconScissors, link: '/remover' },
  { name: 'Splitter', icon: IconPuzzle, link: '/splitter' },
  { name: 'Pitcher', icon: IconMicrophone, link: '/pitcher' },
  { name: 'Key BPM Finder', icon: IconSearch, link: '/key-bpm-finder' },
  { name: 'Cutter', icon: IconCut, link: '/cutter' },
  { name: 'Joiner', icon: IconLink, link: '/joiner' },
  { name: 'Recorder', icon: IconVinyl, link: '/recorder' },
  { name: 'Karaoke', icon: IconMicrophone, link: '/karaoke' },
];

export default function AppShell({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <ScrollArea>
          {navItems.map((item) => (
            <Link
              href={item.link}
              key={item.name}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '10px' }}
            >
              <Group>
                <item.icon size="1.2rem" />
                <span>{item.name}</span>
              </Group>
            </Link>
          ))}
        </ScrollArea>
        <Link href="/support" style={{ textDecoration: 'none', color: 'inherit', position: 'absolute', bottom: '20px', left: '20px' }}>
          <Group>
            <IconMenu2 size="1.2rem" />
            <span>Support</span>
          </Group>
        </Link>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}