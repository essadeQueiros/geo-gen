

const Geos = (props) => {

    

    return ( 
        <div className='geos_container'>
            { props.geos.map((geo, index) => {
            return(
                <div key={index} className='geo' style={geo.style} onClick={() => props.removeGeo(geo.id)}></div>
                )
            })
            }
        </div>
     );
}
 
export default Geos;