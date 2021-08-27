import {createSlice} from '@reduxjs/toolkit'

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        address: "",
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        }
    },
})

export const {setAddress} = accountSlice.actions

export default accountSlice.reducer