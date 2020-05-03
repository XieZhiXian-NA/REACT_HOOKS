import './App.css'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React,{useCallback,useMemo} from 'react'
import Header from '../common/Header'
import DepartDate from './DepartData'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData

} from './action'

function App(props){

    const {from,to,dispatch,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
    } = props;

    //保证只有一个句柄 避免header组件不必要的渲染
    const onBack = useCallback(
      ()=>{
        window.history.back();
      },[])
      const cbs = useMemo(()=>{
          return bindActionCreators({
              exchangeFromTo,
              showCitySelector,
          },dispatch)
      },[])

      const citySelectorCbs = useMemo(()=>{
          return bindActionCreators({
               onBack : hideCitySelector,
               fetchCityData:fetchCityData
          },dispatch)
      },[])

     return (
         <div>
             <div className="header-wrapper">
                <Header title="火车票" onBack={onBack}/>
             </div>
            <form className="form">
                <Journey 
                    from={from} 
                    to={to}
                    {...cbs}
                />
                <DepartDate/>
                <HighSpeed/>
                <Submit/>
            </form>
             <CitySelector  
             show={isCitySelectorVisible}
             cityData={cityData}
             isLoading={isLoadingCityData}
             {...citySelectorCbs}
             />
         </div>
     )
}
export default connect(
    (state)=>state)(App)
