

import axios from 'axios';

export const ACTION_SET_FROM='SET_FROM';
export const ACTION_SET_TO='SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE='SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY='SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA='SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA='SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE='SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED='SET_HIGH_SPEED';


export function setFrom(from){
    return {
        type:ACTION_SET_FROM,
        payload:from
    };
}
export function setTo(to){
    return {
        type:ACTION_SET_TO,
        payload:to
    };
}

export function setCityData(cityData){
    return {
        type:ACTION_SET_CITY_DATA,
        payload:cityData
    };
}

export function setIsLoadingCityData(isLoadingCityData){
    return {
        type:ACTION_SET_IS_LOADING_CITY_DATA,
        payload:isLoadingCityData
    };
}

export function toggleHighSpeed(){
    return (dispatch,getState)=>{
        const {highSpeed} = getState();
        dispatch({
            type:ACTION_SET_HIGH_SPEED,
            payload:!highSpeed
        })
    }
}

export function showCitySelector(currentSelectingLeftCity){
    return (dispatch)=>{
        dispatch({
            type:ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload:true
        });
        dispatch({
            type:ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload:currentSelectingLeftCity
        })
    }
}

export function hideCitySelector(){
    return {
        type:ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload:false,
    }
}

export function setCitySelector(city){
    return (dispatch,getState)=>{
           const {currentSelectingLeftCity} = getState();
           if(currentSelectingLeftCity){
               dispatch(setFrom(city))
           }else{
               dispatch(setTo(city))
           }
    }
}
export function showDateSelector(){
    return{
        type:ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload:true
    }
}

export function hideDateSelector(){
    return{
        type:ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload:true
    }
}

export function exchangeFromTo(){
    return (dispatch,getState)=>{
        const {from,to} = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from))
    }
}

export function fetchCityData(){
    return async (dispatch,getState)=>{
         const {isLoadingCityData} = getState();
         if(isLoadingCityData) return;

         const cache = JSON.parse(localStorage.getItem('city_data_cache')|| '{}')

         //设置缓存 当没有过期时，直接返回
         if(Date.now() < cache.expires)
         {
             dispatch(setCityData(cache.data));
             return;
         }
         dispatch(setIsLoadingCityData(true))
        //  fetch('/rest/cities?_'+Date.now())
        try {
            let res = await axios.get('/rest/cities?_'+Date.now())
            console.log('city-data',res.data.data)
            let cityData = res.data.data
            dispatch(setCityData(cityData));

            localStorage.setItem(
                'city_data_cache',
                JSON.stringify({
                    expires:Date.now()*60*1000,
                    data:cityData
                })
            )
            dispatch(setIsLoadingCityData(false))

        } catch (error) {
            dispatch(setIsLoadingCityData(false))
        }
       
    }
}