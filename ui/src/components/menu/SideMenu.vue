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
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    collapsible
    v-model:collapsed="isCollapsed"
    :trigger="null">
    <logo
      :collapsed="collapsed"/>
    <s-menu
      :collapsed="isCollapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"></s-menu>
  </a-layout-sider>

</template>

<script>
import Logo from '../header/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  computed: {
    isCollapsed () {
      return this.collapsed
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style lang="less" scoped>
.sider {
  background: #002868 !important;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 10;
  height: auto;

  :deep(.ant-layout-sider-children) {
    background: #002868 !important;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &:hover {
      overflow-y: auto;
    }
  }

  &.ant-fixed-sidemenu {
    position: fixed;
    height: 100%;
  }

  :deep(.ant-menu),
  :deep(.ant-menu-root),
  :deep(.ant-menu-light),
  :deep(.ant-menu-dark) {
    background: #002868 !important;
    border-right-color: transparent !important;
    color: #ffffff !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

    // Suppress default Ant Design right border indicator
    .ant-menu-item::after,
    .ant-menu-item-selected::after {
      display: none !important;
    }

    > .ant-menu-item,
    > .ant-menu-submenu > .ant-menu-submenu-title {
      margin: 3px 12px !important;
      width: calc(100% - 24px) !important;
      height: 42px !important;
      line-height: 42px !important;
      border-radius: 8px !important;
      color: #ffffff !important;
      font-size: 14.5px !important;
      font-weight: 500 !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      padding-left: 16px !important;
      padding-right: 16px !important;

      a {
        color: #ffffff !important;
        display: flex !important;
        align-items: center !important;
        width: 100% !important;
        height: 100% !important;
      }

      .anticon {
        color: #ffffff !important;
        font-size: 17px !important;
        margin-right: 12px !important;
      }

      span {
        color: #ffffff !important;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.08) !important;
        color: #ffffff !important;

        .anticon {
          color: #ffffff !important;
        }
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.14) !important;
      }
    }

    // Direct root menu items when selected (Dashboard, Events, Projects, Roles, Accounts, Domains, Extensions)
    > .ant-menu-item.ant-menu-item-selected,
    > .ant-menu-item.ant-menu-item-selected:hover,
    > .ant-menu-item.ant-menu-item-selected:active {
      background-color: #0b4ec7 !important;
      color: #ffffff !important;
      font-weight: 600 !important;
      border-radius: 8px !important;
      box-shadow: 0 2px 6px rgba(11, 78, 199, 0.35) !important;

      a,
      span,
      .anticon {
        color: #ffffff !important;
      }

      &::after {
        display: none !important;
      }
    }

    .ant-menu-submenu-title .ant-menu-submenu-arrow {
      color: #ffffff !important;
      right: 16px !important;
      opacity: 0.9;

      &::before,
      &::after {
        background: #ffffff !important;
      }
    }

    .ant-menu-submenu-open > .ant-menu-submenu-title,
    .ant-menu-submenu-selected > .ant-menu-submenu-title {
      background-color: #0b4ec7 !important;
      color: #ffffff !important;
      font-weight: 600 !important;
      border-radius: 8px !important;
      box-shadow: 0 2px 6px rgba(11, 78, 199, 0.35) !important;

      &:hover,
      &:active {
        background-color: #0b4ec7 !important;
      }

      .anticon {
        color: #ffffff !important;
      }

      .ant-menu-submenu-arrow {
        color: #ffffff !important;
        opacity: 1 !important;

        &::before,
        &::after {
          background: #ffffff !important;
        }
      }
    }

    .ant-menu-sub {
      background: transparent !important;
      padding: 3px 0 6px 0 !important;
      position: relative !important;

      &::after {
        content: '';
        display: block;
        height: 1px;
        background: rgba(255, 255, 255, 0.12);
        margin: 10px 14px 6px 14px;
      }

      .ant-menu-item {
        margin: 2px 10px !important;
        width: calc(100% - 20px) !important;
        height: 38px !important;
        line-height: 38px !important;
        padding-left: 42px !important;
        padding-right: 14px !important;
        border-radius: 6px !important;
        font-size: 13.5px !important;
        color: rgba(255, 255, 255, 0.92) !important;
        position: relative !important;
        transition: all 0.15s ease !important;

        a {
          color: rgba(255, 255, 255, 0.92) !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          height: 100% !important;
        }

        .anticon {
          color: #ffffff !important;
          font-size: 15px !important;
          margin-right: 12px !important;
        }

        span {
          color: rgba(255, 255, 255, 0.92) !important;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;

          a,
          span,
          .anticon {
            color: #ffffff !important;
          }
        }

        &:active {
          background-color: rgba(255, 255, 255, 0.16) !important;
        }

        &.ant-menu-item-selected,
        &.ant-menu-item-selected:hover,
        &.ant-menu-item-selected:active {
          background-color: #387cf6 !important;
          color: #ffffff !important;
          font-weight: 500 !important;
          box-shadow: 0 2px 6px rgba(56, 124, 246, 0.3) !important;
          overflow: hidden !important;

          &::before {
            content: '' !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 3.5px !important;
            background: #ffffff !important;
            border-radius: 3px 0 0 3px !important;
            z-index: 2 !important;
          }

          &::after {
            display: none !important;
          }

          a,
          span,
          .anticon {
            color: #ffffff !important;
          }
        }
      }
    }

    // General fallback for any other selected item in sider to avoid white background leakage
    .ant-menu-item-selected {
      background-color: #0b4ec7 !important;
      color: #ffffff !important;

      a,
      span,
      .anticon {
        color: #ffffff !important;
      }

      &::after {
        display: none !important;
      }
    }
  }

  &.light,
  &.dark {
    background: #002868 !important;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.25) !important;
  }
}
</style>
