
<!--
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements. See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership. The ASF licenses this file
  to you under the Apache License, Version 2.0.
-->


<template>
  <div
    class="bariflo-logo-wrapper"
    :class="{ collapsed: collapsed }"
  >
    <router-link to="/" class="bariflo-logo-link">

      <!-- Original Bariflo logo -->
      <img
        :src="logoSrc"
        alt="Bariflo Logo"
        class="bariflo-logo-image"
      />

      <!-- Text on the right side of the logo -->
      <div v-if="!collapsed" class="bariflo-logo-text">
        <span class="logo-title">Bariflo</span>
        <span class="logo-subtitle">DATACENTER</span>
        <span class="logo-tagline">CloudStack Portal</span>
      </div>

    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',

  props: {
    title: {
      type: String,
      default: 'Bariflo',
      required: false
    },

    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },

    collapsed: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data () {
    return {
      logoSrc: '/assets/bariflo_nav_logo.png'
    }
  }
}
</script>

<style lang="less" scoped>
.bariflo-logo-wrapper {
  width: 100%;
  height: 74px;
  min-height: 74px;

  display: flex;
  align-items: center;

  padding: 8px 12px;
  background: #002868;

  box-sizing: border-box;
  overflow: hidden;
  user-select: none;

  .bariflo-logo-link {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    text-decoration: none;
    overflow: hidden;
  }

  .bariflo-logo-image {
    width: 88px;
    height: 54px;

    display: block;
    object-fit: contain;
    object-position: center;

    flex-shrink: 0;
  }

  .bariflo-logo-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    min-width: 0;
    overflow: hidden;

    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.15;
  }

  .logo-title {
    color: #65a5ff;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.2;
  }

  .logo-subtitle {
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.7px;
    line-height: 1.4;
  }

  .logo-tagline {
    color: #ffffff;
    font-size: 10px;
    font-weight: 400;
    line-height: 1.4;
    white-space: nowrap;
  }

  // Collapsed sidebar
  &.collapsed {
    padding: 8px 6px;

    .bariflo-logo-link {
      justify-content: center;
    }

    .bariflo-logo-image {
      width: 52px;
      height: 48px;
    }
  }
}
</style>
