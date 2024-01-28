<template>
    <!-- Hero Section Begin -->
    <section class="hero">
        <div class="container">
            <MySlider :items="slides" :loader="true" />
        </div>
    </section>
    <!-- Hero Section End -->

    <!-- Product Section Begin -->
    <section class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="trending__product">
                        <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-8">
                                <div class="section-title">
                                    <h4>Trending Now</h4>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <div class="btn__all">
                                    <a href="#" class="primary-btn">View All <i class="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div v-for="(trending, i) in trendings" :key="i" class="col-lg-4 col-md-6 col-sm-6">
                                <div class="product__item">
                                    <div class="product__item__pic set-bg" :style="{
                                        backgroundImage: `url('${trending.poster}')`
                                    }">
                                        <div class="ep">Chapter {{ trending.lastChapter }}</div>
                                        <div class="comment"><i class="bi bi-chat-fill"></i> {{ trending.comment }}</div>
                                        <div class="view"><i class="bi bi-eye-fill"></i> {{ trending.view }}</div>
                                    </div>
                                    <div class="product__item__text">
                                        <ul>
                                            <li v-for="(genre, key) in trending.genres" :key="key">{{ genre }}</li>
                                        </ul>
                                        <h5><a href="#">{{ trending.title }}</a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="popular__product">
                        <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-8">
                                <div class="section-title">
                                    <h4>Popular Shows</h4>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <div class="btn__all">
                                    <a href="#" class="primary-btn">View All <i class="bi bi-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div v-for="(popular, i) in populars" :key="i" class="col-lg-4 col-md-6 col-sm-6">
                                <div class="product__item">
                                    <div class="product__item__pic set-bg" :style="{
                                        backgroundImage: `url('${popular.poster}')`
                                    }">
                                        <div class="ep">Chapter {{ popular.lastChapter }}</div>
                                        <div class="comment"><i class="bi bi-chat-fill"></i> {{ popular.comment }}</div>
                                        <div class="view"><i class="bi bi-eye-fill"></i> {{ popular.view }}</div>
                                    </div>
                                    <div class="product__item__text">
                                        <ul>
                                            <li>Active</li>
                                            <li>Movie</li>
                                        </ul>
                                        <h5><a href="#">{{ popular.title }}</a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="product__sidebar">
                        <div class="product__sidebar__view">
                            <div class="section-title">
                                <h5>Top Views</h5>
                            </div>
                            <ul class="filter__controls">
                                <li class="active" data-filter="*">Day</li>
                                <li data-filter=".week">Week</li>
                                <li data-filter=".month">Month</li>
                                <li data-filter=".years">Years</li>
                            </ul>
                            <div class="filter__gallery">
                                <div v-for="(view, key) in topViews" :key="key" class="product__sidebar__view__item set-bg mix day years" :style="{
                                        backgroundImage: `url('${view.poster}')`
                                    }">
                                    <div class="ep">Chapter {{ view.chapter }}</div>
                                    <div class="view"><i class="fa fa-eye"></i> {{ view.total }}</div>
                                    <h5><a href="#">{{ view.title }}</a></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Section End -->
</template>

<script setup>
    /** Import package */
    import { defineAsyncComponent } from "vue";

    /** Import image */
    import hero from "@/assets/images/hero/hero-1.jpg";
    import trend1 from "@/assets/images/trending/trend-1.jpg";
    import trend2 from "@/assets/images/trending/trend-2.jpg";
    import trend3 from "@/assets/images/trending/trend-3.jpg";
    import trend4 from "@/assets/images/trending/trend-4.jpg";
    import trend5 from "@/assets/images/trending/trend-5.jpg";
    import trend6 from "@/assets/images/trending/trend-6.jpg";
    import popular1 from "@/assets/images/popular/popular-1.jpg";
    import popular2 from "@/assets/images/popular/popular-2.jpg";
    import popular3 from "@/assets/images/popular/popular-3.jpg";
    import popular4 from "@/assets/images/popular/popular-4.jpg";
    import popular5 from "@/assets/images/popular/popular-5.jpg";
    import popular6 from "@/assets/images/popular/popular-6.jpg";
    import tv1 from "@/assets/images/sidebar/tv-1.jpg";
    import tv2 from "@/assets/images/sidebar/tv-2.jpg";
    import tv3 from "@/assets/images/sidebar/tv-3.jpg";
    import tv4 from "@/assets/images/sidebar/tv-4.jpg";
    import tv5 from "@/assets/images/sidebar/tv-5.jpg";

    /** Define component */
    const MySlider = defineAsyncComponent(() =>
        import("@/components/organisms/MySlider.vue")
    );

    /** Define variables */
    const slides = [
        {
            genre: ['Adventure'],
            title: 'Fate / Stay Night: Unlimited Blade Works',
            content: 'After 30 days of travel across the world...',
            url: "",
            image: hero
        },
        {
            genre: ['Hentai'],
            title: 'Slide #2',
            content: 'Slide 2 content.',
            url: "",
            image: hero
        }
    ];

    const trendings = [
        {
            lastChapter: 202,
            poster: trend1,
            genres: ["Active", "Movie"],
            title: "The Seven Deadly Sins: Wrath of the Gods",
            comment: 11,
            view: 9141
        },
        {
            lastChapter: 187,
            poster: trend2,
            genres: ["Active", "Movie"],
            title: "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien",
            comment: 2,
            view: 76
        },
        {
            lastChapter: 322,
            poster: trend3,
            genres: ["Active", "Movie"],
            title: "Shingeki no Kyojin Season 3 Part 2",
            comment: 0,
            view: 12
        },
        {
            lastChapter: 322,
            poster: trend4,
            genres: ["Active", "Movie"],
            title: "Fullmetal Alchemist: Brotherhood",
            comment: 0,
            view: 12
        },
        {
            lastChapter: 322,
            poster: trend5,
            genres: ["Active", "Movie"],
            title: "Shiratorizawa Gakuen Koukou",
            comment: 0,
            view: 12
        },
        {
            lastChapter: 322,
            poster: trend6,
            genres: ["Active", "Movie"],
            title: "Code Geass: Hangyaku no Lelouch R2",
            comment: 0,
            view: 12
        }
    ];

    const topViews = [
        {
            chapter: 202,
            poster: tv1,
            title: "Boruto: Naruto next generations",
            total: 9141
        },
        {
            chapter: 187,
            poster: tv2,
            title: "The Seven Deadly Sins: Wrath of the Gods",
            total: 76
        },
        {
            chapter: 322,
            poster: tv3,
            title: "Sword art online alicization war of underworld",
            total: 112
        },
        {
            chapter: 217,
            poster: tv4,
            title: "Fate/stay night: Heaven's Feel I. presage flower",
            total: 46
        },
        {
            chapter: 54,
            poster: tv5,
            title: "Fate stay night unlimited blade works",
            total: 12
        }
    ];

    const populars = [
        {
            lastChapter: 202,
            poster: popular1,
            genres: ["Active", "Movie"],
            title: "Sen to Chihiro no Kamikakushi",
            comment: 11,
            view: 9141
        },
        {
            lastChapter: 187,
            poster: popular2,
            genres: ["Active", "Movie"],
            title: "Kizumonogatari III: Reiket su-hen",
            comment: 2,
            view: 76
        },
        {
            lastChapter: 322,
            poster: popular3,
            genres: ["Active", "Movie"],
            title: "Shirogane Tamashii hen Kouhan sen",
            comment: 0,
            view: 12
        },
        {
            lastChapter: 322,
            poster: popular4,
            genres: ["Active", "Movie"],
            title: "Rurouni Kenshin: Meiji Kenkaku Romantan",
            comment: 0,
            view: 12
        },
        {
            lastChapter: 322,
            poster: popular5,
            genres: ["Active", "Movie"],
            title: "Mushishi Zoku Shou 2nd Season",
            comment: 0,
            view: 12
        },
        {
            lastChapter: 322,
            poster: popular6,
            genres: ["Active", "Movie"],
            title: "Monogatari Series: Second Season",
            comment: 0,
            view: 12
        }
    ];
</script>