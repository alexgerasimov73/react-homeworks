const FontSelector = ({fonts, selectedFont, onSelect}) => {
    const fontsToRender = fonts.map(font => {
        return <Template font={font} onSelect={onSelect}/>
    })
    return (
        <div className="font-picker">
            {fontsToRender}
        </div>
    )
};