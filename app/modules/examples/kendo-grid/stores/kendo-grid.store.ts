import { injectable } from '@servicetitan/react-ioc';

import { computed } from 'mobx';

import { FormState, FieldState } from 'formstate';
import { InMemoryDataSource, KendoGridState } from '../../../common/components/kendo-grid/kendo-grid-state';
import { setFormStateValues } from '../../../common/utils/form-helpers';
import { FormValidators } from '../../../common/utils/form-validators';

import { Product, UserRole, Supplier } from '../utils/product';
import { products } from '../utils/products';

@injectable()
export class KendoGridStore {
    gridState = new KendoGridState({
        dataSource: this.getDataSource(),
        isRowUnselectable: this.isRowUnselectable,
        getFormState: this.getFormState,
        pageSize: 5,
        idSelector: this.idSelector
    });

    @computed get inEdit() {
        return this.gridState.inEdit.size > 0;
    }

    private getDataSource() {
        return new InMemoryDataSource(products, {
            Supplier: (value: Supplier) => Supplier[value]
        });
    }

    private idSelector(row: Product) {
        return row.ProductID;
    }

    private isRowUnselectable(row: Product) {
        return row.Discontinued;
    }

    private getFormState(row: Product) {
        return setFormStateValues(
            new FormState({
                ProductID: new FieldState(0),
                ProductName: new FieldState('').validators(
                    FormValidators.required
                ),
                Supplier: new FieldState<Supplier>(Supplier.Adam),
                CategoryID: new FieldState(0),
                QuantityPerUnit: new FieldState(''),
                UnitPrice: new FieldState(0).validators(
                    value => value <= 0 && 'Price must be positive'
                ),
                UnitsInStock: new FieldState(0),
                UnitsOnOrder: new FieldState(new Date()).validators(
                    value => value > new Date() && 'Invalid date'
                ),
                Discontinued: new FieldState(false),
                AvailableFor: new FieldState<UserRole | undefined>(undefined)
            }),
            row
        );
    }

    editAll = () => this.gridState.editAll();
    saveAll = () => this.gridState.saveEditAll();
    cancelAll = () => this.gridState.cancelEditAll();
}
