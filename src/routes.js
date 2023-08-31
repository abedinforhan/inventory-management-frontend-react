import AddBrand from './views/Brand/CreateBrand/CreateBrand'
import BrandList from './views/Brand/BrandList/BrandList'
import CategoryList from './views/Category/CategoryList/CategoryList'
import AddProductForm from './views/Product/CreateProduct/CreateProduct'
import ProductList from './views/Product/ProductList/ProductList'
import PurchaseList from './views/Purchase/PurchaseList/PurchaseList'
import AddSell from './views/Sell/CreateSell/AddSell'
import SellList from './views/Sell/SellList/SellList'
import SellHistories from './views/Sell/SellHistories/SellHistories'
import SupplierList from './views/Supplier/SupplierList/SupplierList'
import CreateSupplier from './views/Supplier/CreateSupplier/CreateSupplier'
import EditSupplier from './views/Supplier/EditSupplier/EditSupplier'
import CreateCategory from './views/Category/CreateCategory/CreateCategory'
import UnitList from './views/Unit/UnitList/UnitList'
import CreateUnit from './views/Unit/CreateUnit/CreateUnit'
import EditProduct from './views/Product/EditProduct/EditProduct'
import CreatePurchase from './views/Purchase/CreatePurchase/CreatePurchase'
import PurchaseDetails from './views/Purchase/PurchaseDetails.js/PurchaseDetails'
import CustomerList from './views/Customer/CustomerList/CustomerList'
import CreateCustomer from './views/Customer/CreateCustomer/CreateCustomer'

const routes = [
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
  { path: '/sells', name: 'Sell', element: AddSell, exact: true },
  { path: '/sells/add-sell', name: 'Add Sell', element: AddSell },
  { path: '/sells/sell-list', name: 'Sell List', element: SellList },
  { path: '/sells/sell-histories', name: 'Sell Histories', element: SellHistories },
  { path: '/customers', name: 'Customer List', element: CustomerList },
  { path: '/customers/create-customer', name: 'Create Customer', element: CreateCustomer },
  { path: '/customers/customer-list', name: 'Customer List', element: CustomerList },
  { path: '/suppliers/edit-supplier/:supplierId', name: 'Edit Supplier', element: EditSupplier },
  { path: '/suppliers', name: 'Supplier List', element: SupplierList },
  { path: '/suppliers/create-supplier', name: 'Create Supplier', element: CreateSupplier },
  { path: '/suppliers/supplier-list', name: 'Supplier List', element: SupplierList },
  { path: '/suppliers/edit-supplier/:supplierId', name: 'Edit Supplier', element: EditSupplier },
]

export default routes
