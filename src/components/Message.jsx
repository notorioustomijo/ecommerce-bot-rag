import ekaite from '/assets/ekaite-logo.svg';

export default function Message({role, content, timestamp}) {
    const paragraphs = content.split('\n').filter(p => p.trim()); //Split on \n, skip empties
    const avatar = role === 'agent' ? ekaite : '';

    return (
        <div className={`${role}-message-container`}>
            <div className={`${role}-message-details`}>
                {role === 'agent' && <img src={ekaite} className={`${role}-avatar`} alt="Ekaite"/>}
                <div className={`${role}-message-content`}>
                    {paragraphs.map((para, index) => (
                        <p key={index}>{para}</p> //Each paragraph in its own <p>
                    ))}
                </div>
            </div>
            <p className='message-timestamp'>{timestamp}</p>
        </div>
    )
}