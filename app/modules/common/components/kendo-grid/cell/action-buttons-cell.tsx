/*
 * source https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/
 */

import * as React from 'react';
import { GridCell, GridCellProps } from '@progress/kendo-react-grid';
import { Button } from '@servicetitan/design-system';

export interface IActionButtonsCellParams<T> {
    onEdit: (dataItem: T) => void;
    onDelete: (dataItem: T) => void;
    onCancel: (dataItem: T) => void;
    onSave: (dataItem: T) => void;
}

export function getActionButtonsCell<T>(params: IActionButtonsCellParams<T>): React.ComponentType<GridCellProps> {
    return class ActionButtonsCell extends GridCell {

        onEditClick = (dataItem: T) => {
            params.onEdit(dataItem);
        };

        onSaveClick = (dataItem: T) => {
            params.onSave(dataItem);
        };


        onDeleteClick = (dataItem: T) => {
            params.onDelete(dataItem);
        };

        onCancelClick = (dataItem: T) => {
            params.onCancel(dataItem);
        };

        render() {
            const { dataItem } = this.props;
            if (dataItem.inEdit) {
                return (
                    <td>
                        <Button text onClick={() => this.onCancelClick(dataItem)}>Cancel</Button>
                        <Button text primary onClick={() => this.onSaveClick(dataItem)}>Save</Button>
                    </td>
                );
            } else {
                return (
                    <td>
                        <Button text primary onClick={() => this.onEditClick(dataItem)}>Edit</Button>
                        <Button text negative onClick={() => this.onDeleteClick(dataItem)}>Delete</Button>
                    </td>
                );
            }
        }
    };
}
