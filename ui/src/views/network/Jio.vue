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
  <div class="isp-dashboard">
    <div class="provider-header">
      <div class="provider-brand">
        <div class="provider-logo jio-logo">Jio</div>
        <div>
          <div class="provider-title-row">
            <h1>{{ providerTitle }}</h1>
            <span class="status-badge active"><i></i> Active</span>
          </div>
          <p>{{ providerSubtitle }}</p>
        </div>
      </div>
      <div class="header-buttons">
        <a-button class="outline-btn" @click="handleSettingsNetwork"><SettingOutlined /> Settings</a-button>
        <a-button class="outline-btn" @click="handleExport"><PartitionOutlined /> IP Management</a-button>
        <a-button type="primary" class="primary-btn" @click="openAddModal"><PlusOutlined /> Add Network</a-button>
      </div>
    </div>

    <div class="provider-stats">
      <div class="provider-stat stat-blue"><span class="stat-icon"><GlobalOutlined /></span><div><small>Static IP</small><strong>{{ providerIp }}</strong></div></div>
      <div class="provider-stat stat-purple"><span class="stat-icon"><PartitionOutlined /></span><div><small>Gateway</small><strong>{{ providerGateway }}</strong></div></div>
    </div>

    <div class="category-grid">
      <button class="category-card category-blue" :class="{ selectedCategory: selectedCategory === 'general' }" @click="selectCategory('general')">
        <span class="category-icon"><GlobalOutlined /></span><span class="category-copy"><b>General Network</b><small>Common infrastructure network for datacenter resources.</small><em>{{ generalNetworksCount }} networks</em></span><span class="category-arrow">›</span>
      </button>
      <button class="category-card category-green" :class="{ selectedCategory: selectedCategory === 'ping' }" @click="selectCategory('ping')">
        <span class="category-icon"><WifiOutlined /></span><span class="category-copy"><b>Ping Network</b><small>Monitoring and health check network for servers and databases.</small><em>{{ pingNetworksCount }} networks</em></span><span class="category-arrow">›</span>
      </button>
      <button class="category-card category-purple" :class="{ selectedCategory: selectedCategory === 'local' }" @click="selectCategory('local')">
        <span class="category-icon"><PartitionOutlined /></span><span class="category-copy"><b>Local Network</b><small>Internal network for instances and services.</small><em>{{ localNetworksCount }} networks</em></span><span class="category-arrow">›</span>
      </button>
      <button class="category-card category-orange" :class="{ selectedCategory: selectedCategory === 'global' }" @click="selectCategory('global')">
        <span class="category-icon"><CloudOutlined /></span><span class="category-copy"><b>VPC</b><small>Virtual private cloud network for isolated environments.</small><em>{{ globalNetworksCount }} networks</em></span><span class="category-arrow">›</span>
      </button>
    </div>

    <section class="network-table-card">
      <div class="section-toolbar">
        <div class="section-heading"><GlobalOutlined /><div><h2>{{ currentCategoryTitle }} ({{ filteredNetworks.length }})</h2><p>List of all networks under {{ providerTitle }}</p></div></div>
        <div class="table-actions">
          <a-button type="primary" class="primary-btn" @click="openAddModal"><PlusOutlined /> Add Network</a-button>
          <a-input v-model:value="searchQuery" class="network-search" placeholder="Search networks..."><template #prefix><SearchOutlined /></template></a-input>
        </div>
      </div>
      <div class="table-scroll">
        <table class="network-table">
          <thead><tr><th>#</th><th>Network Name</th><th>Network Type</th><th>Subnet</th><th>Gateway</th><th>Connected Resources</th><th>Status</th><th>Created On</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="(net, index) in filteredNetworks" :key="net.id" :class="{ 'row-selected': selectedNetwork && selectedNetwork.id === net.id }" @click="selectNetwork(net)">
              <td>{{ index + 1 }}</td><td><button class="network-name" @click.stop="openNetworkInstances(net)">{{ net.name }}</button></td><td>{{ net.type }}</td><td>{{ net.subnet }}</td><td>{{ net.gateway }}</td>
              <td><div class="resource-counts"><span><DatabaseOutlined /> {{ net.servers }}</span><span><DesktopOutlined /> {{ net.instances }}</span><span><DatabaseOutlined /> {{ net.databases }}</span></div></td>
              <td><span class="table-status" :class="net.status.toLowerCase()"><i></i>{{ net.status }}</span></td><td>{{ net.created }}</td>
              <td><a-dropdown :trigger="['click']"><button class="action-menu" @click.stop><EllipsisOutlined /></button><template #overlay><a-menu><a-menu-item @click="selectNetwork(net)"></a-menu-item><a-menu-item @click="openNetworkInstances(net)"></a-menu-item><a-menu-item @click="testPing(net)">Ping Network</a-menu-item><a-menu-item danger @click="deleteNetwork(net)">Delete network</a-menu-item></a-menu></template></a-dropdown></td>
            </tr>
            <tr v-if="filteredNetworks.length === 0"><td colspan="9" class="empty-row">No networks found in this category.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="bottom-grid">
      <section class="bottom-card usage-card">
        <div class="bottom-card-heading"><h3>Network Usage - {{ currentCategoryTitleSingular }}</h3><a-select size="small" default-value="24h" :options="[{ label: 'Last 24 Hours', value: '24h' }, { label: 'Last 7 Days', value: '7d' }]" /></div>
        <div class="chart-legend"><span><i class="legend-blue"></i> Download</span><span><i class="legend-green"></i> Upload</span></div>
        <svg class="usage-chart" viewBox="0 0 520 150" preserveAspectRatio="none" aria-label="Network usage chart">
          <g class="chart-grid"><line x1="40" y1="15" x2="510" y2="15"/><line x1="40" y1="50" x2="510" y2="50"/><line x1="40" y1="85" x2="510" y2="85"/><line x1="40" y1="120" x2="510" y2="120"/></g>
          <g class="chart-labels"><text x="2" y="18">1.2 Gbps</text><text x="2" y="53">800 Mbps</text><text x="2" y="88">400 Mbps</text><text x="20" y="123">0</text></g>
          <path class="download-area" d="M40 95 L75 82 L105 90 L135 75 L165 88 L195 70 L225 78 L255 55 L285 20 L315 45 L345 60 L375 40 L405 70 L435 50 L465 62 L510 35 L510 120 L40 120 Z"/>
          <path class="download-line" d="M40 95 L75 82 L105 90 L135 75 L165 88 L195 70 L225 78 L255 55 L285 20 L315 45 L345 60 L375 40 L405 70 L435 50 L465 62 L510 35"/>
          <path class="upload-area" d="M40 110 L75 100 L105 105 L135 95 L165 108 L195 96 L225 100 L255 88 L285 75 L315 90 L345 98 L375 80 L405 100 L435 88 L465 95 L510 82 L510 120 L40 120 Z"/>
          <path class="upload-line" d="M40 110 L75 100 L105 105 L135 95 L165 108 L195 96 L225 100 L255 88 L285 75 L315 90 L345 98 L375 80 L405 100 L435 88 L465 95 L510 82"/>
          <g class="chart-labels bottom"><text x="40" y="143">00:00</text><text x="130" y="143">04:00</text><text x="220" y="143">08:00</text><text x="310" y="143">12:00</text><text x="400" y="143">16:00</text><text x="480" y="143">20:00</text></g>
        </svg>
      </section>

      <section class="bottom-card ip-card">
        <h3>IP Address Summary</h3>
        <div class="ip-summary-content"><div class="donut"><div><b>256</b><small>Total IPs</small></div></div><div class="ip-legend"><p><i class="used"></i><span>Used</span><b>{{ ipUsed }}</b></p><p><i class="available"></i><span>Available</span><b>{{ ipAvailable }}</b></p><p><i class="reserved"></i><span>Reserved</span><b>21</b></p></div></div>
      </section>

      <section class="bottom-card activity-card">
        <div class="bottom-card-heading"><h3>Recent Activities</h3><a @click="handleExport">View All</a></div>
        <div class="activity-list"><div v-for="(activity, i) in recentActivities" :key="activity.id" class="activity-row"><i :class="activity.status.toLowerCase()"></i><span>{{ activity.text }}</span><time>{{ activity.date }}</time></div><div v-if="!recentActivities.length" class="empty-row">No recent activity</div></div>
      </section>
    </div>

    <a-modal v-model:visible="addModalVisible" title="Add Network" ok-text="Create Network" @ok="handleCreateNetwork" :destroy-on-close="true">
      <a-form layout="vertical">
        <a-form-item label="Network Name" required><a-input v-model:value="newNetwork.name" :placeholder="'e.g. ' + modalNamePlaceholder" /></a-form-item>
        <a-row :gutter="12"><a-col :span="12"><a-form-item label="Network Type"><a-select v-model:value="newNetwork.type"><a-select-option value="LAN">LAN</a-select-option><a-select-option value="VLAN">VLAN</a-select-option></a-select></a-form-item></a-col><a-col :span="12"><a-form-item label="Category"><a-select v-model:value="newNetwork.category" @change="onModalCategoryChange"><a-select-option value="General Network">General Network</a-select-option><a-select-option value="Ping Network">Ping Network</a-select-option><a-select-option value="Local Network">Local Network</a-select-option><a-select-option value="Global Network">VPC</a-select-option></a-select></a-form-item></a-col></a-row>
        <a-form-item label="Subnet" required><a-input v-model:value="newNetwork.subnet" placeholder="e.g. 192.168.50.0/24" /></a-form-item>
        <a-row :gutter="12"><a-col :span="12"><a-form-item label="Gateway"><a-input v-model:value="newNetwork.gateway" placeholder="e.g. 192.168.50.1" /></a-form-item></a-col><a-col :span="12"><a-form-item label="VLAN ID"><a-input v-model:value="newNetwork.vlanId" placeholder="Optional" /></a-form-item></a-col></a-row>
        <a-form-item label="Description"><a-textarea v-model:value="newNetwork.description" :rows="3" /></a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'
import {
  HomeOutlined,
  SearchOutlined,
  PlusOutlined,
  GlobalOutlined,
  WifiOutlined,
  PartitionOutlined,
  CloudOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  SettingOutlined,
  EllipsisOutlined
} from '@ant-design/icons-vue'

export default {
  name: 'JioNetworkManagement',
  components: {
    HomeOutlined,
    SearchOutlined,
    PlusOutlined,
    GlobalOutlined,
    WifiOutlined,
    PartitionOutlined,
    CloudOutlined,
    DesktopOutlined,
    DatabaseOutlined,
      SettingOutlined,
    EllipsisOutlined
  },
  data () {
    return {
      selectedCategory: 'general',
      searchQuery: '',
      headerSearchQuery: '',
      addModalVisible: false,
      selectedNetwork: null,
      selectedDetailTab: 'overview',
      newNetwork: {
        name: '',
        type: 'LAN',
        category: 'General Network',
        subnet: '',
        gateway: '',
        vlanId: '',
        description: ''
      },
      networksList: [
        {
          id: 1,
          name: 'GM1',
          type: 'LAN',
          category: 'General Network',
          subnet: '192.168.10.0/24',
          gateway: '192.168.10.1',
          vlanId: '-',
          servers: 3,
          instances: 5,
          databases: 2,
          status: 'Active',
          created: '2026-10-01 10:30',
          description: 'Primary general network for datacenter services.',
          ipUsagePercent: 42,
          ipUsageText: '107 / 256',
          bandwidthPercent: 60,
          bandwidthText: '600 Mbps',
          hostsCount: 3,
          hostsText: '3 online'
        },
        {
          id: 2,
          name: 'GM2',
          type: 'LAN',
          category: 'General Network',
          subnet: '192.168.20.0/24',
          gateway: '192.168.20.1',
          vlanId: '-',
          servers: 2,
          instances: 4,
          databases: 1,
          status: 'Active',
          created: '2026-10-02 14:20',
          description: 'Secondary general network for compute clusters.',
          ipUsagePercent: 55,
          ipUsageText: '140 / 256',
          bandwidthPercent: 48,
          bandwidthText: '480 Mbps',
          hostsCount: 4,
          hostsText: '4 online'
        },
        {
          id: 3,
          name: 'GM3',
          type: 'VLAN',
          category: 'General Network',
          subnet: '192.168.30.0/24',
          gateway: '192.168.30.1',
          vlanId: '100',
          servers: 1,
          instances: 3,
          databases: 2,
          status: 'Maintenance',
          created: '2026-10-10 09:15',
          description: 'VLAN network for database staging and maintenance.',
          ipUsagePercent: 20,
          ipUsageText: '51 / 256',
          bandwidthPercent: 25,
          bandwidthText: '250 Mbps',
          hostsCount: 2,
          hostsText: '1 online'
        },
        {
          id: 4,
          name: 'GM4',
          type: 'LAN',
          category: 'General Network',
          subnet: '192.168.40.0/24',
          gateway: '192.168.40.1',
          vlanId: '-',
          servers: 4,
          instances: 6,
          databases: 3,
          status: 'Inactive',
          created: '2026-10-12 16:45',
          description: 'Backup general routing segment for DR site.',
          ipUsagePercent: 10,
          ipUsageText: '25 / 256',
          bandwidthPercent: 12,
          bandwidthText: '120 Mbps',
          hostsCount: 0,
          hostsText: '0 online'
        }
      ]
    }
  },
  created () {
    this.syncCategoryFromRoute()
    if (this.networksList && this.networksList.length > 0) {
      const matches = this.networksList.filter(n => {
        if (this.selectedCategory === 'general') return n.category === 'General Network'
        if (this.selectedCategory === 'ping') return n.category === 'Ping Network'
        if (this.selectedCategory === 'local') return n.category === 'Local Network'
        if (this.selectedCategory === 'global') return n.category === 'Global Network'
        return true
      })
      this.selectedNetwork = matches[0] || this.networksList[0]
    }
  },
  watch: {
    '$route.path': function () {
      this.syncCategoryFromRoute()
    },
    '$route.query.category': function (newCat) {
      if (newCat && newCat !== this.selectedCategory) {
        this.selectCategory(newCat, false)
      }
    }
  },
  computed: {
    modalNamePlaceholder () {
      if (this.newNetwork.category === 'Ping Network') return 'PM1'
      if (this.newNetwork.category === 'Local Network') return 'LM1'
      if (this.newNetwork.category === 'Global Network') return 'VM1'
      return 'GM5'
    },
    generalNetworksCount () {
      return this.networksList.filter(n => n.category === 'General Network').length
    },
    pingNetworksCount () {
      return this.networksList.filter(n => n.category === 'Ping Network').length
    },
    localNetworksCount () {
      return this.networksList.filter(n => n.category === 'Local Network').length
    },
    globalNetworksCount () {
      return this.networksList.filter(n => n.category === 'Global Network').length
    },
    currentCategoryTitle () {
      if (this.selectedCategory === 'ping') return 'Ping Networks'
      if (this.selectedCategory === 'local') return 'Local Networks'
      if (this.selectedCategory === 'global') return 'VPC'
      return 'General Networks'
    },
    currentCategoryTitleSingular () {
      if (this.selectedCategory === 'ping') return 'Ping Network'
      if (this.selectedCategory === 'local') return 'Local Network'
      if (this.selectedCategory === 'global') return 'VPC'
      return 'General Network'
    },
    filteredNetworks () {
      let list = this.networksList
      if (this.selectedCategory === 'general') list = list.filter(n => n.category === 'General Network')
      else if (this.selectedCategory === 'ping') list = list.filter(n => n.category === 'Ping Network')
      else if (this.selectedCategory === 'local') list = list.filter(n => n.category === 'Local Network')
      else if (this.selectedCategory === 'global') list = list.filter(n => n.category === 'Global Network')
      if (!this.searchQuery) return list
      const q = this.searchQuery.toLowerCase()
      return list.filter(n =>
        n.name.toLowerCase().includes(q) ||
        n.type.toLowerCase().includes(q) ||
        n.subnet.toLowerCase().includes(q) ||
        n.gateway.toLowerCase().includes(q) ||
        n.status.toLowerCase().includes(q)
      )
    },
    ipUsed () {
      const n = this.selectedNetwork || this.networksList[0]
      return n ? Number(String(n.ipUsageText || '0').split('/')[0].trim()) : 0
    },
    ipAvailable () {
      return Math.max(0, 256 - this.ipUsed - 21)
    },
    providerTitle () {
      return 'JIO NETWORK'
    },
    providerSubtitle () {
      return 'Reliance Jio - Internet Connectivity'
    },
    providerIp () {
      return '203.0.113.10'
    },
    providerGateway () {
      return '203.0.113.1'
    },
    recentActivities () {
      return this.networksList.slice(0, 5).map((n, index) => ({
        id: n.id,
        text: index === 0 ? `Network ${n.name} created` : `Network ${n.name} status: ${n.status}`,
        date: n.created,
        status: n.status
      }))
    }
  },
  methods: {
    syncCategoryFromRoute () {
      const p = this.$route.path
      const q = this.$route.query
      if (q && q.category) {
        this.selectedCategory = q.category
      } else if (p.startsWith('/pingnetwork')) {
        this.selectedCategory = 'ping'
      } else if (p.startsWith('/localnetwork')) {
        this.selectedCategory = 'local'
      } else if (p.startsWith('/vpc')) {
        this.selectedCategory = 'global'
      } else {
        this.selectedCategory = 'general'
      }
    },
    selectCategory (cat, updateRoute = true) {
      this.selectedCategory = cat
      const matches = this.networksList.filter(n => {
        if (cat === 'general') return n.category === 'General Network'
        if (cat === 'ping') return n.category === 'Ping Network'
        if (cat === 'local') return n.category === 'Local Network'
        if (cat === 'global') return n.category === 'Global Network'
        return true
      })
      if (matches.length > 0) {
        this.selectedNetwork = matches[0]
      }
      if (updateRoute) {
        const catPathMap = {
          general: '/generalnetwork',
          ping: '/pingnetwork',
          local: '/localnetwork',
          global: '/vpc'
        }
        if (['/generalnetwork', '/pingnetwork', '/localnetwork', '/vpc'].includes(this.$route.path)) {
          if (this.$route.path !== catPathMap[cat]) {
            this.$router.push({ path: catPathMap[cat] }).catch(() => {})
          }
        } else {
          if (this.$route.query?.category !== cat) {
            this.$router.replace({ query: { ...this.$route.query, category: cat } }).catch(() => {})
          }
        }
      }
    },
    selectNetwork (net) {
      this.selectedNetwork = net
    },
    getNextNetworkName (category) {
      let prefix = 'GM'
      const c = (category || '').toLowerCase()
      if (c === 'ping network' || c === 'ping') prefix = 'PM'
      else if (c === 'local network' || c === 'local') prefix = 'LM'
      else if (c === 'global network' || c === 'global' || c === 'vpc') prefix = 'VM'

      const existingInCat = this.networksList.filter(n => {
        if (prefix === 'PM') return n.category === 'Ping Network' || n.name.toUpperCase().startsWith('PM')
        if (prefix === 'LM') return n.category === 'Local Network' || n.name.toUpperCase().startsWith('LM')
        if (prefix === 'VM') return n.category === 'Global Network' || n.name.toUpperCase().startsWith('VM')
        return n.category === 'General Network' || n.name.toUpperCase().startsWith('GM')
      })

      let maxNum = 0
      existingInCat.forEach(n => {
        const match = n.name.match(new RegExp(`^${prefix}(\\d+)`, 'i'))
        if (match) {
          const num = parseInt(match[1], 10)
          if (num > maxNum) maxNum = num
        }
      })
      const nextNum = maxNum + 1
      return `${prefix}${nextNum}`
    },
    openAddModal () {
      let cat = 'General Network'
      let desc = 'Primary general network for datacenter services.'
      let subnet = '192.168.50.0/24'
      let gateway = '192.168.50.1'

      if (this.selectedCategory === 'ping') {
        cat = 'Ping Network'
        desc = 'Monitoring and health check network for servers and databases.'
        subnet = '10.10.10.0/24'
        gateway = '10.10.10.1'
      } else if (this.selectedCategory === 'local') {
        cat = 'Local Network'
        desc = 'Internal network for instances and services.'
        subnet = '172.16.10.0/24'
        gateway = '172.16.10.1'
      } else if (this.selectedCategory === 'global') {
        cat = 'Global Network'
        desc = 'Virtual private cloud network for isolated environments.'
        subnet = '10.0.10.0/24'
        gateway = '10.0.10.1'
      } else {
        const nextNum = this.networksList.filter(n => n.category === 'General Network').length + 1
        subnet = `192.168.${nextNum * 10}.0/24`
        gateway = `192.168.${nextNum * 10}.1`
      }

      this.newNetwork = {
        name: this.getNextNetworkName(this.selectedCategory),
        type: 'LAN',
        category: cat,
        subnet: subnet,
        gateway: gateway,
        vlanId: '',
        description: desc
      }
      this.addModalVisible = true
    },
    onModalCategoryChange (val) {
      this.newNetwork.name = this.getNextNetworkName(val)
      if (val === 'Ping Network') {
        this.newNetwork.description = 'Monitoring and health check network for servers and databases.'
        this.newNetwork.subnet = '10.10.10.0/24'
        this.newNetwork.gateway = '10.10.10.1'
      } else if (val === 'Local Network') {
        this.newNetwork.description = 'Internal network for instances and services.'
        this.newNetwork.subnet = '172.16.10.0/24'
        this.newNetwork.gateway = '172.16.10.1'
      } else if (val === 'Global Network') {
        this.newNetwork.description = 'Virtual private cloud network for isolated environments.'
        this.newNetwork.subnet = '10.0.10.0/24'
        this.newNetwork.gateway = '10.0.10.1'
      } else {
        const nextNum = this.networksList.filter(n => n.category === 'General Network').length + 1
        this.newNetwork.description = 'Primary general network for datacenter services.'
        this.newNetwork.subnet = `192.168.${nextNum * 10}.0/24`
        this.newNetwork.gateway = `192.168.${nextNum * 10}.1`
      }
    },
    handleCreateNetwork () {
      if (!this.newNetwork.name || !this.newNetwork.subnet) {
        message.warning('Please enter Network Name and Subnet')
        return
      }
      const newEntry = {
        id: Date.now(),
        name: this.newNetwork.name,
        type: this.newNetwork.type,
        category: this.newNetwork.category || 'General Network',
        subnet: this.newNetwork.subnet,
        gateway: this.newNetwork.gateway || '192.168.50.1',
        vlanId: this.newNetwork.vlanId || '-',
        servers: 1,
        instances: 2,
        databases: 1,
        status: 'Active',
        created: 'Just now',
        description: this.newNetwork.description || 'Datacenter cloud segment',
        ipUsagePercent: 20,
        ipUsageText: '51 / 256',
        bandwidthPercent: 25,
        bandwidthText: '250 Mbps',
        hostsCount: 1,
        hostsText: '1 online'
      }
      this.networksList.push(newEntry)
      this.selectedNetwork = newEntry
      if (newEntry.category === 'Ping Network' && this.selectedCategory !== 'ping') {
        this.selectCategory('ping')
      } else if (newEntry.category === 'Local Network' && this.selectedCategory !== 'local') {
        this.selectCategory('local')
      } else if (newEntry.category === 'Global Network' && this.selectedCategory !== 'global') {
        this.selectCategory('global')
      } else if (newEntry.category === 'General Network' && this.selectedCategory !== 'general') {
        this.selectCategory('general')
      }
      message.success(`Network "${newEntry.name}" created successfully`)
      this.addModalVisible = false
    },
    handleEditNetwork () {
      message.info(`Editing settings for ${this.selectedNetwork ? this.selectedNetwork.name : 'network'}`)
    },
    handleSettingsNetwork () {
      message.info(`Opening configuration for ${this.selectedNetwork ? this.selectedNetwork.name : 'network'}`)
    },
    handleExport () {
      const rows = [
        ['Network Name', 'Network Type', 'Subnet', 'Gateway', 'Status', 'Created On'],
        ...this.filteredNetworks.map(n => [n.name, n.type, n.subnet, n.gateway, n.status, n.created])
      ]
      const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'jio-network-config.csv'
      link.click()
      URL.revokeObjectURL(url)
      message.success('Network configuration exported')
    },
    testPing (net) {
      message.loading(`Pinging gateway ${net.gateway}...`, 1.2).then(() => {
        message.success(`Gateway ${net.gateway} responded in 8ms (0% loss)`)
      })
    },
    deleteNetwork (net) {
      this.networksList = this.networksList.filter(n => n.id !== net.id)
      if (this.selectedNetwork && this.selectedNetwork.id === net.id) {
        this.selectedNetwork = this.networksList[0] || null
      }
      message.success(`Network "${net.name}" removed`)
    },
    openNetworkInstances (net) {
      const target = net || this.selectedNetwork
      this.$router.push({
        path: '/instances',
        query: {
          network: target ? target.name : 'GM1',
          type: target ? target.category : 'General Network',
          from: 'jio'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.isp-dashboard {
  min-height: calc(100vh - 64px);
  padding: 14px 18px 24px;
  background: #f4f8fd;
  color: #17233d;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* Provider Header */
.provider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.provider-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.provider-logo {
  width: 62px;
  height: 60px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.jio-logo {
  background: #073b9a;
  color: #fff;
  font-size: 24px;
  font-weight: 800;
}

.airtel-logo {
  background: #ffeded;
}

.airtel-logo img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.provider-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.provider-title-row h1 {
  font-size: 27px;
  line-height: 1.2;
  margin: 0;
  font-weight: 750;
  color: #111d38;
}

.provider-brand p {
  margin: 3px 0 0;
  color: #68758d;
  font-size: 15px;
}

.status-badge,
.table-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 650;
  background: #dcfce8;
  color: #168044;
}

.status-badge i,
.table-status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22b66a;
}

/* Header Buttons */
.header-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.outline-btn,
.primary-btn {
  height: 36px;
  border-radius: 7px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.outline-btn {
  border: 1px solid #d7e0ed;
  color: #25334d;
  background: #fff;
}

.primary-btn {
  background: #0865e9;
  border-color: #0865e9;
  box-shadow: 0 2px 5px #0865e92b;
}

/* Static IP and Gateway Cards */
.provider-stats {
  display: grid;
  grid-template-columns: repeat(2, 220px);
  gap: 9px;
  margin-bottom: 12px;
}

.provider-stat {
  width: 220px;
  min-height: 62px;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 8px;
  padding: 9px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.provider-stat .stat-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 21px;
  flex: none;
}

.provider-stat small {
  display: block;
  font-size: 12px;
  color: #65728a;
  margin-bottom: 3px;
}

.provider-stat strong {
  display: block;
  font-size: 15px;
  color: #17233d;
  white-space: nowrap;
}

.stat-blue {
  background: #f0f7ff;
  border-color: #d5e6fc;
}

.stat-blue .stat-icon {
  background: #dcecff;
  color: #1672ed;
}

.stat-purple {
  background: #f7f3ff;
  border-color: #e6dcff;
}

.stat-purple .stat-icon {
  background: #eee5ff;
  color: #6738d5;
}

.stat-green {
  background: #effcf5;
  border-color: #d8f5e4;
}

.stat-green .stat-icon {
  background: #dcf9e8;
  color: #16a05a;
}

.stat-orange {
  background: #fff8ef;
  border-color: #f8e6d0;
}

.stat-orange .stat-icon {
  background: #ffecd8;
  color: #ed781e;
}

.stat-pink {
  background: #fff3fb;
  border-color: #f3def0;
}

.stat-pink .stat-icon {
  background: #ffe6f4;
  color: #e23c88;
}

/* Network Category Cards */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;
  margin-bottom: 12px;
}

.category-card {
  min-height: 88px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  padding: 10px;
  border: 1px solid #e1e8f2;
  border-radius: 9px;
  background: #fff;
  cursor: pointer;
  transition: .18s;
  min-width: 0;
}

.category-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px #1e3a5f0d;
}

.category-card.selectedCategory {
  border-color: #3184ef;
  box-shadow: 0 0 0 1px #3184ef inset;
}

.category-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-size: 23px;
  flex: none;
}

.category-copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.category-copy b {
  font-size: 14px;
  color: #1b2a46;
}

.category-copy small {
  font-size: 12px;
  line-height: 1.4;
  color: #68758b;
}

.category-copy em {
  align-self: flex-start;
  font-size: 11px;
  font-style: normal;
  font-weight: 650;
  padding: 3px 7px;
  border-radius: 10px;
  margin-top: 2px;
}

.category-arrow {
  margin-left: auto;
  font-size: 23px;
  color: #1768e8;
}

.category-blue .category-icon {
  background: #e5f1ff;
  color: #1472ef;
}

.category-blue em {
  background: #e4f0ff;
  color: #1768d8;
}

.category-green .category-icon {
  background: #e4f9ed;
  color: #18a45c;
}

.category-green em {
  background: #e3f8eb;
  color: #16894b;
}

.category-purple .category-icon {
  background: #f0eaff;
  color: #6438d5;
}

.category-purple em {
  background: #f0eaff;
  color: #6438d5;
}

.category-orange .category-icon {
  background: #fff0e3;
  color: #f07820;
}

.category-orange em {
  background: #fff0e3;
  color: #d76517;
}

/* Network Table */
.network-table-card,
.bottom-card {
  background: #fff;
  border: 1px solid #e4ebf4;
  border-radius: 9px;
  box-shadow: 0 2px 8px #1b36550a;
}

.network-table-card {
  padding: 10px 11px 6px;
  margin-bottom: 12px;
}

.section-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-heading > span,
.section-heading > .anticon {
  font-size: 27px;
  color: #1472ef;
}

.section-heading h2 {
  font-size: 16px;
  margin: 0;
  color: #17233d;
  font-weight: 750;
}

.section-heading p {
  font-size: 12px;
  color: #7a879b;
  margin: 2px 0 0;
}

.table-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.network-search {
  width: 250px;
  border-radius: 6px;
  font-size: 12px;
}

.table-scroll {
  overflow-x: auto;
}

.network-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  font-size: 12px;
}

.network-table th {
  background: #f8fafc;
  color: #34435d;
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  padding: 8px 7px;
  border-top: 1px solid #e9eef5;
  border-bottom: 1px solid #e9eef5;
}

.network-table td {
  padding: 8px 7px;
  border-bottom: 1px solid #edf1f6;
  color: #647188;
  font-size: 12px;
}

.network-table tbody tr {
  cursor: pointer;
}

.network-table tbody tr:hover,
.network-table tbody tr.row-selected {
  background: #f5f9ff;
}

.network-name {
  border: 0;
  background: none;
  color: #075de0;
  font-size: 13px;
  font-weight: 750;
  cursor: pointer;
  padding: 0;
}

.resource-counts {
  display: flex;
  gap: 10px;
  color: #34435d;
}

.resource-counts span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.resource-counts .anticon {
  color: #1768e8;
}

.table-status {
  padding: 3px 8px;
  font-size: 12px;
}

.table-status.maintenance {
  background: #fff4d9;
  color: #b77908;
}

.table-status.maintenance i {
  background: #f5ad24;
}

.table-status.inactive {
  background: #ffe8e8;
  color: #c93434;
}

.table-status.inactive i {
  background: #ed4444;
}

.action-menu {
  border: 0;
  background: transparent;
  color: #075de0;
  font-size: 17px;
  cursor: pointer;
}

.empty-row {
  text-align: center !important;
  padding: 24px !important;
  color: #8591a4 !important;
}

/* Bottom Dashboard Sections */
.bottom-grid {
  display: grid;
  grid-template-columns: 1.2fr .85fr .95fr;
  gap: 10px;
}

.bottom-card {
  padding: 10px;
  min-width: 0;
  min-height: 150px;
}

.bottom-card h3 {
  font-size: 14px;
  margin: 0;
  color: #17233d;
  font-weight: 750;
}

.bottom-card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.bottom-card-heading .ant-select {
  width: 112px;
  font-size: 11px;
}

/* Network Usage Chart */
.chart-legend {
  display: flex;
  justify-content: center;
  gap: 14px;
  font-size: 11px;
  color: #647188;
  margin: 6px 0 0;
}

.chart-legend span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.chart-legend i,
.ip-legend i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.legend-blue {
  background: #1677ef;
}

.legend-green {
  background: #35c78b;
}

.usage-chart {
  width: 100%;
  height: 108px;
  margin-top: 2px;
  overflow: visible;
}

.chart-grid line {
  stroke: #e9eef5;
  stroke-width: 1;
  stroke-dasharray: 3 3;
}

.chart-labels {
  font-size: 11px;
  fill: #718096;
}

.chart-labels.bottom {
  text-anchor: middle;
}

.download-area {
  fill: #1677ef;
  opacity: .12;
}

.download-line {
  fill: none;
  stroke: #1677ef;
  stroke-width: 2;
}

.upload-area {
  fill: #35c78b;
  opacity: .12;
}

.upload-line {
  fill: none;
  stroke: #35c78b;
  stroke-width: 2;
}

/* IP Address Summary */
.ip-summary-content {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 12px;
  padding-top: 10px;
}

.donut {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(#1677ef 0 42%, #35c78b 42% 92%, #cbd5e1 92% 100%);
  display: grid;
  place-items: center;
  flex: none;
}

.donut > div {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.donut b {
  font-size: 15px;
  color: #17233d;
}

.donut small {
  font-size: 10px;
  color: #718096;
}

.ip-legend {
  min-width: 100px;
}

.ip-legend p {
  display: grid;
  grid-template-columns: 10px 1fr auto;
  gap: 5px;
  align-items: center;
  font-size: 11px;
  color: #647188;
  margin: 9px 0;
}

.ip-legend p b {
  color: #34435d;
  font-weight: 650;
}

.ip-legend .used {
  background: #1677ef;
}

.ip-legend .available {
  background: #35c78b;
}

.ip-legend .reserved {
  background: #b8c4d5;
}

/* Recent Activities */
.activity-card .bottom-card-heading a {
  font-size: 12px;
  color: #075de0;
  cursor: pointer;
}

.activity-list {
  margin-top: 8px;
}

.activity-row {
  display: grid;
  grid-template-columns: 9px minmax(0, 1fr) auto;
  gap: 7px;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid #f0f3f7;
  font-size: 11px;
  color: #43516a;
}

.activity-row > i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #35bd7b;
}

.activity-row > i.maintenance {
  background: #f2ad27;
}

.activity-row > i.inactive {
  background: #e84d4d;
}

.activity-row time {
  color: #8792a4;
  font-size: 10px;
}

/* Responsive Layout */
@media (max-width: 1100px) {
  .bottom-grid {
    grid-template-columns: 1fr 1fr;
  }

  .activity-card {
    grid-column: 1 / -1;
  }
}

@media (max-width: 850px) {
  .provider-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-buttons {
    flex-wrap: wrap;
  }

  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .activity-card {
    grid-column: auto;
  }

  .section-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .table-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .network-search {
    flex: 1;
    min-width: 160px;
  }
}

@media (max-width: 480px) {
  .isp-dashboard {
    padding: 10px;
  }

  .provider-title-row h1 {
    font-size: 19px;
  }

  .provider-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .provider-stat {
    width: 100%;
  }

  .provider-stat strong {
    font-size: 12px;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .provider-logo {
    width: 52px;
    height: 52px;
  }
}
</style>