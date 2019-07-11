import { action, observable, runInAction } from 'mobx';
import { FormState } from 'formstate';
import { inject, injectable } from '@servicetitan/react-ioc';

import { formStateToJS, InputFieldState } from '../../common/utils/form-helpers';
import { FormValidators } from '../../common/utils/form-validators';
import { AuthApi } from '../api/auth.api';
import { User } from '../../common/models/user';
import { AppStore } from '../../common/stores/app.store';

@injectable()
export class LoginStore {

    constructor(@inject(AuthApi) private authApi: AuthApi, @inject(AppStore) private appStore: AppStore,) {
        console.log('LoginStore: constructor');
    }

    @observable
    errorMessage?: string;

    @observable
    loggedInUser?: User;

    formState = new FormState({
                                  login: new InputFieldState<string>('rembo').validators(FormValidators.required),
                                  password: new InputFieldState<string>('Aaaaaa!1').validators(FormValidators.required)
                              });


    @action
    loginAction = async () => {
        const validateResult = await this.formState.validate();
        if (validateResult.hasError) {
            console.log(validateResult);
            return;
        }

        const form = formStateToJS(this.formState);

        const response = await this.authApi.login(form);
        if (response.status === 200) {
            this.loggedInUser = response.data;
            this.appStore.setLoggedInUser(response.data!);
        } else {
            runInAction(() => {
                this.errorMessage = response.statusText;
            });
        }
    };

}
