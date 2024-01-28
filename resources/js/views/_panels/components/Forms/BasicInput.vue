<template>
    <div class="container-fluid p-0">
        <h1 class="h3 mb-3">Basic Inputs</h1>
        <div class="row">
            <div class="col-sm-12">
                <div class="card card-body">
                    <MyFormProvider id="formId" :formData="formData" @onSubmit="onSubmit" ref="formProvider">
                        <!-- <MyInput
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            v-model="formData.username"
                            :required="true"
                            labelName="Username"
                        />

                        <MyInput
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            v-model="formData.password"
                            :required="true"
                            labelName="Password"
                        /> -->
                        <div class="row">
                            <div class="col">
                                <FormControl
                                    id="fullname"
                                    placeholder="Enter your fullname"
                                    v-model="formData.fullname"
                                    :required="true"
                                />
                            </div>
                            <div class="col">
                                <FormControl
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    v-model="formData.email"
                                    :required="true"
                                />
                            </div>
                            <div class="col">
                                <FormControl
                                    id="username"
                                    placeholder="Enter your username"
                                    v-model="formData.username"
                                    :required="true"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <FormControl
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    v-model="formData.password"
                                    :required="true"
                                />
                            </div>
                            <div class="col">
                                <FormControl
                                    id="repassword"
                                    type="password"
                                    placeholder="Enter your password again"
                                    v-model="formData.repassword"
                                    :required="true"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <FormControl
                                    id="birthday"
                                    type="date"
                                    v-model="formData.birthday"
                                    ariaDescribeby="myBirthdayError"
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <FormControl
                                    id="phoneNumber"
                                    labelName="Phone Number"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    v-model="formData.phoneNumber"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <FormControl
                                    id="gender"
                                    type="select"
                                    v-model="formData.gender"
                                    :required="true"
                                    :options="state.genderOptions"
                                    ariaDescribeby="mySelectError"
                                />
                            </div>
                            <div class="col">
                                <FormControl
                                    id="selected"
                                    labelName="Radio Button"
                                    type="radio"
                                    className="form-check-inline"
                                    v-model="formData.selected"
                                    :required="true"
                                    :options="state.dataOptions"
                                    ariaDescribeby="myRadioError"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <FormControl
                                    id="address"
                                    type="textarea"
                                    v-model="formData.address"
                                    ariaDescribeby="myTextareaError"
                                />
                            </div>
                        </div>
                        <!-- <MyField id="username" labelName="Username" className="mb-2">
                            <MyInput
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                v-model="formData.username"
                                :required="true"
                            />
                        </MyField>
                        <MyField id="email" labelName="Email">
                            <MyInput
                                name="email"
                                id="email"
                                v-model="formData.email"
                                type="email"
                                placeholder="Input email..."
                                :required="true"
                            />
                        </MyField>
                        <MyField id="gender" labelName="Gender" className="mb-2">
                            <MySelect
                                id="gender"
                                name="gender"
                                v-model="formData.gender"
                                :required="true"
                                :options="state.genderOptions"
                                ariaDescribeby="mySelectError"
                            />
                        </MyField>
                        <MyField id="phoneNumber" labelName="Phone Number">
                            <MyInput
                                name="phoneNumber"
                                id="phoneNumber"
                                v-model="formData.phoneNumber"
                                type="tel"
                                placeholder="Input phone number ..."
                            />
                        </MyField> -->
                        <hr />
                        <div class="row">
                            <div class="col-auto">
                                <button class="btn btn-sm btn-success" type="submit">Submit</button>
                            </div>
                        </div>
                    </MyFormProvider>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue';

    import MyInput from '@/components/atoms/MyInput.vue';
    import MySelect from '@/components/atoms/MySelect.vue';
    import MyField from '@/components/molekuls/MyField.vue';
    import FormControl from '@/components/molekuls/FormControl.vue';
    import MyFormProvider from '@/components/organisms/MyFormProvider.vue';
    
    const formProvider = ref(null)
    const state = reactive({
        genderOptions: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
        ],
        dataOptions: [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
        ],
    });
    const formData = reactive({
        fullname: '',
        username: '',
        email: '',
        password: '',
        repassword: '',
        gender: '',
        phoneNumber: '',
        address: '',
        selected: '',
        birthday: ''
        // Add other form fields as needed
    });
    const onSubmit = (isValid) => {
        // console.log(formData);
        // console.log(formData);
        // Trigger validation
        // const isValid = formProvider.value.validateForm();
        // console.log('Trigger validation', isValid);
        // if (isValid) {
        //     // Proceed with form submission logic
        //     console.log('Form submitted:', formData.value);
        // } else {
        //     console.log('Form validation failed. Please check errors.');
        // }
    };
</script>