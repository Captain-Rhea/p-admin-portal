<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div id="sectionHero">
    <div class="relative aspect-video w-full h-screen p-4 md:p-6">
      <NuxtImg
        src="/images/hero-img-2.jpg"
        alt="Hero Image"
        class="absolute inset-0 w-full h-full object-cover filter grayscale brightness-50"
      />
      <div
        class="absolute inset-0 flex items-center justify-center text-white text-center"
      >
        <div>
          <p>{{ t('welcome') }}</p>

          <div class="bg-white/10 py-1 px-2 rounded w-fit mx-auto">
            ประสบการณ์ที่ดีของผู้ใช้ คือหัวใจของซอฟต์แวร์ที่เราพัฒนา
          </div>
          <div class="text-6xl">Delivering Software That Inspires</div>
          <div class="text-6xl">and Impresses Every User</div>
          <p class="mt-4 max-w-lg mx-auto">
            เราพัฒนาซอฟต์แวร์ที่ไม่เพียงแค่ทำงานได้ดี
            แต่ยังสร้างประสบการณ์การใช้งานที่น่าประทับใจ
            ช่วยให้ธุรกิจของคุณเข้าถึงลูกค้าได้อย่างมีประสิทธิภาพ
            ตอบโจทย์ทุกความต้องการ
            และสร้างความสัมพันธ์ที่ยั่งยืนผ่านเทคโนโลยีที่ใช้ง่ายและล้ำสมัย
          </p>
          <div class="mt-8 flex items-center w-fit gap-6 mx-auto">
            <BaseCtaButton>ปรึกษาฟรี</BaseCtaButton>
            <div
              class="border rounded-md py-2 px-4 text-lg bg-white/10 cursor-pointer transition-all duration-200 hover:bg-white hover:text-blue-800"
            >
              โซลูชั่นของเรา
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
