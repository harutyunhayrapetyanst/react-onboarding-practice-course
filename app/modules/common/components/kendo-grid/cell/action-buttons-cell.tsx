import * as React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import { Button } from '@servicetitan/design-system';

export class ActionButtonsCell extends GridCell {

    onEditClick = () => {
        console.log('edit');
    }

    onSaveClick = () => {
        console.log('save');
    }


    onDeleteClick = () => {
        console.log('delete');
    }

    onCancelClick = () => {
        console.log('cancel');
    }

    render() {
        const { dataItem: { inEdit } } = this.props;
        if (inEdit) {
            return (
                <td>
                    <Button text onClick={this.onCancelClick}>Cancel</Button>
                    <Button text primary onClick={this.onSaveClick}>Save</Button>
                </td>
            );
        } else {
            return (
                <td>
                    <Button text primary onClick={this.onEditClick}>Edit</Button>
                    <Button text negative onClick={this.onDeleteClick}>Delete</Button>
                </td>
            );
        }
    }
}
