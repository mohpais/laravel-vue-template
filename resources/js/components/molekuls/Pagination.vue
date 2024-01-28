<template>
    <nav>
        <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                <a class="page-link" type="button" @click.prevent="changePage(currentPage - 1)">
                    Previous
                </a>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" :class="{ 'active': page === currentPage }">
                <a class="page-link" type="button" @click.prevent="changePage(page)">
                    {{ page }}
                </a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === lastPage }">
                <a class="page-link" type="button" @click.prevent="changePage(currentPage + 1)">
                    Next
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    /** Import package */
    import { computed } from 'vue';

    /** Define props */
    const props = defineProps({
        pagination: {
            type: Object,
            required: true,
        },
    });

    /** Define variable */
    let currentPage = computed(() => props.pagination.currentPage);
    let lastPage = computed(() => props.pagination.lastPage);

    // Generate pages array
    let pages = computed(() => Array.from({ length: lastPage.value }, (_, index) => index + 1));

    /** Define emit */
    const emits = defineEmits(["page-change"]);

    /** Define method */
    const changePage = (page) => {
        if (page >= 1 && page <= lastPage.value) {
            return emits('page-change', page);
        }
    }
</script>