'use strict';

const MessageHistory = props => {
    if(!Array.isArray(props.list) || props.list.length == 0) {
        return null;
    }
    const listForRendering = props.list.map(message => {
        const CurMessage = message.type === 'response' ? Response : message.type === 'message' ? Message : Typing;
        return (
          <li key={message.id}>
            <CurMessage from={message.from} message={message}/>
          </li>
        )    
    })
    return(
        <ul>{listForRendering}</ul>
    )
}