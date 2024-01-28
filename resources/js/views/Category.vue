<template>
    <!-- Breadcrumb Begin -->
    <div class="breadcrumb-option">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <a href="./index.html"><i class="bi bi-house-fill"></i> Home</a>
                        <a href="./categories.html">Categories</a>
                        <span>Action</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Product Section Begin -->
    <section class="product-page spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="product__page__content">
                        <div class="product__page__title">
                            <div class="row">
                                <div class="col">
                                    <div class="section-title">
                                        <h4>Action</h4>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="product__page__filter">
                                        <p style="font-size: 20px">
                                            <!-- <i class="bi bi-sort-alpha-up-alt"></i> -->
                                            <i class="bi bi-sort-alpha-down-alt"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div v-for="(category, key) in categories" :key="key" @mouseover="setHovered(key, true)" @mouseleave="setHovered(key, false)" class="col-lg-3 col-md-6 col-sm-6">
                                <div class="product__item">
                                    <div class="product__item__pic" :class="{ 'set-bg': isHovered[key] }" :style="{
                                        backgroundImage: `url('${category.poster}')`
                                    }">
                                        <div class="ep">Chapter {{ category.chapter }}</div>
                                        <div class="comment"><i class="bi bi-chat-fill"></i> {{ category.comment }}</div>
                                        <div class="view"><i class="bi bi-eye-fill"></i> {{ category.view }}</div>
                                    </div>
                                    <div class="product__item__text">
                                        <ul>
                                            <li v-for="(genre, i) in category.genres" :key="i">{{ genre }}</li>
                                        </ul>
                                        <h5><router-link :to="{ name: 'Detail', params: { slug: category.slug ?? '' } }">{{ category.title }}</router-link></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product__pagination d-flex justify-content-center">
                        <a href="#"><i class="bi bi-chevron-double-left"></i></a>
                        <a href="#" class="current-page">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#"><i class="bi bi-chevron-double-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Section End -->
</template>

<script setup>
    /** Import package */
    import { ref } from 'vue';

    /** Import image */
    import trend1 from "@/assets/images/trending/trend-1.jpg";
    import trend2 from "@/assets/images/trending/trend-2.jpg";
    import trend3 from "@/assets/images/trending/trend-3.jpg";
    import trend4 from "@/assets/images/trending/trend-4.jpg";
    import trend5 from "@/assets/images/trending/trend-5.jpg";
    import trend6 from "@/assets/images/trending/trend-6.jpg";

    const setHovered = (index, value) => {
        isHovered.value[index] = value;
    };

    const categories = [
        {
            chapter: 202,
            poster: trend1,
            genres: ["Active", "Movie"],
            title: "The Seven Deadly Sins: Wrath of the Gods",
            slug: "the-seven-deadly-sins-Wrath-of-the-gods",
            comment: 11,
            view: 9141
        },
        {
            chapter: 187,
            poster: trend2,
            genres: ["Active", "Movie"],
            title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien",
            slug: "the-seven-deadly-sins-Wrath-of-the-gods",
            comment: 2,
            view: 76
        },
        {
            chapter: 322,
            poster: trend3,
            genres: ["Active", "Movie"],
            title: "Shingeki no Kyojin Season 3 Part 2",
            slug: "the-seven-deadly-sins-Wrath-of-the-gods",
            comment: 0,
            view: 12
        },
        {
            chapter: 322,
            poster: trend4,
            genres: ["Active", "Movie"],
            title: "Fullmetal Alchemist: Brotherhood",
            slug: "the-seven-deadly-sins-Wrath-of-the-gods",
            comment: 0,
            view: 12
        },
        {
            chapter: 322,
            poster: trend5,
            genres: ["Active", "Movie"],
            title: "Shiratorizawa Gakuen Koukou",
            slug: "the-seven-deadly-sins-Wrath-of-the-gods",
            comment: 0,
            view: 12
        },
        {
            chapter: 322,
            poster: trend6,
            genres: ["Active", "Movie"],
            title: "Code Geass: Hangyaku no Lelouch R2",
            slug: "the-seven-deadly-sins-Wrath-of-the-gods",
            comment: 0,
            view: 12
        }
    ];

    const isHovered = ref(Array(categories.length).fill(false));

</script>