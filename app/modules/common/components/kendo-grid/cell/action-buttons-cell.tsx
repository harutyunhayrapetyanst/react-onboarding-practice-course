/*
 * source https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/
 */
import * as React from 'react';
import { GridCell, GridCellProps } from '@progress/kendo-react-grid';
import { Button, Dialog } from '@servicetitan/design-system';
import { Confirm, ConfirmationProps } from '../../confirm/confirm';

export interface IActionButtonsCellParams<T> {
    onEdit: (dataItem: T) => void;
    onDelete: (dataItem: T) => void;
    onCancel: (dataItem: T) => void;
    onSave: (dataItem: T) => void;
}

export function getActionButtonsCell<T>(params: IActionButtonsCellParams<T>): React.ComponentType<GridCellProps> {
    return class ActionButtonsCell extends GridCell {

        onEditClick = (dataItem: T) => () => {
            params.onEdit(dataItem);
        }

        onSaveClick = (dataItem: T) => () => {
            params.onSave(dataItem);
        }

        onDeleteClick = (dataItem: T) => () => {
            params.onDelete(dataItem);
        }

        onCancelClick = (dataItem: T) => () => {
            params.onCancel(dataItem);
        }

        render() {
            if (this.props.rowType !== 'data') {
                return <GridCell {...this.props} />;
            }

            const { dataItem } = this.props;
            if (dataItem.inEdit) {
                return (
                    <td>
                        <Button text onClick={this.onCancelClick(dataItem)}>Cancel</Button>
                        <Button text primary onClick={this.onSaveClick(dataItem)}>Save</Button>
                    </td>
                );
            } else {
                return (
                    <td>
                        <Button text primary onClick={this.onEditClick(dataItem)}>Edit</Button>
                        <Confirm onClick={this.onDeleteClick(dataItem)} confirmation={DeleteConfirmation}>
                            {onClick => (
                                <Button text negative onClick={onClick}>Delete</Button>
                            )}
                        </Confirm>
                    </td>
                );
            }
        }
    };
}


const DeleteConfirmation: React.FC<ConfirmationProps> = ({ onConfirm, onCancel }) => (
    <Dialog
        open
        negative
        title="Are you sure you want to delete?"
        onClose={onCancel}
        primaryActionName="Delete"
        onPrimaryActionClick={onConfirm}
        secondaryActionName="Cancel"
        onSecondaryActionClick={onCancel}
    />
);

