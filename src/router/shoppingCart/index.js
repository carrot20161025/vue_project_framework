
export default [
  {
    path: 'index',
    name: '购物车',
    component: resolve => require.ensure([], () => resolve(require('@/pages/shoppingCart/index')), 'index'),
  }
]
