<template>
    <main class="d-flex w-100 h-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100 animated fadeInDown">
				<router-view></router-view>
			</div>
		</div>
	</main>
</template>

<script setup>
    /** Import custom css */
    import '@/assets/css/mycustom.css';
</script>

<style>
</style>