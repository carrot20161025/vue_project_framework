
export default [
  {
    path: 'index',
    name: '动态发布',
    component: resolve => require.ensure([], () => resolve(require('@/pages/dynamic/index')), 'dynamic'),
  }
]
