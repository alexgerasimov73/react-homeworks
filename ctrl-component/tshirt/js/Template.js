const Template = ({font, onSelect}) => {
    return (
        <div className="grid center font-item">
            <input type="radio" name="font" value={font.name} id={font.name} onChange={() => onSelect(font)}/> 
            <label htmlFor={font.name} className="grid-1">
                <PictureFont text={'abc'} path={font.path} />
            </label>
        </div>
    )
} 