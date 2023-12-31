import {
  cilCalendarCheck,
  cilCart,
  cilCursor,
  cilNotes,
  cilPeople,
  cilSchool,
  cilTags,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _ManagerNav = [
  {
    component: CNavTitle,
    name: 'Inventory',
  },
  {
    component: CNavGroup,
    name: 'Category',
    to: '/category',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
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
    name: 'Unit',
    to: '/units',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Unit',
        to: '/units/create-unit',
      },
      {
        component: CNavItem,
        name: 'Unit List',
        to: '/units/unit-list',
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
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Purchase',
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
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Sell',
        to: '/sells/create-sell',
      },
      {
        component: CNavItem,
        name: 'Sell List',
        to: '/sells/sell-list',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Customer',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create Customer',
        to: '/customers/create-customer',
      },
      {
        component: CNavItem,
        name: 'Customer List',
        to: '/customers/customer-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Supplier',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
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
]

export default _ManagerNav
