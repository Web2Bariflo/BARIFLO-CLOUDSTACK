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
  <a-layout-header v-if="!headerBarFixed" :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', theme ]" :style="{ padding: '0' }">
    <div v-if="mode === 'sidemenu'" class="header bariflo-header">
      <div class="header-left">
        <template v-if="device === 'mobile'">
          <menu-fold-outlined class="trigger" v-if="collapsed" @click="toggle" />
          <menu-unfold-outlined class="trigger" v-else @click="toggle" />
        </template>
        <template v-else>
          <menu-outlined class="trigger" @click="toggle" />
        </template>
        <project-menu />
        <saml-domain-switcher style="margin-left: 10px" />
        <div class="header-search-wrap" v-if="device !== 'mobile'">
          <a-input
            class="header-search-input"
            placeholder="Search networks, instances, IP addresses..."
            v-model:value="searchKeyword"
            @pressEnter="handleSearch"
          >
            <template #prefix>
              <search-outlined class="search-icon" />
            </template>
          </a-input>
        </div>
      </div>
      <div class="header-right">
        <user-menu :device="device"></user-menu>
      </div>
    </div>
    <div v-else :class="['top-nav-header-index', theme]">
      <div class="header-index-wide">
        <div class="header-index-left">
          <logo class="top-nav-header" :show-title="device !== 'mobile'" />
          <s-menu
            v-if="device !== 'mobile'"
            mode="horizontal"
            :menu="menus"
            :theme="theme"
          ></s-menu>
          <div v-else>
            <menu-fold-outlined class="trigger" v-if="collapsed" @click="toggle" />
            <menu-unfold-outlined class="trigger" v-else @click="toggle" />
          </div>
        </div>
        <project-menu />
        <saml-domain-switcher style="margin-left: 20px" />
        <user-menu></user-menu>
      </div>
    </div>

  </a-layout-header>
</template>

<script>
import Logo from '../header/Logo'
import SMenu from '../menu/'
import ProjectMenu from '../header/ProjectMenu'
import SamlDomainSwitcher from '../header/SamlDomainSwitcher'
import UserMenu from '../header/UserMenu'
import { MenuOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons-vue'

import { mixin } from '@/utils/mixin.js'

export default {
  name: 'GlobalHeader',
  components: {
    Logo,
    SMenu,
    ProjectMenu,
    SamlDomainSwitcher,
    UserMenu,
    MenuOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      headerBarFixed: false,
      searchKeyword: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (this.autoHideHeader) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 100) {
          this.headerBarFixed = true
        } else {
          this.headerBarFixed = false
        }
      } else {
        this.headerBarFixed = false
      }
    },
    toggle () {
      this.$emit('toggle')
    },
    handleSearch () {
      if (this.searchKeyword) {
        this.$router.push({ path: '/guestnetwork', query: { q: this.searchKeyword } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bariflo-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  height: 64px !important;
  background: #ffffff !important;
  border-bottom: 1px solid #f0f2f5 !important;
  padding: 0 16px 0 0 !important;
  white-space: nowrap !important;

  .header-left {
    display: flex !important;
    align-items: center !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }

  .header-right {
    display: flex !important;
    align-items: center !important;
    flex-shrink: 0 !important;
    white-space: nowrap !important;
    margin-left: 16px !important;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 20px;
    cursor: pointer;
    transition: color 0.3s;
    color: #1e293b;

    &:hover {
      color: #1890ff;
    }
  }

  .header-search-wrap {
    margin-left: 20px;
    width: 380px;
    max-width: 480px;

    .header-search-input {
      width: 100%;
      border-radius: 6px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      font-size: 13px;
      padding: 5px 12px;
      transition: all 0.2s;

      &:hover, &:focus {
        background: #ffffff;
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
      }

      .search-icon {
        color: #64748b;
        font-size: 15px;
        margin-right: 6px;
      }
    }
  }
}

.ant-layout-header {
  .anticon-menu-fold {
    font-size: 18px;
    line-height: 1;
  }

  .ant-breadcrumb {
    display: inline;
    vertical-align: middle;
  }
}
</style>
