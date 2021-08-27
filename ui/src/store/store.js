import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './accountSlice'

export default configureStore({
    reducer: {
        account: accountReducer
    },
})