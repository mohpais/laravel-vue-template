<template>
    <header class="header sticky-top d-flex align-items-center shadow-sm">
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-auto my-auto">
                    <router-link class="navbar-brand" to="/">
                        <img :src="mylogo" alt="..." />
                    </router-link>
                </div>
                <div class="col-8">
                    <div class="header__nav row my-auto">
                        <nav class="header__menu">
                            <ul>
                                <li><router-link to="/">Home</router-link></li>
                                <li class="dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Categories
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="./categories.html">Categories</a></li>
                                        <li><a class="dropdown-item" href="./anime-details.html">Anime Details</a></li>
                                        <li><a class="dropdown-item" href="./anime-watching.html">Anime Watching</a></li>
                                        <li><a class="dropdown-item" href="./blog-details.html">Blog Details</a></li>
                                        <li><a class="dropdown-item" href="./signup.html">Sign Up</a></li>
                                        <li><a class="dropdown-item" href="./login.html">Login</a></li>
                                    </ul>
                                </li>
                                <li class="active"><a href="./blog.html">Our Blog</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-auto profile-menu">
                    <div class="d-flex align-items-center h-100">
                        <a href="#" class="search-switch fz-18 text-white me-3">
                            <i class="bi bi-search"></i>
                        </a>
                        <router-link v-if="!authenticatedUser" class="fz-18 text-white me-3" :to="{ name: 'Account' }">
                            <i class="bi bi-person"></i>
                        </router-link>
                        <div v-else class="dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="profile-pic">
                                    <img src="https://source.unsplash.com/250x250?girl" alt="Profile Picture">
                                </div>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#"><i class="bi bi-sliders fw-bold"></i> Account</a></li>
                                <li><a class="dropdown-item" href="#"><i class="bi bi-gear fw-bold"></i> Settings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a type="button" @click="handleLogout" class="dropdown-item" href="#"><i class="bi bi-box-arrow-right fw-bold"></i> Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>
</template>

<script setup>
    /**  Define props */
    const props = defineProps({
        authenticatedUser: {
            type: Object,
            default: null
        }
    });

    /** Import images asset */
    import mylogo from '@/assets/images/logo/logo.png';

    const emits = defineEmits(["handleLogout"]);

    const handleLogout = () => {
        return emits("handleLogout");
    };
</script>

<style>
    /* Profile Picture */
    .profile-pic{
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
    }

    .profile-pic img{
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .profile-menu .dropdown-menu {
        right: 0;
        left: unset;
    }
    
    .profile-menu .fa-fw {
        margin-right: 10px;
    }

    .toggle-change::after {
        border-top: 0;
        border-bottom: 0.3em solid;
    }

    .dropdown-toggle::after {
        color: #fff;
    }

    .profile-menu .dropdown-menu {
        transform: translate(0px, 52px) !important;
    }
</style>