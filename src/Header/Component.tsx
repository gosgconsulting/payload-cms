import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  // FIXED: Skip database query during build
  if (process.env.NEXT_BUILD === 'true') {
    // Return a minimal header during build
    const emptyHeaderData: Header = {
      id: '',
      navItems: [],
      updatedAt: '',
      createdAt: '',
    }
    return <HeaderClient data={emptyHeaderData} />
  }

  try {
    const headerData: Header = await getCachedGlobal('header', 1)()
    return <HeaderClient data={headerData} />
  } catch (error) {
    console.warn('Could not fetch header data:', error)
    // Fallback to empty header data
    const emptyHeaderData: Header = {
      id: '',
      navItems: [],
      updatedAt: '',
      createdAt: '',
    }
    return <HeaderClient data={emptyHeaderData} />
  }
}
