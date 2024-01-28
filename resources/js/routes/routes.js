// import Cookies from 'js-cookie'
import { useAuthStore } from "@/stores";
import helpers from '@/global/helpers';

async function requireLogin(to, from, next) {
    const authStore = useAuthStore();
    await authStore.checkLogin();
    let authenticated, roles;
    roles = authStore.roleUser;
    authenticated = !!authStore.authenticated;
    if (authenticated) {
        if (to.meta.roles && !helpers.isSubArray(to.meta.roles, roles)) {
            next('/forbidden');
        } else {
            next()
        }
    } else {
        next({ name: "SignIn" })
    }
}

async function isLogin(to, from, next) {
    const authStore = useAuthStore();
    await authStore.checkLogin();
    let authenticated, roles;
    authenticated = !!authStore.authenticated;
    roles = authStore.roleUser;
    if (authenticated) {
        if (helpers.isSubArray(['Super Admin', 'Admin Base', 'Admin Content'], roles)) {
            next({ name: "Dashboard" });
        } else {
            next({ name: "Main" });
        }
    } else {
        next();
    }
}

export default [
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        meta: { layout: 'error-layout' },
        component: () => import("@/views/_errors/NotFound.vue"),
    },
    {
        path: "",
        name: "Main",
        redirect: { name: "Home" },
        meta: { layout: 'main-layout' },
        children: [
            {
                path: "/",
                name: "Home",
                component: () => import('@/views/Home.vue'),
            },
            {
                path: "/premium",
                name: "Premium",
                meta: { roles: ['premium-user'] },
                beforeEnter: requireLogin,
                component: () => import('@/views/Premium.vue'),
            }
        ]
    },
    {
        path: "/account",
        name: "Account",
        redirect: { name: "SignIn" },
        meta: { layout: 'logging-layout' },
        beforeEnter: isLogin,
        children: [
            {
                path: "/account/sign-in",
                name: "SignIn",
                component: () => import('@/views/_credentials/SignIn.vue'),
            },
            {
                path: "/account/sign-up",
                name: "SignUp",
                component: () => import('@/views/_credentials/SignUp.vue'),
            },
        ]
    },
    {
        path: "/panel",
        name: "Panel",
        redirect: { name: "Dashboard" },
        meta: { layout: "logged-layout", roles: ['Super Admin', 'Admin Base', 'Admin Content'] },
        beforeEnter: requireLogin,
        children: [
            {
                path: "/panel/dashboard",
                name: "Dashboard",
                component: () => import('@/views/_panels/Dashboard.vue'),
                meta: {
                    title: "Dashboard",
                    breadcrumbs: [
                        { name: `Home`, link: `` },
                        { name: "Dashboard", link: "/panel/dashboard" },
                    ],
                },
            },
            {
                path: "/panel/users",
                name: "User",
                redirect: { name: "UserList" },
                children: [
                    {
                        path: "/panel/users/",
                        name: "UserList",
                        component: () => import('@/views/_panels/user/List.vue'),
                        meta: {
                            title: "User List",
                            breadcrumbs: [
                                { name: `Home`, link: `/panel/` },
                                { name: "User", link: "/panel/users" },
                            ],
                        },
                    },
                    {
                        path: "/panel/users/add",
                        name: "UserAdd",
                        component: () => import('@/views/_panels/user/Add.vue'),
                        meta: {
                            title: "User Add",
                            breadcrumbs: [
                                { name: `Home`, link: `/panel/` },
                                { name: "User", link: "/panel/users/" },
                                { name: "Add", link: "/panel/users/add" },
                            ],
                        },
                    },
                    {
                        path: "/panel/users/edit/:id",
                        name: "UserEdit",
                        component: () => import('@/views/_panels/user/Edit.vue'),
                        meta: {
                            title: "User Edit",
                            breadcrumbs: [
                                { name: `Home`, link: `/panel/` },
                                { name: "User", link: "/panel/users/" },
                                { name: "Edit", link: "/panel/users/edit" },
                            ],
                        },
                    }
                ]
            },
            {
                path: "/panel/forms",
                name: "Forms",
                redirect: { name: "BasicInput" },
                children: [
                    {
                        path: "/panel/forms/basic-input",
                        name: "BasicInput",
                        component: () => import('@/views/_panels/components/Forms/BasicInput.vue'),
                        meta: {
                            title: "Basic Input",
                            breadcrumbs: [
                                { name: `Home`, link: `` },
                                { name: `Forms`, link: `/panel/forms` },
                                { name: `Basic Input`, link: `/panel/forms/basic-input` },
                            ],
                        },
                    },
                ]
            },
            {
                path: "/panel/profile",
                name: "Profile",
                component: () => import('@/views/_panels/Profile.vue'),
                meta: {
                    title: "Profile",
                    breadcrumbs: [
                        { name: 'Home', link: '' },
                        { name: "Profile", link: "/panel/profile" },
                    ],
                },
            }
        ]
    }
];
