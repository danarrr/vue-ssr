import createApp from "./main";

// 用于首屏渲染
// context有renderer传入
export default (context) => {
  return new Promise((resolve, reject) => {
    // 1.获取路由器和app实例
    const { app, router, store } = createApp(context);
    // 获取首屏地址
    router.push(context.url);
    router.onReady(() => {
      // 需要等待异步请求之后再做操作,获取当前匹配的所有组件 
      const matched = router.getMatchedComponents();
      // 404 用户输入url错误
      if(!matched.length){
        return reject({code: 404})
      }

      Promise.all(
        // 遍历matched 看下有没有约定好的asyncData()所标识的异步函数
        matched.map(component => {
          if(component.asyncData){
            return component.asyncData({
              store, 
              route: router.currentRoute,
            })
          }
        })
      ).then(() => {
        // 约定将app的数据状态存储到context.store
        // 渲染器会将state序列化成字符串 window.__INITIAL_STATE__
        // 未来在前端激活之前再恢复他
        context.state = store.state
        resolve(app)
      }).catch(reject)
     
    }, reject);
  });
};
