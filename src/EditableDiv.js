import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable'

export default function EditableDiv({menuItem}) {
    // const history = useHistory();
    const text = useRef(menuItem);
    const handleChange = evt => {
        text.current = evt.target.value;
***REMOVED***;
    return (
        <ContentEditable
            // innerRef={this.contentEditable}
            html={text.current} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={handleChange} // handle innerHTML change
        />
    );
}

