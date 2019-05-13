export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Quản lý tài khoản',
      url: '/admin',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Danh sách tài khoản',
          url: '/admin/index',
          icon: 'icon-puzzle',
        },
        {
          name: 'Nhóm phần quyền',
          url: '/role/index',
          icon: 'icon-puzzle',
        },
        {
          name: 'Danh sách quyền hạn',
          url: '/permission/index',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Quản lý sản phẩm',
      url: '/product',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Danh sách sản phẩm',
          url: '/product/index',
          icon: 'icon-puzzle',
        },
        {
          name: 'Danh mục sản phẩm',
          url: '/catproduct/index',
          icon: 'icon-puzzle',
        },
        {
          name: 'Loại sản phẩm',
          url: '/styleproduct/index',
          icon: 'icon-puzzle',
        },
        {
          name: 'Nhà cung cấp',
          url: '/supplier/index',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Quản lý đơn hàng',
      url: '/order',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Danh sách đơn hàng',
          url: '/order/index',
          icon: 'icon-puzzle',
        },
        {
          name: 'Danh sách Voucher',
          url: '/voucher/index',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Cấu hình hệ thống',
      url: '/setting',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Cài đặt chung',
          url: '/setting/vi',
          icon: 'icon-puzzle',
        },
        {
          name: 'Quản lý menu',
          url: '/menu/index',
          icon: 'icon-puzzle',
        }
      ],
    },
  ],
};
