<script setup></script>

<template>
  <div class="space-y-2">
    <div class="border">Header Image</div>
    <div class="border">How Tech Shapes the Future of Work in 2024</div>
    <div v-for="item in 30" :key="item" class="border h-[200px]">BOX</div>
  </div>
</template>
