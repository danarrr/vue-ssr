// // node服务器：koa,express,egg.js
// const express = require('express')
// const app = express()

// // 服务端渲染模块vue-server-renderer
// const {createRenderer} = require('vue-server-renderer')
// // 获取渲染器
// const renderer = createRenderer()

// const Vue = require('vue')

// // 路由
// app.get('*', async (req, res) => {
//   req.url
//   // 创建一个vue应用
//   const vm = new Vue({
//     template: '<div>{{name}}</div>',
//     data() {
//       return {
//         name: '村长'
//       }
//     },
//   })

//   try {
//     const html = await renderer.renderToString(vm)
//     res.send(html)
//   } catch (error) {
//     res.status(500).send('服务器内部错误')
//   }
  
// })

// // 监听
// app.listen(3000)

// 在node起服务的基础上，把vue的模板内容也渲染出来再响应
const express = require('express')
const app = express()

// 服务端渲染模块vue-server-renderer
const { createRenderer } = require('vue-server-renderer')
const rendere = createRenderer()

const Vue = require('vue')
// 1.处理请求的路由
app.get('*', async (req, res) => {
  // 2.vue模板
  const vm = new Vue({
    template: '<div>my name is {{name}}</div>',
    data() {
      return {
        name: 'anita'
      }
    }
  })
  try{
    // 3.渲染vue模板，并响应到客户端
    const html = await rendere.renderToString(vm)
    res.send(html)
  } catch(err) {
    res.status(500).send('服务器内部错误，请稍候重试')
  }
})

app.listen(3000)