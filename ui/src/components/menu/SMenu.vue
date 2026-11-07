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
  <a-menu
      :mode="mode"
      :theme="theme"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @click="selectMenu"
      @openChange="onOpenChange"
    >
    <template v-for="(item, index) in menuData" :key="index">
      <a-sub-menu v-if="item.children && !item.hideChildrenInMenu" :key="item.path">
        <template #title>
          <span>
            <render-icon
            v-if="item.meta.icon && typeof (item.meta.icon) === 'string'"
            :icon="item.meta.icon"
            @click="() => { handleClickParentMenu(item) }" />
            <span @click="() => { handleClickParentMenu(item) }">{{ $t(item.meta.title) }}</span>
          </span>
        </template>
        <template v-for="children in item.children" :key="children.path">
          <a-menu-item :key="children.path" v-if="!children.hidden">
            <router-link :to="{ name: children.name, target: children.meta.target || null }">
              <render-icon
                v-if="children.meta.icon && typeof (children.meta.icon) === 'string'"
                :icon="children.meta.icon" />
              <font-awesome-icon
                v-else-if="children.meta.icon && Array.isArray(children.meta.icon)"
                :icon="children.meta.icon"
                class="anticon"
                :style="{ color: '#ffffff' }" />
              <render-icon v-else :svgIcon="children.meta.icon" />
              <span>{{ $t(children.meta.title) }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
      <a-menu-item v-else :key="item.path">
        <router-link :to="{ name: item.name, target: item.meta.target || null }">
          <render-icon
            v-if="item.meta.icon && typeof (item.meta.icon) === 'string'"
            :icon="item.meta.icon"
            @click="() => { handleClickParentMenu(item) }" />
          <font-awesome-icon
            v-else-if="item.meta.icon && Array.isArray(item.meta.icon)"
            :icon="item.meta.icon"
            class="anticon"
            :style="{ color: '#ffffff' }"
            @click="() => { handleClickParentMenu(item) }" />
          <span>{{ $t(item.meta.title) }}</span>
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>

export default {
  name: 'SMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      cachedPath: null
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menu.forEach(item => keys.push(item.path))
      return keys
    },
    menuData () {
      return this.menu.filter(item => !item.hidden)
    }
  },
  created () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      this.openKeys = val ? [] : this.cachedOpenKeys
    },
    '$route.fullPath': function () {
      this.updateMenu()
    }
  },
  methods: {
    isNetworkRoute (path) {
      const p = path || this.$route.path
      const networkRoutes = [
        '/network',
        '/guestnetwork',
        '/ispnetwork',
        '/ispnetworks',
        '/jionetwork',
        '/airtelnetwork',
        '/jio',
        '/airtel',
        '/instances',
        '/generalnetwork',
        '/pingnetwork',
        '/localnetwork',
        '/vpc',
        '/publicip',
        '/s2svpn'
      ]
      return networkRoutes.some(item => p === item || p.startsWith(item + '/') || p.startsWith(item + '?'))
    },
    getNetworkActiveKey (path) {
      const p = path || this.$route.path
      const q = this.$route.query || {}
      const cat = (q.category || '').toLowerCase()

      if (p.startsWith('/generalnetwork')) return '/generalnetwork'
      if (p.startsWith('/pingnetwork')) return '/pingnetwork'
      if (p.startsWith('/localnetwork')) return '/localnetwork'
      if (p.startsWith('/vpc')) return '/vpc'

      if (p.startsWith('/jionetwork') || p.startsWith('/airtelnetwork') || p.startsWith('/jio') || p.startsWith('/airtel')) {
        if (cat === 'ping') return '/pingnetwork'
        if (cat === 'local') return '/localnetwork'
        if (cat === 'global' || cat === 'vpc') return '/vpc'
        if (cat === 'general') return '/generalnetwork'
        return '/generalnetwork'
      }

      if (p.startsWith('/instances')) {
        const type = (q.type || '').toLowerCase()
        if (type.includes('ping')) return '/pingnetwork'
        if (type.includes('local')) return '/localnetwork'
        if (type.includes('vpc') || type.includes('global')) return '/vpc'
        return '/generalnetwork'
      }

      if (p.startsWith('/guestnetwork')) return '/guestnetwork'
      if (p.startsWith('/ispnetwork') || p.startsWith('/ispnetworks')) return '/ispnetwork'
      if (p.startsWith('/publicip')) return '/publicip'
      if (p.startsWith('/s2svpn')) return '/s2svpn'
      return null
    },
    selectMenu (obj) {
      this.selectedKeys = [obj.key]
      if (this.isNetworkRoute(obj.key) && !this.openKeys.includes('/network')) {
        this.openKeys = [...this.openKeys, '/network']
        this.cachedOpenKeys = this.openKeys
      }
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      let nextOpenKeys = []
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        nextOpenKeys = openKeys
      } else {
        nextOpenKeys = latestOpenKey ? [latestOpenKey] : []
      }

      if (this.isNetworkRoute() && !nextOpenKeys.includes('/network')) {
        nextOpenKeys.push('/network')
      }

      this.openKeys = nextOpenKeys
      this.cachedOpenKeys = nextOpenKeys
    },
    updateMenu () {
      if (this.isNetworkRoute()) {
        const activeKey = this.getNetworkActiveKey() || '/guestnetwork'
        this.selectedKeys = [activeKey]
        const openKeys = ['/network']
        this.cachedPath = activeKey
        this.cachedOpenKeys = openKeys
        if (!this.collapsed) {
          this.openKeys = openKeys
        }
        return
      }

      const routes = this.$route.matched.concat()

      if (routes.length >= 4 && this.$route.meta.hidden) {
        routes.pop()
        this.selectedKeys = [routes[2].path]
      } else if (routes.length > 0) {
        this.selectedKeys = [routes.pop().path]
      }

      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          if (this.rootSubmenuKeys.includes(item.path)) {
            openKeys.push(item.path)
          }
        })
      }

      this.cachedPath = this.selectedKeys[0]
      this.cachedOpenKeys = openKeys
      if (!this.collapsed) {
        this.openKeys = openKeys
      }
    },
    handleClickParentMenu (menuItem) {
      if (this.cachedPath === menuItem.redirect) {
        return
      }
      if (menuItem.redirect) {
        this.cachedPath = menuItem.redirect
        setTimeout(() => this.$router.push({ path: menuItem.path }))
      }
    }
  }
}
</script>

<style>
.sider .ant-menu-vertical .ant-menu-item {
  margin-right: 0;
}
</style>
