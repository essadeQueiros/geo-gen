import './App.css';

import { useState, useEffect, useRef } from 'react';

import Preview from './Preview';
import Geos from './Geos';

function App() {

  const storageGeos = (item) => {
    localStorage.setItem('geos', JSON.stringify(item))
  }

  const [geos, setGeos] = useState([])

  const [deleting, setDeleting] = useState(false)

  const id = useRef(0)
  
  const getLastId = () => {
      const storageGeos = JSON.parse(localStorage.getItem('geos'))
      if(storageGeos.length > 0){
        let final = storageGeos.length - 1
        let lastId = storageGeos[final].id
        id.current = lastId + 1
      }
    }

    const getGeos = () => {
      return setGeos(JSON.parse(localStorage.getItem('geos')))
    }

  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(200)
  const [color, setColor] = useState('')

  const [border, setBorder] = useState({
    width: 5,
    color: '',
    radius: 50
  })

  const previewSettings= {
    height: height + 'px',
      width: width + 'px',
      backgroundColor: color,
      margin: '10px',
      border: 'solid ' + border.color + ' ' + border.width + 'px',
      borderRadius: border.radius + 'px'
}

const handleBorder = (set, val) => {
  setBorder((prevState) => ({
    ...prevState,
    [set]: val,
  }))
}
  
  

  const generate = () => {
    getLastId();
      setGeos([...geos, {
        id: id.current,
        style: previewSettings
        }
      ])
    } 

    const removeGeo = (id) => {
      const newGeos = geos.filter((geo) => {
        return (
          geo.id !== id
        )
      })
      setGeos(newGeos);
      setDeleting(true)
    }  

    useEffect(()=>{
      getLastId()
      getGeos();
    }, [])

    useEffect(() => {
      if(geos.length > 0 || deleting){
        storageGeos(geos)
      }
      getLastId()
    }, [geos])

    

  return (
    <div className="App"> 
      <div className='interface_container'>
        <div className='inputs_container'>
          <h1>Geo Settings</h1>
          <div className='size_settings'>   
            <label>           
              <p>Height</p>
              <div className='input'>
                <input className='height' 
                  onChange={e => setHeight(e.target.value)}  
                  type='range' min='20' 
                  max='200' step='1' value={height}>
                </input>
                <div className='px'>{height}px</div>
              </div>
            </label>
            <label>
              <p>Width</p>
              <div className='input'>
                <input className='height' 
                  onChange={e => setWidth(e.target.value)} 
                  type='range' min='20' 
                  max='400' step='1' value={width}>
                </input>
                <div className='px'>{width}px</div>
              </div>
            </label>
          </div>  
          <div className='color_settings'>
            <label>
              <p>Geo Color</p>
              <input onChange={e => setColor(e.target.value)}></input>
            </label>
           </div>
           <div className='border_settings'>
              <div className='border_inputs'>
                <label>
                  <p>Border Width</p>
                  <div className='input'>
                    <input className='border_width' 
                      onChange={e => handleBorder('width', e.target.value)} 
                      type='range' min='1' 
                      max='10' step='1' value={border.width}>
                    </input>
                    <div className='px'>{border.width}px</div>
                  </div>                  
                </label>
                <label>
                  <p>Border color</p>
                  <input onChange={e => handleBorder('color', e.target.value)}></input>
                </label>
              </div>
              <label>
                <p>Geo Roundness</p>
               <input className='border_roundness'
                type='range' 
                min='0' max='100' step='5' value={border.radius}
                onChange={(e) => handleBorder('radius', e.target.value)}
                ></input>
              </label>
          </div>
          <button className='generate_btn' onClick={() => generate()}>Generate</button>
        </div>
        <Preview previewSettings={previewSettings} />
      </div>
      <Geos removeGeo={removeGeo} geos={geos} />
    </div>
  );
}

export default App;
