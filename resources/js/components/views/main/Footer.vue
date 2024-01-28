<template>
    <footer class="footer">
        <div class="page-up">
            <a href="#" id="scrollToTopButton">
                <i class="bi bi-chevron-up"></i>
            </a>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="footer__logo">
                        <a href="./index.html"><img :src="mylogo" alt=""></a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="footer__nav">
                        <ul>
                            <li class="active"><a href="./index.html">Homepage</a></li>
                            <li><a href="./categories.html">Categories</a></li>
                            <li><a href="./blog.html">Our Blog</a></li>
                            <li><a href="#">Contacts</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3">
                    <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    Copyright &copy; {{ state.currentYear }} All rights reserved | This website is made with <i class="bi bi-heart" aria-hidden="true"></i> by <a href="https://github.com/mohpais" target="_blank">FZ-Dev</a>
                    <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>

                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
    /** Import package */
    import { reactive } from "vue";

    /** Import images asset */
    import mylogo from '@/assets/images/logo/logo.png';

    /** Define Variable */
    let state = reactive({
        currentYear: new Date().getFullYear(),
    });

</script>