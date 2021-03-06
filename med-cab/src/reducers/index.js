import { USER_REGISTER_START, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_LOGIN_START, 
    USER_LOGIN_SUCCESS,
     USER_LOGIN_FAIL,
  } from '../actions'
  
  
  
  
  export let intitialState = {
  diner: {}, 
  
  operator: {
    trucks: []
  },
  
  options: [
    { key: 'd', text: 'Diner', value: 'diner' },
    { key: 'o', text: 'Operator', value: 'operator' },
  ],
  
  isLoading: false,
  error: ''
  }
  
  const persistedState = localStorage.getItem('reduxState')
  if (persistedState) {
  intitialState = JSON.parse(persistedState)
  }
  
  export const reducer = (state = intitialState, action) => {
  switch(action.type) {
    case USER_REGISTER_START:
    case USER_LOGIN_START:
        return {
            ...state, 
            isLoading: true,
            error: ''
        }
    case USER_REGISTER_SUCCESS:
        return localStorage.getItem('type') === 'diner' ?
        {
            ...state,
            diner: {
                ...action.payload.newUser,
                message: action.payload.message
            },
            isLoading: false,
            error: ''
        } :
        {
            ...state,
            operator: {
                ...state.operator,
                ...action.payload,
            },
            isLoading: false,
            error: ''
        }
    case USER_LOGIN_SUCCESS:
        return action.payload.type === 'diner' ?
        {
            ...state,
            diner: {
                ...action.payload,
                message: action.payload.message
            },
            isLoading: false,
            error: ''
        } 
        :
        {
            ...state,
            operator: {
                ...state.operator,
                ...action.payload
            },
            isLoading: false,
            error: ''
        }
    case USER_LOGIN_FAIL:
        return {
            ...state, 
            error: action.payload,
            isLoading: false
        }
    case USER_REGISTER_FAIL:
        return{
            ...state,
            error: action.payload,
            isLoading: false
        }
    
    default: 
        return state
  }
  }