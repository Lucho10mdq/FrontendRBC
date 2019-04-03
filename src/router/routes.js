
const routes = [
  {
    path: '/main',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/main/MainTables.vue') },
      // Waiters
      { path: 'register-waiter', component: () => import('components/waiters/AddWaiters.vue') },
      { path: 'edit-waiter/:id', component: () => import('components/waiters/EditWaiters.vue') },
      { path: 'list-waiter', component: () => import('components/waiters/ListWaiters.vue') },
      // // tables
      { path: 'add-table', component: () => import('components/tables/AddTables.vue') },
      { path: 'list-table', component: () => import('components/tables/ListTables.vue') },
      // locations tables
      { path: 'add-location-table', component: () => import('components/tables/AddLocationsTables.vue') },
      { path: 'list-locations-tables', component: () => import('components/tables/ListLocationsTables.vue') },
      // customers
      { path: 'register-customer', component: () => import('components/customers/AddCustomers.vue') },
      { path: 'edit-customer/:id', component: () => import('components/customers/EditCustomers.vue') },
      { path: 'list-customer', component: () => import('components/customers/listCustomers.vue') },
      // // Menu
      { path: 'add-menu', component: () => import('components/menus/AddMenus.vue') },
      { path: 'edit-menu/:id', component: () => import('components/menus/AddMenus.vue') },
      { path: 'list-menu', component: () => import('components/menus/ListMenus.vue') },
      // // Locations Menu
      { path: 'add-location-menu', component: () => import('components/menus/AddLocationsMenu.vue') },
      { path: 'edit-location-menu/:id', component: () => import('components/menus/AddLocationsMenu.vue') },
      { path: 'list-locations-menus', component: () => import('components/menus/ListLocationsMenu.vue') },
      // // Categories Menu
      { path: 'add-category-menu', component: () => import('components/menus/AddCategoriesMenu.vue') },
      { path: 'edit-category-menu/:id', component: () => import('components/menus/AddCategoriesMenu.vue') },
      { path: 'list-categories-menus', component: () => import('components/menus/ListCategoriesMenu.vue') },
      // // Orders and order state
      {path: 'add-order', component: () => import('components/orders/AddOrder.vue')},
      { path: 'add-order-plate-state', component: () => import('components/setting/AddOrderPlateStates.vue') },
      { path: 'list-order-plate-state', component: () => import('components/setting/ListOrderPlateStates.vue') },
      { path: 'edit-order-state/:id', component: () => import('components/setting/EditOrderStates.vue') },
      { path: 'edit-plate-state/:id', component: () => import('components/setting/EditPlateStates.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('components/auth/Login.vue')
  },
  {
    path: '/register',
    component: () => import('components/auth/Register.vue')
    /* children: [
      { path: '', component: () => import('layouts/Table.vue') }
    ] */
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
