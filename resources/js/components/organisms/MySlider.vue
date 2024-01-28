<template>
    <vueper-slides fade :touchable="false" autoplay :bullets="false" lazy lazy-load-on-drag fixed-height="550px">
        <template #arrow-left>
            <i class="bi bi-chevron-left"></i>
        </template>
        <template #arrow-right>
            <i class="bi bi-chevron-right"></i>
        </template>
        <vueper-slide
            v-for="(slide, i) in props.items"
            :key="i"
            :image="slide.image">
            <template v-if="props.loader" #loader>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </template>
            <template #content>
                <div class="row h-100 align-items-center">
                    <div class="col-lg-6 ms-5">
                        <div class="hero__text">
                            <div class="d flex">
                                <div v-for="(genre, key) in slide.genre" :key="key" class="label rounded me-1">{{ genre }}</div>
                            </div>
                            <h2>{{ slide.title }}</h2>
                            <p>{{ slide.content }}</p>
                            <router-link :to="slide.url"><span>Read Now</span></router-link>
                        </div>
                    </div>
                </div>
            </template>
        </vueper-slide>
    </vueper-slides>
</template>

<script setup>
    /** Import package */
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import 'vueperslides/dist/vueperslides.css';

    /** Define props */
    const props = defineProps({
        items: {
            type: Array,
            default: []
        },
        loader: {
            type: Boolean,
            default: false
        }
    });
</script>

<style>
    .vueperslide--loading .vueperslide__content-wrapper {
        display: none !important;
    }
</style>