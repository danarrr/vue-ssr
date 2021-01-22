import Vue from 'vue'
import Vuex from 'vuex'
Vue.use( Vuex )
// 每次都要返回一个实例
export function createStore () {
  return new Vuex.Store( {
    state: {
      count: 108
    },
    mutations: {
      // 加⼀个初始化
      init ( state, count ) {
        state.count = count;
      },
      add ( state ) {
        state.count += 1;
      }
    },
    actions: {
      // 加⼀个异步请求count的action
      getCount ( { commit } ) {
        return new Promise( resolve => {
          setTimeout( () => {
            // 模拟接口异步返回
            commit( "init", Math.random() * 100 );
            resolve();
          }, 1000 );
        } );
      },
    },
  } )
}