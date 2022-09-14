

const Preview = (props) => {

    const style = props.previewSettings

    return (
        <div className="preview_container">
            <h1>Preview</h1>
            <div className="preview">
                <div style={style}></div>
            </div>
        </div>
    )
}   

export default Preview;