
export default [
  {
    path: 'index',
    name: '首页',
    component: resolve => require.ensure([], () => resolve(require('@/pages/index/index')), 'index'),
  }
]
