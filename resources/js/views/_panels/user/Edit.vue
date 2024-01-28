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
                            <h5 class="card-title">Edit User {{ state.userData.fullname }}</h5>
                            <h6 class="card-subtitle text-muted fz-13">The following is a list of users in the TNovel App.</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <div v-if="state.isLoading" class="row">
                            <div class="col text-center">
                                <div class="spinner-border text-secondary me-1" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border text-secondary me-1" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <MyFormProvider v-else id="formId" :formData="state.userData" @onSubmit="onSubmit" ref="formProvider">
                            <div class="row">
                                <div class="col">
                                    <FormControl
                                        id="fullName"
                                        placeholder="Enter your full name ..."
                                        v-model="state.userData.fullname"
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
                                        v-model="state.userData.email"
                                        :required="true"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <FormControl
                                        id="role"
                                        type="select"
                                        v-model="state.userData.role"
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
                                        v-model="state.userData.gender"
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
    /** Import package */
    import { ref, reactive, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    /** Import global */
    import { GetUser, GetRoleList } from "@/services";
    /** Import Component */
    import FormControl from '@/components/molekuls/FormControl.vue';
    import MyFormProvider from '@/components/organisms/MyFormProvider.vue';

    var route = useRoute()
    let state = reactive({
        isLoading: true,
        genderOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
        ],
        roleOptions: null,
        userData: {
            fullname: '',
            username: '',
            email: '',
            gender: '',
            birthday: '',
            role: null
        }
    })

    onMounted(async () => {
        await fetchDataUser();
        await fetchDataRoles();
    });

    const fetchDataRoles = async () => {
        try {
            let res = await GetRoleList();
            var { success, data } = res.data;
            if (success) {
                state.roleOptions = data;
                console.log(state.roleOptions);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchDataUser = async () => {
        try {
            let res = await GetUser(route.params.id);
            var { success, data } = res.data;
            if (success) {
                state.userData.fullname = data.fullname
                state.userData.username = data.username
                state.userData.email = data.email
                state.userData.gender = data.gender
                state.userData.birthday = data.birthday
                state.userData.role = data.roles[0].id
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            state.isLoading = false
        }
    }

    const onSubmit = async (isValid) => {
        console.log(isValid);
    }

</script>