import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilNotes, cilPuzzle, cilStar } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _CustomerNav = [
  {
    component: CNavTitle,
    name: 'Inventory',
  },
  {
    component: CNavGroup,
    name: 'Category',
    to: '/category',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Category',
        to: '/category/create-category',
      },
      {
        component: CNavItem,
        name: 'Category List',
        to: '/categories/category-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Brand',
    to: '/brands',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Brand',
        to: '/brands/create-brand',
      },
      {
        component: CNavItem,
        name: 'Brand List',
        to: '/brands/brand-list',
      },
    ],
  },
]

export default _CustomerNav
