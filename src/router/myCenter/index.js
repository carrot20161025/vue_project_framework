
export default [
  {
    path: 'index',
    name: '个人中心',
    component: resolve => require.ensure([], () => resolve(require('@/pages/myCenter/index')), 'myCenter'),
  }
]
