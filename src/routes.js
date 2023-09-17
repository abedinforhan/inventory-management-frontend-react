import CreateAdmin from './views/Account/CreateAdmin'
import CreateManger from './views/Account/CreateManager'
import BrandList from './views/Brand/BrandList/BrandList'
import AddBrand from './views/Brand/CreateBrand/CreateBrand'
import CategoryList from './views/Category/CategoryList/CategoryList'
import CreateCategory from './views/Category/CreateCategory/CreateCategory'
import CreateCustomer from './views/Customer/CreateCustomer/CreateCustomer'
import CustomerList from './views/Customer/CustomerList/CustomerList'
import EditCustomer from './views/Customer/EditCustomer/EditCustomer'
import AddProductForm from './views/Product/CreateProduct/CreateProduct'
import EditProduct from './views/Product/EditProduct/EditProduct'
import ProductList from './views/Product/ProductList/ProductList'
import EditProfile from './views/Profile/EditProfie'
import Profile from './views/Profile/Profile'
import CreatePurchase from './views/Purchase/CreatePurchase/CreatePurchase'
import PurchaseDetails from './views/Purchase/PurchaseDetails.js/PurchaseDetails'
import PurchaseList from './views/Purchase/PurchaseList/PurchaseList'
import CreateSell from './views/Sell/CreateSell/CreateSell'
import SellDetails from './views/Sell/SellDetails/SellDetails'
import SellList from './views/Sell/SellList/SellList'
import CreateSupplier from './views/Supplier/CreateSupplier/CreateSupplier'
import EditSupplier from './views/Supplier/EditSupplier/EditSupplier'
import SupplierList from './views/Supplier/SupplierList/SupplierList'
import CreateUnit from './views/Unit/CreateUnit/CreateUnit'
import UnitList from './views/Unit/UnitList/UnitList'
import Dashboard from './views/dashboard/Dashboard'

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: 'users/profile', name: 'Profile', element: Profile },
  { path: 'users/edit-profile', name: 'Edit Profile', element: EditProfile },
  { path: 'users/create-admin', name: 'Create Admin', element: CreateAdmin },
  { path: 'users/create-manager', name: 'Create Manager', element: CreateManger },
  { path: '/', exact: true, name: 'Home' },
  //Category
  { path: '/category', name: 'Category', element: CategoryList, exact: true },
  { path: '/categories/category-list', name: 'Category', element: CategoryList, exact: true },
  { path: '/category/create-category', name: 'CreateCategory', element: CreateCategory },
  //Brand
  { path: '/brands', name: 'Brand', element: BrandList, exact: true },
  { path: '/brands/create-brand', name: 'CreateBrand', element: AddBrand },
  { path: '/brands/brand-list', name: 'BrandList', element: BrandList },
  //Unit
  { path: '/units', name: 'Unit', element: UnitList, exact: true },
  { path: '/units/create-unit', name: 'CreateUnit', element: CreateUnit },
  { path: '/units/unit-list', name: 'UnitList', element: UnitList },
  //Product
  { path: '/products', name: 'Product', element: ProductList, exact: true },
  { path: '/products/create-product', name: 'Product', element: AddProductForm, exact: true },
  { path: '/products/product-list', name: 'Product List', element: ProductList },
  { path: '/products/edit-product/:productId', name: 'Edit Product', element: EditProduct },

  //Purchase
  { path: '/purchases', name: 'Purchase', element: PurchaseList, exact: true },
  { path: '/purchases/create-purchase', name: 'Add Purchase', element: CreatePurchase },
  { path: '/purchases/purchase-list', name: 'Purchase List', element: PurchaseList },
  {
    path: '/purchases/:purchaseId',
    name: 'Purchase Details',
    element: PurchaseDetails,
  },
  { path: '/sells', name: 'Sell', element: SellList, exact: true },
  { path: '/sells/create-sell', name: 'Create Sell', element: CreateSell },
  { path: '/sells/sell-list', name: 'Sell List', element: SellList },
  {
    path: '/sales/:sellId',
    name: 'Sell Details',
    element: SellDetails,
  },
  { path: '/customers', name: 'Customer List', element: CustomerList },
  { path: '/customers/create-customer', name: 'Create Customer', element: CreateCustomer },
  { path: '/customers/customer-list', name: 'Customer List', element: CustomerList },
  {
    path: '/customers/edit-customer/:customerId',
    name: 'Edit customer',
    element: EditCustomer,
  },
  { path: '/suppliers', name: 'Supplier List', element: SupplierList },
  { path: '/suppliers/create-supplier', name: 'Create Supplier', element: CreateSupplier },
  { path: '/suppliers/supplier-list', name: 'Supplier List', element: SupplierList },
  { path: '/suppliers/edit-supplier/:supplierId', name: 'Edit Supplier', element: EditSupplier },
]

export default routes
