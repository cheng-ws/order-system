import linkUrl from '../services/index';

export default {
  namespace: 'user',
  state: {
    list: [],
    data: {}
  },
  reducers: {
    saveUser(state, action) {
      state.data = action.payload;
      return { ...state };
    },
    savePlace(state, action) {
      state.list = action.payload;
      return {
        ...state,
      };
    },
    savePlaceMy(state, action) {
      state.list = action.payload;
      state.list=state.list.map((item,index)=>({
        ...item,
        key:index+1
      }));
      return {
        ...state,
      };
    }, 
  },
  effects: {
    *getUser({ payload }, { put, call }) {
      const response = yield call(linkUrl.userCheck, payload);
      return response.data;
    },
    *getPlace({ payload }, { call, put }) {
      const response = yield call(linkUrl.placeCheck, payload);
      if (response.data.code === 0) {
        yield put({
          type: 'savePlace',
          payload: response.data.list
        })
      } else {
        yield put({
          type: 'savePlace',
          payload: response.data.list
        })
      }
    },
    *upStatus({ payload }, { call, put }) {
      const response = yield call(linkUrl.upPlace, payload);
      return response.data;
    },
    *getMyPerson({ payload }, { call, put }) {
      const response = yield call(linkUrl.myCheck, payload);
      if (response.data.code === 0) {
        yield put({
          type: 'savePlaceMy',
          payload: response.data.list.reverse() 
        })
      } else {
        yield put({
          type: 'savePlaceMy',
          payload: response.data.list
        })
      }
    },
    *removeMyPerson({ payload }, { call, put }) {
      const response = yield call(linkUrl.removeMyPersonOne, payload);
      return response.data;
    },
    *selectMyperson({payload},{call,put}){
      const response = yield call(linkUrl.selectMyPerson,payload);
      if (response.data.code === 0) {
        yield put({
          type: 'savePlaceMy',
          payload: response.data.list.reverse() 
        })
      } else {
        yield put({
          type: 'savePlaceMy',
          payload: response.data.list
        })
      }
    },
    *upUser({payload},{call,put}){
      const response=yield call(linkUrl.upUserPerson,payload);
      return response.data;
    },
    *addUser({payload},{call,put}){
      const response=yield call(linkUrl.addUserPerson,payload);
      return response.data;
    },
    *getRole({payload},{call,put}){
      const response=yield call(linkUrl.getRoleList,payload);
      return response.data;
    },
    *createRole({payload},{call,put}){
      const response=yield call(linkUrl.addCreateRole,payload);
      return response.data;
    },
    *setPermission({payload},{call,put}){
      const response=yield call(linkUrl.addRolePermission,payload);
      return response.data;
    },
    *getRolePer({payload},{call,put}){
      const response=yield call(linkUrl.getRolePermission,payload);
      return response.data;
    },
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname }) => {
    //     if (pathname === '/user') {
    //       dispatch({ type: 'fetch' });
    //     }
    //   });
    // },
  },
}