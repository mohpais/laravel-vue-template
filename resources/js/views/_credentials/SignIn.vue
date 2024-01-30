<template>
    <!-- <div class="panel-body py-5">
            <div class="row justify-content-center">
                <div class="col-sm-10 text-center animated fadeInDown">
                    <h4 class="fw-bold">Sign in to <router-link class="fw-bold" to="/">TNovel</router-link></h4>
                    <div class="d-flex authentication-third mb-4">
                        <div class="w-60 mx-auto">
                            <button class="btn btn-text">
                                <i class="bi bi-facebook" style="font-size: 18px;"></i>
                            </button>
                            <button class="btn btn-text">
                                <i class="bi bi-google fz-16"></i>
                            </button>
                        </div>
                    </div>
                    <small class="text-secondary fz-12">Or use your <span class="fw-bold fz-11">Registed account!</span></small>
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-sm-9 form-submit">
                    <form @submit.prevent="onSubmit" novalidate autocomplete="off">
                        <div class="form-group mb-2 animated fadeInUp">
                            <label for="email" class="fz-11 font-poppins-bold">Username</label>
                            <input type="text" class="form-control my-input" name="email" id="email"
                                placeholder="Silahkan ketik username Anda" v-model="signin.email" required>
                        </div>
                        <div class="form-group mb-4 position-relative animated fadeInUp delay-1">
                            <label for="password" class="fz-11 font-poppins-bold">Password</label>
                            <input :type="!showPass ? 'password' : 'text'" class="form-control my-input pe-5" name=""
                                id="password" placeholder="Silahkan ketik password Anda" v-model="signin.password" required>
                            <i v-if="!showPass" @click="showPass = true" class="bi bi-eye-fill cursor" 
                                style="position: absolute; right: 10px; bottom: 7px;"></i>
                            <i v-if="showPass" @click="showPass = false" class="bi bi-eye-slash-fill cursor"
                                style="position: absolute; right: 10px; bottom: 7px;"></i>
                        </div>
                        <div class="row">
                            <div class="my-auto col animated fadeInRight fz-12">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div class="my-auto col-auto">
                                <button ref="btnSignIn" type="submit"
                                    :disabled="isLoading"
                                    class="px-4 btn btn-primary rounded-pill muli-ex-bold animated fadeInLeft my-btn">
                                    <span class="trantition" v-if="!isLoading">Sign In</span>
                                    <span class="trantition" v-else>Please wait! </span>
                                    <i v-if="!isLoading" class="bi bi-arrow-right d-inline ms-2 font-13"></i>
                                    <div v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button>
                                <i v-if="isLoading" class="fas fa-spinner fa-spin ms-2"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> -->
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
        <div class="d-table-cell align-middle">
            <div class="card">
                <div class="card-body">
                    <div class="m-sm-3">
                        <div class="d-grid gap-2 mb-3">
                            <a class="btn btn-google btn-lg animated fadeInUp delay-1" href="/"><i class="bi bi-google"></i> Sign in with Google</a>
                            <a class="btn btn-facebook btn-lg animated fadeInUp delay-1" href="/"><i class="bi bi-facebook"></i> Sign in with Facebook</a>
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
                        <MyFormProvider id="sign-in-form" :formData="signin" @onSubmit="onSubmit">
                            <div class="mb-2 animated fadeInUp delay-1">
                                <FormControl
                                    id="email"
                                    placeholder="Enter your email ..."
                                    v-model="signin.email"
                                    :required="true"
                                    :showRequired="false"
                                />
                            </div>
                            <div class="mb-2 animated fadeInUp delay-1">
                                <FormControl
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password ..."
                                    v-model="signin.password"
                                    :required="true"
                                    :showRequired="false"
                                />
                                <small>
                                    <a href="/pages-reset-password">Forgot password?</a>
                                </small>
                            </div>
                            <div>
                                <div class="form-check align-items-center">
                                    <input id="customControlInline" type="checkbox" class="form-check-input" value="remember-me" name="remember-me" checked="">
                                    <label class="form-check-label text-small" for="customControlInline">Remember me</label>
                                </div>
                            </div>
                            <div class="d-grid gap-2 mt-3">
                                <button ref="btnSignIn" type="submit" class="btn btn-lg btn-primary">
                                    <span class="trantition" v-if="!isLoading">Sign In</span>
                                    <span class="trantition" v-else>Please wait! </span>
                                    <i v-if="!isLoading" class="bi bi-arrow-right d-inline ms-2 font-13"></i>
                                    <div v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button>
                            </div>
                        </MyFormProvider>
                    </div>
                    <div class="m-sm-3 animated fadeInRight">
                        <div class="">
                            Don't have an account? <router-link to="/account/sign-up">Sign up</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="text-center mb-3">
                Don't have an account? <router-link to="/account/sign-up">Sign up</router-link>
            </div> -->
        </div>
    </div>
</template>

<script setup>
    /** Import package */
    import { reactive, ref, defineAsyncComponent } from "vue";
    /** Import global */
    import { DoLogin } from "@/services"; // Import from Global Packages
    import helpers from '@/global/helpers';
    /** Import Component */
    const MyFormProvider = defineAsyncComponent(() =>
        import("@/components/organisms/MyFormProvider.vue")
    );
    const FormControl = defineAsyncComponent(() =>
        import("@/components/molekuls/FormControl.vue")
    );

    /**  Define variables */
    let btnSignIn = ref(false); 
    let isLoading = ref(false); 
    const signin = reactive({
        email: "",
        password: ""
    });

    /** Define method */
    const onSubmit = async (isValid) => {
        if (isValid) {
            isLoading.value = true;
            try {
                let res = await DoLogin(signin);
                if (res.data.success) {
                    let data = res.data;
                    var btnElement = btnSignIn.value;
                    btnElement.setAttribute('disabled', 'true');
                    var authorization = data.token;
                    var user = data.user;
                    var role = data.role;
                    sessionStorage.setItem("_xa", authorization);
                    sessionStorage.setItem("_us", helpers.enc(JSON.stringify(user), 1, 6));
                    sessionStorage.setItem("_rl", helpers.enc(JSON.stringify(role), 1, 6));
                    window.location.reload();
                } else {
                    helpers.alertToast("error", res.data.message);
                }
            } catch (error) {
                console.error(error);
                helpers.alertToast("error", "Something wrong when login!");
            } finally {
                isLoading.value = false;
            }
        }
    }
</script>

<style></style>