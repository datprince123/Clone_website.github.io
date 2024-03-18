import {createSlice} from "@reduxjs/toolkit";
import {appSlice} from "../../appSlice";

const formSubAccSlice = createSlice({
    name: 'formSubAccSliceaaa',
    initialState: {
        show: false,
    },
    reducers: {
        setShow: (state, action) => {
            console.log("set show");
            state.show = action.payload;
        },
        // setData: (state, action) => {
        //     state.show = true;
        //     state.secret = action.payload.secret;
        //     state.email = action.payload.email;
        // },


    },
});

export const { setShow} = formSubAccSlice.actions;


export default formSubAccSlice.reducer