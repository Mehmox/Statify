export default function Weapon({ displays }) {
    if (displays)
        console.log(displays)
    console.log()
    return <section>
        {displays && displays.keys(storage).map((item, index) => (

            <div key={index} className='display'>

                {item.map((rowtext, rowIndex) => (

                    <p
                        key={`${index}-${rowIndex}`}
                        dangerouslySetInnerHTML={{ __html: rowtext }}>
                    </p>

                ))}

            </div>

        ))}
        {/* {false && displays.keys(data).map((storageKey) => (
            <div key={storageKey}>
                <h2>{storageKey}</h2>
                {data[storageKey].map((storageItem, index) => (
                    <div key={index}>
                        {storageItem.items.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                {item.display.map((displayString, displayIndex) => {
                                    // Eğer displayString boş değilse paragrafı ekle
                                    if (displayString.trim()) {
                                        return (
                                            <p key={displayIndex}>
                                                {displayString.split(' ').map((word, wordIndex) => (
                                                    <span key={wordIndex}>{word}</span>
                                                ))}
                                            </p>
                                        );
                                    }
                                    return null; // Boşsa hiçbir şey ekleme
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ))} */}
    </section>
}