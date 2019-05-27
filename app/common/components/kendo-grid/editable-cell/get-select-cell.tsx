import * as React from 'react';

import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';

import { getEditableCell, EditorProps } from './get-editable-cell';

export function getSelectCell<T>(data: T[]) {
    class Editor extends React.Component<EditorProps<T>> {
        handleChange = (event: DropDownListChangeEvent) => {
            this.props.onChange(event.syntheticEvent, event.target.value);
        }

        render() {
            return (
                <DropDownList
                    data={data}
                    value={this.props.value}
                    onChange={this.handleChange}
                    style={{
                        width: '100%'
                    }}
                />
            );
        }
    }

    return getEditableCell({
        editor: Editor
    });
} 
