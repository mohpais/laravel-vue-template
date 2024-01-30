<template>
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100 mt-3">
        <div class="d-table-cell align-middle">
            <div class="card">
                <div class="card-body">
                    <div class="m-sm-3">
                        <div class="d-grid gap-2 mb-3">
                            <a class="btn btn-google btn-lg" href="/"><i class="bi-google"></i> Sign up with Google</a>
                            <a class="btn btn-facebook btn-lg" href="/"><i class="bi-facebook"></i> Sign up with Facebook</a>
                        </div>
                        <div class="row">
                            <div class="col">
                                <hr>
                            </div>
                            <div class="col-auto text-uppercase d-flex align-items-center">Or</div>
                            <div class="col">
                                <hr>
                            </div>
                        </div>
                        <MyFormProvider id="sign-up-form" :formData="signup" @onSubmit="onSubmit">
                            <div class="mb-2">
                                <FormControl
                                    id="fullName"
                                    placeholder="Enter your fullname ..."
                                    v-model="signup.fullname"
                                    :required="true"
                                    :showRequired="false"
                                />
                            </div>
                            <div class="mb-2">
                                <FormControl
                                    id="email"
                                    placeholder="Enter your email ..."
                                    v-model="signup.email"
                                    :required="true"
                                    :showRequired="false"
                                />
                            </div>
                            <div class="mb-2">
                                <FormControl
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password ..."
                                    v-model="signup.password"
                                    :required="true"
                                    :showRequired="false"
                                />
                            </div>
                            <div class="mb-2">
                                <FormControl
                                    id="repassword"
                                    type="password"
                                    placeholder="Enter your repassword ..."
                                    v-model="signup.repassword"
                                    :required="true"
                                    :showRequired="false"
                                />
                            </div>
                            <div class="d-grid gap-2 mt-3">
                                <button type="submit" class="btn btn-lg btn-primary">Sign up</button>
                            </div>
                        </MyFormProvider>
                    </div>
                    <div class="m-sm-3 animated fadeInRight">
                        Already have account? <router-link to="/account/sign-in">Log In</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Import package */
    import { reactive, ref, defineAsyncComponent } from "vue";
    /** Import global */
    import { DoRegist } from "@/services";
    import helpers from '@/global/helpers';
    /** Import Component */
    const MyFormProvider = defineAsyncComponent(() =>
        import("@/components/organisms/MyFormProvider.vue")
    );
    const FormControl = defineAsyncComponent(() =>
        import("@/components/molekuls/FormControl.vue")
    );

    /** Define variables */
    let isLoading = ref(false);
    const signup = reactive({
        fullname: "",
        email: "",
        password: "",
        repassword: ""
    });

    /** Define method */
    const onSubmit = async (isValid) => {
        if (condition) {
            isLoading.value = true;
            try {
                var res = await DoRegist(signup)
                
            } catch (error) {
                console.error(error);
                helpers.alertToast("error", "Something wrong when login!");
            } finally {
                isLoading.value = false;
            }
        }
    }
</script>