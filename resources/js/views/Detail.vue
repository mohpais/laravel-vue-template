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
    <!-- Breadcrumb End -->

    <!-- Anime Section Begin -->
    <section class="anime-details spad">
        <div class="container">
            <div class="anime__details__content">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="anime__details__pic set-bg" :style="{
                            backgroundImage: `url('${detailpic}')`
                        }">
                            <div class="comment"><i class="bi bi-chat-fill"></i> 11</div>
                            <div class="view"><i class="bi bi-eye-fill"></i> 9141</div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="anime__details__text">
                            <div class="anime__details__title">
                                <h3>Fate Stay Night: Unlimited Blade</h3>
                                <span>フェイト／ステイナイト, Feito／sutei naito</span>
                            </div>
                            <div class="anime__details__rating">
                                <div class="rating">
                                    <a href="#"><i class="bi bi-star-fill"></i></a>
                                    <a href="#"><i class="bi bi-star-fill"></i></a>
                                    <a href="#"><i class="bi bi-star-fill"></i></a>
                                    <a href="#"><i class="bi bi-star-half"></i></a>
                                    <a href="#"><i class="bi bi-star"></i></a>
                                </div>
                                <span>1.029 Votes</span>
                            </div>
                            <p>Every human inhabiting the world of Alcia is branded by a “Count” or a number written on
                                their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss,
                                never to be seen again. But her mother’s last words send Hina on a quest to find a
                            legendary hero from the Waste War - the fabled Ace!</p>
                            <div class="anime__details__widget">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <ul>
                                            <li><span>Type:</span> TV Series</li>
                                            <li><span>Studios:</span> Lerche</li>
                                            <li><span>Date aired:</span> Oct 02, 2019 to ?</li>
                                            <li><span>Status:</span> Airing</li>
                                            <li><span>Genre:</span> Action, Adventure, Fantasy, Magic</li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <ul>
                                            <li><span>Scores:</span> 7.31 / 1,515</li>
                                            <li><span>Rating:</span> 8.5 / 161 times</li>
                                            <li><span>Duration:</span> 24 min/ep</li>
                                            <li><span>Quality:</span> HD</li>
                                            <li><span>Views:</span> 131,541</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="anime__details__btn">
                                <a href="#" class="follow-btn"><i class="fa fa-heart-o"></i> Follow</a>
                                <a href="#" class="watch-btn"><span>Read Now</span> <i class="bi bi-chevron-compact-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-md-8">
                    <div class="anime__details__review">
                        <div class="section-title">
                            <h5>Reviews</h5>
                        </div>
                        <div v-for="(review, key) in reviewer" :key="key" class="anime__review__item">
                            <div class="anime__review__item__pic">
                                <img :src="review.photo" alt="...">
                            </div>
                            <div class="anime__review__item__text">
                                <h6>{{ review.name }} - <span>{{ review.time }} Hour ago</span></h6>
                                <p>{{ review.comment }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="anime__details__form">
                        <div class="section-title">
                            <h5>Your Comment</h5>
                        </div>
                        <form action="#">
                            <textarea placeholder="Your Comment"></textarea>
                            <button type="submit"><i class="fa fa-location-arrow"></i> Review</button>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <div class="anime__details__sidebar">
                        <div class="section-title">
                            <h5>you might like...</h5>
                        </div>
                        <div v-for="(relate, key) in related" :key="key" class="product__sidebar__view__item set-bg" :style="{
                            backgroundImage: `url('${relate.poster}')`
                        }">
                            <div class="ep">Chapter {{ relate.chapter }}</div>
                            <div class="view"><i class="bi bi-eye"></i> 9141</div>
                            <h5><a href="#">Boruto: Naruto next generations</a></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Anime Section End -->
</template>

<script setup>
    import detailpic from "@/assets/images/details-pic.jpg";
    import photo1 from "@/assets/images/anime/review-1.jpg";
    import photo2 from "@/assets/images/anime/review-2.jpg";
    import photo3 from "@/assets/images/anime/review-3.jpg";
    import photo4 from "@/assets/images/anime/review-4.jpg";
    import trend1 from "@/assets/images/trending/trend-1.jpg";
    import trend2 from "@/assets/images/trending/trend-2.jpg";
    import trend3 from "@/assets/images/trending/trend-3.jpg";
    import trend4 from "@/assets/images/trending/trend-4.jpg";
    import trend5 from "@/assets/images/trending/trend-5.jpg";
    import trend6 from "@/assets/images/trending/trend-6.jpg";
    const reviewer = [
        {
            name: 'Chris Curry',
            time: 1,
            photo: photo1,
            comment: "whachikan Just noticed that someone categorized this as belonging to the genre `demons` LOL"
        },
        {
            name: 'Lewis Mann',
            time: 5,
            photo: photo2,
            comment: "Finally it came out ages ago"
        },
        {
            name: 'Louis Tyler',
            time: 3,
            photo: photo3,
            comment: "Where is the episode 15 ? Slow update! Tch"
        },
        {
            name: 'Chris Curry',
            time: 2,
            photo: photo4,
            comment: "Where is the episode 15 ? Slow update! Tch"
        },
    ];

    const related = [
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
</script>