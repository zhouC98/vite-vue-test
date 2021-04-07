import { createStore, StoreOptions } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import SecureLs from 'secure-ls'
const ls = new SecureLs({ isCompression: false })

export interface VuexStoreN {
  count: number,
  title: string
}

const storeOptions: StoreOptions<VuexStoreN> = {
  state() {
    return {
      count: 0,
      title: ''
    }
  },
  plugins:[
    createPersistedstate({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    setTitle(state, val: string) {
      state.title = val
    }
  }
}

const store = createStore(storeOptions)


export default store