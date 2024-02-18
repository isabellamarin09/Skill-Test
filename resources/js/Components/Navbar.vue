<script setup lang="ts"></script>

<template>
  <Toolbar
    :pt="{
      root: {
        class: 'navbar bg-body-white'
      }
    }"
  >
    <template #start>
      <a href="/">
        <img
          class="logo"
          height="26"
          width="104"
          src="https://reach.dog/img/reach_dog/Reachdog_primary_fog_small.png"
        />
      </a>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <Button
          type="button"
          label="Login"
          class="btn btn-link btn-sm text-decoration-none"
        />
        <Button
          label="Register"
          class="btn btn-primary btn-sm rounded-pill text-white"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
  .logo {
    filter: invert();
  }
</style>
