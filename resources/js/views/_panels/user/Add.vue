<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header border-bottom d-flex">
                        <div class="action my-auto me-2">
                            <router-link class="btn btn-sm btn-success" :to="{ name: 'UserList'}"><i class="bi bi-arrow-left fz-16 fw-bold"></i></router-link>
                        </div>
                        <div class="title my-auto">
                            <h5 class="card-title">Add User</h5>
                            <h6 class="card-subtitle text-muted fz-13">The following is a list of users in the Hidayah app.</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <MyFormProvider id="formId" :formData="formData" @onSubmit="onSubmit" ref="formProvider">
                            <div class="row">
                                <div class="col">
                                    <FormControl
                                        id="firstName"
                                        labelName="First Name"
                                        placeholder="Enter your first name ..."
                                        v-model="formData.firstName"
                                        :required="true"
                                    />
                                </div>
                                <div class="col">
                                    <FormControl
                                        id="lastName"
                                        placeholder="Enter your last name ..."
                                        v-model="formData.lastName"
                                        :required="true"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <FormControl
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        v-model="formData.email"
                                        :required="true"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <FormControl
                                        id="role"
                                        type="select"
                                        v-model="formData.role"
                                        :required="true"
                                        :options="state.roleOptions"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <FormControl
                                        id="gender"
                                        type="radio"
                                        className="form-check-inline"
                                        v-model="formData.gender"
                                        :required="true"
                                        :options="state.genderOptions"
                                    />
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="col-auto">
                                    <button ref="buttonSubmit" class="btn btn-sm btn-success" type="submit" :disabled="state.isLoading">
                                        <span v-if="!state.isLoading">Submit</span>
                                        <div v-if="state.isLoading" class="spinner-border spinner-border-sm" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </MyFormProvider>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Import Package */
    import { ref, reactive, onMounted } from 'vue';
    import { useRouter } from "vue-router";
    /** Import Component */
    import FormControl from '@/components/molekuls/FormControl.vue';
    import MyFormProvider from '@/components/organisms/MyFormProvider.vue';
    /** Import service */
    import { GetRoleList, CreateUser } from "@/services";
    import helpers from '@/global/helpers';

    const router = useRouter();
    const state = reactive({
        genderOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
        ],
        roleOptions: null,
        isLoading: false
    });

    const formData = reactive({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        role: ''
        // Add other form fields as needed
    });

    let buttonSubmit = ref(null)

    onMounted(async () => {
        await GetRoleList()
            .then(function successCallBack(response) {
                var { success, data } = response.data;
                if (success) {
                    state.roleOptions = data;
                }
            })
            .catch(function errorCallBack(error) {
                console.log(error);
            })
    });

    const onSubmit = async (isValid) => {
        state.isLoading = true;
        if (isValid) {
            let payload = {
                fullname: formData.firstName + ' ' + formData.lastName,
                email: formData.email,
                gender: formData.gender,
                roleId: formData.role
            }
            
            await CreateUser(payload)
                .then(function successCallBack(response) {
                    var { success, message } = response.data;
                    helpers.alertToast(success ? 'success' : "error", message);
                    if (success) {
                        buttonSubmit.value.setAttribute('disabled', 'true');
                        router.push('/panel/users/');
                    }
                })
                .catch(function errorCallBack(error) {
                    console.log(error);
                    helpers.alertToast("error", "Something wrong when add user!");
                });

            state.isLoading = false;
        }
    };
</script>