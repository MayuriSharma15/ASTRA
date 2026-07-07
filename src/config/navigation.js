/**
 * navigation.js
 * ----------------------------------------------------------------------------
 * Single source of truth for primary sidebar navigation. Pure data — no JSX,
 * no logic. Sidebar.jsx maps over this and renders SidebarItem for each entry.
 *
 * When auth/roles land in a later phase, this is the file that changes
 * (e.g. filtering by `item.requiresRole`) — the Sidebar component itself
 * should never need to change to support that.
 */

import {
  LayoutDashboard,
  FileText,
  MessagesSquare,
  Map,
  FolderKanban,
  BarChart3,
  Settings,
  User,
} from 'lucide-react';

export const PRIMARY_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'resume',
    label: 'Resume',
    path: '/dashboard/resume',
    icon: FileText,
  },
  {
    id: 'interview',
    label: 'Interview Coach',
    path: '/dashboard/interview',
    icon: MessagesSquare,
  },
  {
    id: 'roadmap',
    label: 'Roadmap',
    path: '/dashboard/roadmap',
    icon: Map,
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/dashboard/projects',
    icon: FolderKanban,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/dashboard/analytics',
    icon: BarChart3,
  },
];

export const SECONDARY_NAV_ITEMS = [
  {
    id: 'profile',
    label: 'Profile',
    path: '/dashboard/profile',
    icon: User,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
  },
];