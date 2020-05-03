import React,{useState,useMemo,useEffect}from 'react'
import './CitySelector.css'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import axios from 'axios'


function CityItem(props){
    const {name,onSelect} = props;
    return(
        <li className="city-li" onClick={()=>onSelect(name)}>
            {name}
        </li>
    )
}

function CitySection(props){
    const {title,cities=[],onSelect} = props;
    return(
        <ul className="city-ul">
            <li className="city-li" key="title">
                {title}
            </li>
            {
                cities.map(city=>{
                    return (<CityItem 
                        key={city.name}
                        name={city.name}
                        onSelect={onSelect}
                    />)
                })
            }
        </ul>
    )
}

function CityList(props){
    const {sections,
            onSelect
     } = props;
     return (
         <div className="city-list">
              <div className="city-cate">
                  {
                       sections.map(section=>{
                       return (
                          <CitySelector
                           key={section.title}
                           title={section.title}
                           cities ={section.cities}
                           onSelect={onSelect}
                          />
                      )
                     })
                  }
                 
              </div>
         </div>
     )
}

export default function CitySelector(props) {
    const {
        show,
        cityData,
        isLoading,
        onBack,
        fetchCityData,
    } = props;
    
    const [searchKey,setSearchKey] = useState('');
    
    // 去掉两边的空白 每次searchKey.trim()时都会返回一个新key，只有当searchKey的值
    // 发生变化，才会重新计算key值 优化
    const key = useMemo(()=>searchKey.trim(),[searchKey])
    
    useEffect( ()=>{
        //获取cityData
        if(!show || cityData || isLoading)
            return;
        fetchCityData()
    },[show,isLoading,cityData])

    const outputCitySections = ()=>{
        if(isLoading){
            
        }
    }

    return (
        // 动态绑定样式名字
        // 当show为false时 样式名：city-selector hidden
        // className = {['city-selector',(!show)&&'hidden'].filter(Boolean).join(' ')}
        // 使用classnames 当value值为true时被追加到样式名
        <div className={classnames('city-selector',{hidden:!show})}>
            <div className = "city-search">
                <div className="search-back" onClick={()=>onBack()}>
                    <svg width="42" height="42">
                        <polyline
                          points = '25,13,16,21,25,29'
                          stroke="#fff"
                          strokeWidth="2"
                          fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input type="text"
                     value={searchKey}
                     className="search-input"
                     placeholder="城市、车站的中文或者拼音"
                     onChange={e=>setSearchKey(e.target.value)}
                   />
                </div>
                <i 
                className={classnames('search-clean',{hidden:key.length === 0})} 
                onClick={()=>setSearchKey('')}>
                    &#xf063;
                </i>
            </div>
        </div>
    )
}
CitySelector.propTypes = {
    show:PropTypes.bool.isRequired,
    cityData:PropTypes.object,
    isLoading:PropTypes.bool.isRequired,
    onBack:PropTypes.func.isRequired
}
