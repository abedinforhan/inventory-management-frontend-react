import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilNotes, cilPuzzle, cilStar } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
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
  {
    component: CNavGroup,
    name: 'Product',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Product',
        to: '/products/create-product',
      },
      {
        component: CNavItem,
        name: 'Product List',
        to: '/products/product-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Purchase',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Purchase',
        to: '/purchases/create-purchase',
      },
      {
        component: CNavItem,
        name: 'Purchase List',
        to: '/purchases/purchase-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sell',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Sell',
        to: '/sells/create-sell',
      },
      {
        component: CNavItem,
        name: 'Sell List',
        to: '/sells/sell-list',
      },
      {
        component: CNavItem,
        name: 'Sell Histories',
        to: '/sells/sell-histories',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Supplier',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Supplier',
        to: '/suppliers/create-supplier',
      },
      {
        component: CNavItem,
        name: 'Supplier List',
        to: '/suppliers/supplier-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
