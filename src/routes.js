import React from 'react';

//router mới 
// ====Quản lý tài khoản
const IndexAdmin = React.lazy(() => import('./views/Admins/Index'));
const CreateAdmin = React.lazy(() => import('./views/Admins/Create'));
const EditAdmin = React.lazy(() => import('./views/Admins/Edit'));
// // ====Kết thúc quản lý tài khoản
// ====Quản lý nhóm phân quyền
const IndexRole = React.lazy(() => import('./views/Role/Index'));
const CreateRole = React.lazy(() => import('./views/Role/Create'));
const EditRole = React.lazy(() => import('./views/Role/Edit'));
// // ====Kết thúc quản lý nhóm phân quyền
// ====Quản lý tài khoản
const IndexPermission = React.lazy(() => import('./views/Permission/Index'));
const CreatePermission = React.lazy(() => import('./views/Permission/Create'));
const EditPermission = React.lazy(() => import('./views/Permission/Edit'));
// // ====Kết thúc quản lý tài khoản
// ====Quản lý sản phẩm
const IndexProduct = React.lazy(() => import('./views/Product/Index'));
const CreateProduct = React.lazy(() => import('./views/Product/Create'));
const EditProduct = React.lazy(() => import('./views/Product/Edit'));
// // ====Kết thúc quản lý sản phẩm
// ====Quản lý danh mục sản phẩm
const IndexCatProduct = React.lazy(() => import('./views/CatProduct/Index'));
const CreateCatProduct = React.lazy(() => import('./views/CatProduct/Create'));
const EditCatProduct = React.lazy(() => import('./views/CatProduct/Edit'));
// ====Kết thúc quản lý danh mục sản phẩm
// ====Quản lý danh mục sản phẩm
const IndexStyleProduct = React.lazy(() => import('./views/Styleproduct/Index'));
const CreateStyleProduct = React.lazy(() => import('./views/Styleproduct/Create'));
const EditStyleProduct = React.lazy(() => import('./views/Styleproduct/Edit'));
// ====Kết thúc quản lý danh mục sản phẩm
// ====Quản lý danh mục sản phẩm
const IndexSupplier = React.lazy(() => import('./views/Supplier/Index'));
const CreateSupplier = React.lazy(() => import('./views/Supplier/Create'));
const EditSupplier = React.lazy(() => import('./views/Supplier/Edit'));
// ====Kết thúc quản lý danh mục sản phẩm
// ====Quản lý menu
const IndexMenu = React.lazy(() => import('./views/Menu/Index'));
const CreateMenu = React.lazy(() => import('./views/Menu/Create'));
const EditMenu = React.lazy(() => import('./views/Menu/Edit'));
// ====Kết thúc quản lý menu
// ====== Cấu hình 
const Setting = React.lazy(() => import('./views/Setting/Setting'));
// Ket thuc router
const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  //Router mới
  //====== Quản lý tài khoản
  { path: '/admin/index', name: 'Danh sách tài khoản', component: IndexAdmin },
  { path: '/admin/create', name: 'Thêm tài khoản', component: CreateAdmin },
  { path: '/admin/edit/:id', name: 'Sửa tài khoản', component: EditAdmin },
  // ===== Kết thúc quản lý tài khoản
  //====== Quản lý quyền hạn
  { path: '/role/index', name: 'Danh sách vai trò', component: IndexRole },
  { path: '/role/create', name: 'Thêm vai trò', component: CreateRole },
  { path: '/role/edit/:id', name: 'Sửa vai trò', component: EditRole },
  // ===== Kết thúc quản lý quyền hạn
  //====== Quản lý quyền hạn
  { path: '/permission/index', name: 'Danh sách quyền hạn', component: IndexPermission },
  { path: '/permission/create', name: 'Thêm quyền hạn', component: CreatePermission },
  { path: '/permission/edit/:id', name: 'Sửa quyền hạn', component: EditPermission },
  // ===== Kết thúc quản lý quyền hạn
  //====== Quản lý sản phẩm
  { path: '/product/index', name: 'Danh sách sản phẩm', component: IndexProduct },
  { path: '/product/create', name: 'Thêm sản phẩm', component: CreateProduct },
  { path: '/product/edit/:id', name: 'Sửa sản phẩm', component: EditProduct },
  // ===== Kết thúc quản lý sản phẩm
  //====== Quản lý danh mục sản phẩm
  { path: '/catproduct/index', name: 'Danh mục sản phẩm', component: IndexCatProduct },
  { path: '/catproduct/create', name: 'Thêm danh mục', component: CreateCatProduct },
  { path: '/catproduct/edit/:id', name: 'Sửa danh mục', component: EditCatProduct },
  // ===== Kết thúc quản lý danh mục sản phẩm
    //====== Quản lý danh mục sản phẩm
    { path: '/styleproduct/index', name: 'Loại sản phẩm', component: IndexStyleProduct },
    { path: '/styleproduct/create', name: 'Thêm loại sản phẩm', component: CreateStyleProduct },
    { path: '/styleproduct/edit/:id', name: 'Sửa loại sản phẩm', component: EditStyleProduct },
    // ===== Kết thúc quản lý danh mục sản phẩm
  //====== Quản lý nhà cung cấp
  { path: '/supplier/index', name: 'Nhà cung cấp', component: IndexSupplier },
  { path: '/supplier/create', name: 'Thêm nhà cung cấp', component: CreateSupplier },
  { path: '/supplier/edit/:id', name: 'Sửa nhà cung cấp', component: EditSupplier },
  // ===== Kết thúc quản lý nhà cung cấp
  //====== Quản lý nhà menu
  { path: '/menu/index', name: 'Danh sách menu', component: IndexMenu },
  { path: '/menu/create', name: 'Thêm menu', component: CreateMenu },
  { path: '/menu/edit/:id', name: 'Sửa menu', component: EditMenu },
  // ===== Kết thúc quản lý menu
  // ===== Cấu hình hệ thống ==== //
  { path: '/setting/:lang', name: 'Cấu hình chung', component: Setting },
  //End Router
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
