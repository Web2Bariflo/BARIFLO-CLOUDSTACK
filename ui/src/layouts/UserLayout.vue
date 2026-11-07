// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

<template>
  <div id="userLayout" :class="['user-layout', device]">
    <a-button
      v-if="showClear"
      type="default"
      size="small"
      class="button-clear-notification"
      @click="onClearNotification">{{ $t('label.clear.notification') }}</a-button>
    <div class="user-layout-container">
      <div class="user-layout-header">
        <div class="user-layout-brand">
          <img
            src="/assets/bariflo_nav_logo.png"
            class="user-layout-bariflo-logo"
            alt="Bariflo Logo"
          />
          <div class="user-layout-brand-text">
            <span class="brand-apache">Bariflo</span><span class="brand-cloudstack">cloudstack</span><sup class="brand-tm">™</sup>
            <div class="brand-tagline">open source cloud computing</div>
          </div>
        </div>
      </div>
      <route-view></route-view>
    </div>
    <div class="user-layout-footer" v-if="$config.loginFooter || $config.resetPasswordFooter">
      <label v-if="$route.name === 'resetPassword' && $config.resetPasswordFooter" v-html="$config.resetPasswordFooter"></label>
      <label v-else v-html="$config.loginFooter"></label>
    </div>
  </div>
</template>

<script>
import RouteView from '@/layouts/RouteView'
import { mixinDevice } from '@/utils/mixin.js'
import notification from 'ant-design-vue/es/notification'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {
      showClear: false
    }
  },
  watch: {
    '$store.getters.darkMode' (darkMode) {
      if (darkMode) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    },
    '$store.getters.countNotify' (countNotify) {
      this.showClear = false
      if (countNotify && countNotify > 0) {
        this.showClear = true
      }
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
    const layoutMode = this.$config.theme['@layout-mode'] || 'light'
    this.$store.dispatch('SetDarkMode', (layoutMode === 'dark'))
    if (layoutMode === 'dark') {
      document.body.classList.add('dark-mode')
    }
    const countNotify = this.$store.getters.countNotify
    this.showClear = false
    if (countNotify && countNotify > 0) {
      this.showClear = true
    }
  },
  beforeUnmount () {
    document.body.classList.remove('userLayout')
    document.body.classList.remove('dark-mode')
  },
  methods: {
    onClearNotification () {
      notification.destroy()
      this.$store.commit('SET_COUNT_NOTIFY', 0)
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout {
  height: 100%;

  &-container {
    padding: 3rem 0;
    width: 100%;

    @media (min-height:600px) {
      padding: 0;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      margin-top: -50px;
    }
  }

  &-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 2rem;

    .mobile & {
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 1rem;
    }
  }

  &-bariflo-logo {
    height: 72px;
    width: auto;
    object-fit: contain;
    border-style: none;
    flex-shrink: 0;

    .mobile & {
      height: 48px;
    }
  }

  &-brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1;

    .brand-apache {
      font-size: 32px;
      font-weight: 400;
      color: #7b8794;
      letter-spacing: -0.5px;
      font-family: 'Arial', 'Helvetica Neue', sans-serif;
    }

    .brand-cloudstack {
      font-size: 32px;
      font-weight: 700;
      color: #4a90c4;
      letter-spacing: -0.5px;
      font-family: 'Arial', 'Helvetica Neue', sans-serif;
    }

    .brand-tm {
      font-size: 12px;
      color: #7b8794;
      vertical-align: super;
      margin-left: 2px;
    }

    .brand-tagline {
      font-size: 12px;
      color: #9aaab8;
      letter-spacing: 0.5px;
      margin-top: 4px;
      font-family: 'Arial', 'Helvetica Neue', sans-serif;
    }
  }

  &-logo {
    border-style: none;
    display: block;
    flex-shrink: 0;

    .mobile & {
      max-width: 240px;
    }
  }

  &-footer {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;

    @media (max-height: 600px) {
      position: relative;
      margin-top: 50px;
    }

    label {
      width: 368px;
      font-weight: 500;
      margin: 0 auto;
    }
  }
}
</style>
