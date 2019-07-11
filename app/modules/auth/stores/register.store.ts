import { action, observable, runInAction } from 'mobx';
import { FieldState, FormState, Validator } from 'formstate';
import { inject, injectable } from '@servicetitan/react-ioc';

import { DropdownFieldState, formStateToJS, InputFieldState } from '../../common/utils/form-helpers';
import { FormValidators, } from '../../common/utils/form-validators';
import { Role } from '../../common/enums/Role';
import { AuthApi } from '../api/auth.api';
import { User } from '../../common/models/user';
import { AppStore } from '../../common/stores/app.store';

type SamePasswordValidator = Validator<{
    password: FieldState<string>,
    passwordConfirm: FieldState<string>,
}>;


const passwordsMatchValidator: SamePasswordValidator = ($) => {
    const error = 'Passwords must match';
    if ($.password.$ !== $.passwordConfirm.$) {
        $.password.setError(error);
        $.passwordConfirm.setError(error);
        return error;
    }
    return null;
};

const strongPasswordValidator: Validator<string> = (value) => {

    if (!FormValidators.passwordIsValidFormat(value)) {
        return 'Your password must be at least 8 characters long including a number, a lowercase letter, and an uppercase letter';
    }
    return null;
};


@injectable()
export class RegisterStore {

    constructor(@inject(AuthApi) private authApi: AuthApi, @inject(AppStore) private appStore: AppStore) {

    }

    loginIsNotTakenValidator: Validator<string> = async (value) => {
        const result = await this.authApi.isLoginInUse(value);

        if (result.data) {
            return 'Login is already taken';
        }
        return null;
    };


    private login = new InputFieldState('rembo')
        .validators(FormValidators.required, this.loginIsNotTakenValidator)
        .disableAutoValidation();
    private password = new InputFieldState('!1Qwertyurg')
        .validators(FormValidators.required, strongPasswordValidator)
        .disableAutoValidation();
    private passwordConfirm = new InputFieldState('!1Qwertyurg')
        .validators(FormValidators.required)
        .disableAutoValidation();
    private role = new DropdownFieldState<Role>(Role.Public)
        .validators(FormValidators.required)
        .disableAutoValidation();


    passwordsFormState = new FormState({
                                           password: this.password,
                                           passwordConfirm: this.passwordConfirm,
                                       })
        .validators(passwordsMatchValidator);


    @observable
    errorMessage?: string;

    formState = new FormState({
                                  login: this.login,
                                  role: this.role,
                                  passwords: this.passwordsFormState
                              }
    );


    @action
    register = async (): Promise<void> => {
        const validateResult = await this.formState.validate();
        if (validateResult.hasError) {
            return;
        }

        const user: User = formStateToJS(this.formState);

        const result = await this.authApi.register(user);
        if (result.status !== 201) {
            runInAction(() => {
                this.errorMessage = result.statusText;
            });
        } else {
            console.log('success');
            this.appStore.setLoggedInUser(result.data!);
        }
    };
}
