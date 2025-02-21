import ekaite from '../assets/ekaite-logo.svg';

export default function Message({role, content, timestamp}) {
    const avatar = role === 'agent' ? ekaite : '';

    return (
        <div className={`${role}-message-container`}>
            <div className={`${role}-message-details`}>
                <img src={avatar} className={`${role}-avatar`} />
                <p className={`${role}-message-${content}`}>{content}</p>
            </div>
            <p className='message-timestamp'>{timestamp}</p>
        </div>
    )
}