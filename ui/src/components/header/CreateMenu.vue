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
  <a-dropdown v-if="accessibleCreateActions && accessibleCreateActions.length > 0">
    <template #overlay>
      <a-menu>
        <a-menu-item style="width: 100%; padding: 12px" v-for="menuItem in accessibleCreateActions" :key="menuItem.api">
          <router-link :to="menuItem.route">
            <a-row>
              <a-col style="margin-right: 12px">
                <a-avatar :style="{ backgroundColor: $config.theme['@primary-color'] }">
                  <template #icon>
                    <render-icon v-if="(typeof menuItem.icon === 'string')" :icon="menuItem.icon" />
                    <render-icon v-else  :style="{fill:'#ffffff'}"  :svg-icon=menuItem.icon />
                  </template>
                </a-avatar>
              </a-col>
              <a-col>
                <h3 style="margin-bottom: 0px;">
                  {{ $t(menuItem.title) }}
                </h3>
                <small>{{ $t(menuItem.subtitle) }}</small>
              </a-col>
            </a-row>
          </router-link>
        </a-menu-item>
      </a-menu>
    </template>
    <a-button type="primary" class="header-create-btn">
      {{ $t('label.create') }}
      <DownOutlined style="font-size: 11px; margin-left: 4px;" />
    </a-button>
  </a-dropdown>
</template>

<script>

import kubernetesIcon from '@/assets/icons/kubernetes.svg?inline'

export default {
  name: 'CreateMenu',
  beforeCreate () {
    const menuItems = [
      {
        api: 'deployVirtualMachine',
        title: 'label.instance',
        subtitle: 'label.create.instance',
        icon: 'cloud-server-outlined',
        route: { path: '/action/deployVirtualMachine' }
      },
      {
        api: 'createKubernetesCluster',
        title: 'label.kubernetes',
        subtitle: 'label.kubernetes.cluster.create',
        icon: kubernetesIcon,
        route: { path: '/kubernetes', query: { action: 'createKubernetesCluster' } }
      },
      {
        api: 'createVolume',
        title: 'label.volume',
        subtitle: 'label.action.create.volume',
        icon: 'hdd-outlined',
        route: { path: '/volume', query: { action: 'createVolume' } }
      },
      {
        api: 'createNetwork',
        title: 'label.network',
        subtitle: 'label.add.network',
        icon: 'apartment-outlined',
        route: { path: '/guestnetwork', query: { action: 'createNetwork' } }
      },
      {
        api: 'createVPC',
        title: 'label.vpc',
        subtitle: 'label.add.vpc',
        icon: 'deployment-unit-outlined',
        route: { path: '/vpc', query: { action: 'createVPC' } }
      },
      {
        api: 'registerTemplate',
        title: 'label.templatename',
        subtitle: 'label.action.register.template',
        icon: 'picture-outlined',
        route: { path: '/template', query: { action: 'registerTemplate' } }
      },
      {
        api: 'deployVnfAppliance',
        title: 'label.vnf.appliance',
        subtitle: 'label.vnf.appliance.add',
        icon: 'gateway-outlined',
        route: { path: '/action/deployVnfAppliance' }
      }
    ]
    const filtered = menuItems.filter(m => m.api in this.$store.getters.apis)
    this.accessibleCreateActions = filtered.length > 0 ? filtered : menuItems
  }
}
</script>

<style scoped>
.header-create-btn {
  background: #1677ff;
  border-color: #1677ff;
  border-radius: 6px;
  font-weight: 500;
  height: 32px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(22, 119, 255, 0.2);
  white-space: nowrap;
}
</style>
