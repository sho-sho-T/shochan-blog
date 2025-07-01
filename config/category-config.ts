export const CATEGORY_CONFIG = {
  typescript: {
    icon: '/images/icons/typescript.png',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    displayName: 'TypeScript'
  },
  javascript: {
    icon: '/images/icons/javascript.png',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    displayName: 'JavaScript'
  },
  nextjs: {
    icon: '/images/icons/nextjs.png',
    bgColor: 'bg-transparent',
    textColor: 'text-white',
    displayName: 'NextJS'
  },
  ruby: {
    icon: '/images/icons/ruby.png',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    displayName: 'Ruby'
  },
  cursor: {
    icon: '/images/icons/cursor.png',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    displayName: 'Cursor'
  },
  css: {
    icon: undefined,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
    displayName: 'CSS'
  },
  react: {
    icon: undefined,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
    displayName: 'React'
  },
  'testing-library': {
    icon: undefined,
    bgColor: 'bg-red-100',
    textColor: 'text-red-500',
    displayName: 'Testing Library'
  },
  vitest: {
    icon: undefined,
    bgColor: 'bg-green-100',
    textColor: 'text-green-500',
    displayName: 'Vitest'
  },
  storybook: {
    icon: undefined,
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-500',
    displayName: 'Storybook'
  },
  wpi: {
    icon: undefined,
    bgColor: 'bg-green-100',
    textColor: 'text-green-500',
    displayName: 'WPI'
  }
} as const;

export type CategoryKey = keyof typeof CATEGORY_CONFIG;

export const DEFAULT_CATEGORY_CONFIG = {
  bgColor: 'bg-gray-100',
  textColor: 'text-gray-500',
  emoji: '📄'
} as const;

export function getCategoryConfig(category: string) {
  const normalizedKey = category.toLowerCase().replace(/\s+/g, '-') as CategoryKey;
  return CATEGORY_CONFIG[normalizedKey] || null;
}