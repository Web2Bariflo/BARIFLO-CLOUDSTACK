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
  <div class="network-instances-workspace">
    <!-- Main Content Area: Two-Column Layout -->
    <main class="workspace-body">
      <!-- ================= 1. NETWORK SUB-NAV COLUMN ================= -->
      <aside class="network-subnav-panel">
        <!-- Network Identity Header -->
        <div class="net-identity-card">
          <div class="net-icon-box">
            <GlobalOutlined class="net-icon-globe" />
          </div>
          <div class="net-identity-info">
            <div class="net-name-status">
              <span class="net-title">{{ networkNameOnly }}</span>
              <span class="active-status-badge">
                <span class="status-dot"></span>
                Active
              </span>
            </div>
            <p class="net-subtitle">{{ networkTypeDisplay }}</p>
          </div>
        </div>

        <!-- Vertical Navigation Menu -->
        <nav class="subnav-menu-list">
          <!-- Overview -->
          <button
            class="subnav-item"
            :class="{ active: selectedSubNav === 'overview' }"
            @click="selectedSubNav = 'overview'"
          >
            <CompassOutlined class="subnav-icon" />
            <span class="subnav-text">Overview</span>
          </button>

          <!-- Instances (Active) -->
          <button
            class="subnav-item"
            :class="{ active: selectedSubNav === 'instances' }"
            @click="selectedSubNav = 'instances'"
          >
            <svg class="subnav-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="7" rx="2" />
              <rect x="2" y="14" width="20" height="7" rx="2" />
              <circle cx="6" cy="6.5" r="1" fill="currentColor" />
              <circle cx="6" cy="17.5" r="1" fill="currentColor" />
            </svg>
            <span class="subnav-text">Instances ({{ instancesList.length }})</span>
          </button>

          

          <!-- Databases (2) -->
          <button
            class="subnav-item"
            :class="{ active: selectedSubNav === 'databases' }"
            @click="selectedSubNav = 'databases'"
          >
            <DatabaseOutlined class="subnav-icon" />
            <span class="subnav-text">Databases (2)</span>
          </button>

          <!-- Settings -->
          <button
            class="subnav-item"
            :class="{ active: selectedSubNav === 'settings' }"
            @click="selectedSubNav = 'settings'"
          >
            <SettingOutlined class="subnav-icon" />
            <span class="subnav-text">Settings</span>
          </button>
        </nav>
      </aside>

      <!-- ================= 2. INSTANCES LIST COLUMN ================= -->
      <section class="instances-list-panel">
        <!-- List Header -->
        <div class="list-header-block">
          <div class="list-header-row">
            <div class="list-title-wrap">
              <h2 class="list-main-title">Instances</h2>
              <p class="list-sub-title">Manage all cloud instances in {{ networkNameOnly }} network</p>
            </div>
            <button class="btn-create-instance" @click="goToCreateInstance">
              <PlusOutlined class="plus-icon" />
              <span>Create Instance</span>
            </button>
          </div>
        </div>

        <!-- Search Instances -->
        <div class="instances-search-wrap">
          <SearchOutlined class="search-icon-sm" />
          <input
            type="text"
            v-model="instanceSearchText"
            placeholder="Search instances..."
            class="instances-search-input"
          />
        </div>

        <!-- Instances Table -->
        <div class="instances-table-container">
          <table class="instances-table">
            <thead>
              <tr>
                <th class="th-num">#</th>
                <th class="th-name">Name</th>
                <th class="th-status">State</th>
                <th class="th-instancename">Internal Name</th>
                <th class="th-ip">IP Address</th>
                <th class="th-zone">Zone</th>
                <th class="th-arch">Arch</th>
                <th class="th-host">Host</th>
                <th class="th-account">Account</th>
                <th class="th-network">Network (ISP)</th>
                <th class="th-actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(vm, index) in filteredInstances"
                :key="vm.id"
                class="instance-row"
                :class="{ selected: selectedInstance && selectedInstance.id === vm.id }"
                @click="selectInstanceRow(vm)"
              >
                <td class="td-num">{{ index + 1 }}</td>
                <td class="td-name">
                  <span class="vm-name-text">{{ vm.name }}</span>
                </td>
                <td class="td-status">
                  <span
                    class="status-pill"
                    :class="(vm.status || vm.state || 'running').toLowerCase()"
                  >
                    <span class="status-dot"></span>
                    {{ vm.status || vm.state }}
                  </span>
                </td>
                <td class="td-instancename">
                  <span class="vm-code-text">{{ vm.instancename || ('i-2-' + vm.name) }}</span>
                </td>
                <td class="td-ip">
                  <span class="vm-ip-text">{{ vm.ipaddress || vm.ip || '10.10.1.50' }}</span>
                </td>
                <td class="td-zone">
                  <span class="vm-zone-text">{{ vm.zonename || vm.zone || 'Zone-1' }}</span>
                </td>
                <td class="td-arch">
                  <span class="vm-arch-badge">{{ vm.arch || 'x86_64' }}</span>
                </td>
                <td class="td-host">
                  <span class="vm-host-text">{{ vm.host || vm.hostname || 'host-01' }}</span>
                </td>
                <td class="td-account">
                  <span class="vm-account-text">{{ vm.account || 'admin' }}</span>
                </td>
                <td class="td-network">
                  <span class="network-badge" :class="getNetworkBrand(vm)">
                    <span class="net-brand-icon" :class="getNetworkBrand(vm)">{{ getNetworkBrand(vm) === 'jio' ? 'Jio' : 'Airtel' }}</span>
                    <span class="net-name-text">{{ vm.network || vm.networkname || networkNameOnly }}</span>
                  </span>
                </td>
                <td class="td-actions" @click.stop>
                  <a-dropdown :trigger="['click']" placement="bottomRight">
                    <button class="btn-row-more">
                      <MoreOutlined />
                    </button>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item @click="toggleInstancePower(vm)">
                          <PoweroffOutlined />
                          {{ (vm.status || vm.state) === 'Running' ? 'Stop Instance' : 'Start Instance' }}
                        </a-menu-item>
                        <a-menu-item @click="restartInstance(vm)">
                          <ReloadOutlined /> Restart Instance
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item danger @click="deleteInstance(vm)">
                          <DeleteOutlined /> Delete Instance
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </td>
              </tr>
              <tr v-if="filteredInstances.length === 0">
                <td colspan="11" class="no-records-cell">
                  No matching instances found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer Pagination -->
        <div class="instances-table-footer">
          <span class="showing-counter">
            Showing 1 to {{ filteredInstances.length }} of {{ instancesList.length }}
          </span>
          <div class="pagination-controls">
            <button class="btn-page-nav" disabled>
              <CaretLeftOutlined />
            </button>
            <button class="btn-page-num active">1</button>
            <button class="btn-page-nav" disabled>
              <CaretRightOutlined />
            </button>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  DownOutlined,
  GlobalOutlined,
  CompassOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  SettingOutlined,
  PlusOutlined,
  MoreOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  EyeOutlined,
  BulbOutlined,
  LoadingOutlined,
  RocketOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  PoweroffOutlined,
  ReloadOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import eventBus from '@/config/eventBus'
import {
  getStoredInstances,
  updateStoredInstance,
  deleteStoredInstance,
  addStoredInstance
} from '@/utils/instanceStore'

export default {
  name: 'Instances',
  components: {
    HomeOutlined,
    SearchOutlined,
    BellOutlined,
    DownOutlined,
    GlobalOutlined,
    CompassOutlined,
    DesktopOutlined,
    DatabaseOutlined,
    SettingOutlined,
    PlusOutlined,
    MoreOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CheckOutlined,
    EyeOutlined,
    BulbOutlined,
    LoadingOutlined,
    RocketOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    PoweroffOutlined,
    ReloadOutlined,
    DeleteOutlined
  },
  data () {
    return {
      activeView: 'create', // 'create' or 'list'
      selectedSubNav: 'instances',
      currentStep: 1,
      isDeploying: false,
      instanceSearchText: '',
      selectedInstance: null,

      // Shared list of instances from store
      instancesList: getStoredInstances(),

      // Form state matching screenshot
      form: {
        instanceName: 'web-server-02',
        description: 'Web server for production environment',
        zone: 'Zone-1',
        project: 'Default Project',
        template: 'Ubuntu 24.04 LTS (x86_64)',
        instanceType: 'Medium (2 vCPU, 4 GB RAM)',
        instanceCount: 1,
        rootDiskTier: 'NVMe High Performance SSD',
        rootDiskSize: 50,
        enableDataDisk: false,
        dataDiskSize: 100,
        dataDiskMount: '/data',
        ipMode: 'Auto-assign via DHCP',
        securityGroup: 'Default Web Tier (HTTP, HTTPS, SSH)',
        sshKey: 'devops-prod-key (ED25519)'
      }
    }
  },
  computed: {
    networkNameOnly () {
      const q = this.$route.query
      if (q && q.network) {
        return q.network
      }
      return 'GM1'
    },
    networkTypeDisplay () {
      const q = this.$route.query
      if (q && q.type) {
        return q.type
      }
      return 'General Network'
    },
    networkDisplayFull () {
      return `${this.networkNameOnly} (${this.networkTypeDisplay})`
    },
    originRoute () {
      const q = this.$route.query
      if (q && q.from === 'jio') {
        return '/jionetwork'
      }
      if (q && q.from === 'airtel') {
        return '/airtelnetwork'
      }
      return '/airtelnetwork'
    },
    filteredInstances () {
      if (!this.instanceSearchText) {
        return this.instancesList
      }
      const s = this.instanceSearchText.toLowerCase()
      return this.instancesList.filter(vm =>
        (vm.name && vm.name.toLowerCase().includes(s)) ||
        (vm.status && vm.status.toLowerCase().includes(s)) ||
        (vm.state && vm.state.toLowerCase().includes(s)) ||
        (vm.ipaddress && vm.ipaddress.toLowerCase().includes(s)) ||
        (vm.ip && vm.ip.toLowerCase().includes(s)) ||
        (vm.zonename && vm.zonename.toLowerCase().includes(s)) ||
        (vm.zone && vm.zone.toLowerCase().includes(s)) ||
        (vm.instancename && vm.instancename.toLowerCase().includes(s)) ||
        (vm.arch && vm.arch.toLowerCase().includes(s)) ||
        (vm.host && vm.host.toLowerCase().includes(s)) ||
        (vm.hostname && vm.hostname.toLowerCase().includes(s)) ||
        (vm.account && vm.account.toLowerCase().includes(s)) ||
        (vm.network && vm.network.toLowerCase().includes(s)) ||
        (vm.networkname && vm.networkname.toLowerCase().includes(s)) ||
        (vm.isp && vm.isp.toLowerCase().includes(s))
      )
    }
  },
  created () {
    this.instancesList = getStoredInstances()
    this.refreshHandler = () => {
      this.instancesList = getStoredInstances()
    }
    eventBus.on('vm-refresh-data', this.refreshHandler)
  },
  beforeUnmount () {
    if (this.refreshHandler) {
      eventBus.off('vm-refresh-data', this.refreshHandler)
    }
  },
  methods: {
    goToCreateInstance () {
      const query = {}
      if (this.$route.query?.zoneid) {
        query.zoneid = this.$route.query.zoneid
      }
      if (this.$route.query?.networkid) {
        query.networkid = this.$route.query.networkid
      }
      if (this.networkNameOnly) {
        query.networkname = this.networkNameOnly
      }
      query.from = 'isp'
      this.$router.push({
        path: '/action/deployVirtualMachine',
        query: Object.keys(query).length > 0 ? query : undefined
      })
    },
    createInstance () {
      this.goToCreateInstance()
    },
    proceedToStep (s) {
      if (s === 2 && !this.form.instanceName) {
        message.warning('Please enter an instance name')
        return
      }
      this.currentStep = s
    },
    startCreateInstance () {
      this.activeView = 'create'
      this.currentStep = 1
      this.form.instanceName = `web-server-0${this.instancesList.length + 1}`
    },
    selectInstanceRow (vm) {
      this.selectedInstance = vm
      this.form.instanceName = vm.name
    },
    toggleInstancePower (vm) {
      vm.status = vm.status === 'Running' ? 'Stopped' : 'Running'
      vm.state = vm.status
      updateStoredInstance(vm.id, { status: vm.status, state: vm.status })
      message.success(`Instance ${vm.name} is now ${vm.status}`)
    },
    restartInstance (vm) {
      message.loading({ content: `Restarting ${vm.name}...`, key: 'restart' })
      setTimeout(() => {
        vm.status = 'Running'
        vm.state = 'Running'
        updateStoredInstance(vm.id, { status: 'Running', state: 'Running' })
        message.success({ content: `Instance ${vm.name} restarted successfully`, key: 'restart' })
      }, 1000)
    },
    deleteInstance (vm) {
      this.instancesList = this.instancesList.filter(i => i.id !== vm.id)
      deleteStoredInstance(vm.id)
      message.success(`Instance ${vm.name} has been deleted`)
    },
    handleBreadcrumbClick () {
      this.goBackToNetwork()
    },
    goBackToNetwork () {
      const q = this.$route.query
      if (q && q.from === 'jio') {
        this.$router.push('/jionetwork')
      } else if (q && q.from === 'airtel') {
        this.$router.push('/airtelnetwork')
      } else if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/airtelnetwork')
      }
    },
    getNetworkBrand (vm) {
      if (vm && vm.isp) {
        return vm.isp.toLowerCase()
      }
      const net = String((vm && (vm.network || vm.networkname)) || '').toLowerCase()
      if (net.includes('jio')) return 'jio'
      if (net.includes('airtel')) return 'airtel'
      if (this.$route.query?.from === 'jio') return 'jio'
      if (this.$route.query?.from === 'airtel') return 'airtel'
      return 'airtel'
    },
    deployNewInstance () {
      this.isDeploying = true
      setTimeout(() => {
        this.isDeploying = false
        const brand = this.$route.query?.from === 'jio' || this.networkNameOnly.toLowerCase().includes('jio') ? 'Jio' : 'Airtel'
        const newVm = {
          id: String(this.instancesList.length + 1),
          name: this.form.instanceName,
          displayname: this.form.instanceName,
          instancename: `i-2-${this.form.instanceName}`,
          status: 'Running',
          state: 'Running',
          ip: `10.10.1.${50 + this.instancesList.length}`,
          ipaddress: `10.10.1.${50 + this.instancesList.length}`,
          zone: this.form.zone || 'Zone-1',
          zonename: this.form.zone || 'Zone-1',
          arch: 'x86_64',
          host: 'host-01',
          hostname: 'host-01',
          account: 'admin',
          isp: brand,
          network: this.networkNameOnly,
          networkname: this.networkNameOnly
        }
        addStoredInstance(newVm)
        this.instancesList = getStoredInstances()
        message.success(`Instance "${this.form.instanceName}" deployed successfully in ${this.networkNameOnly}!`)
      }, 1200)
    },
    showNotificationInfo () {
      message.info('3 notifications: CloudStack system healthy')
    }
  }
}
</script>

<style lang="less" scoped>
/* Main Workspace Container */
.network-instances-workspace {
  min-height: calc(100vh - 64px);
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #0f172a;
}

/* ----------------- Top Navigation Bar ----------------- */
.top-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  height: 62px;
  padding: 0 28px;
  border-bottom: 1px solid #e2e8f0;

  .breadcrumb-container {
    display: flex;
    align-items: center;
    font-size: 13.5px;
    color: #64748b;

    .bc-home {
      display: flex;
      align-items: center;
      .bc-home-icon {
        font-size: 16px;
        color: #64748b;
        transition: color 0.2s;
        &:hover { color: #2563eb; }
      }
    }

    .bc-sep {
      margin: 0 9px;
      color: #cbd5e1;
    }

    .bc-link {
      color: #64748b;
      cursor: pointer;
      text-decoration: none;
      transition: color 0.2s;
      &:hover { color: #2563eb; }
    }

    .bc-current {
      color: #0f172a;
      font-weight: 600;
    }
  }

  .top-actions-right {
    display: flex;
    align-items: center;
    gap: 22px;

    .global-search-box {
      position: relative;
      display: flex;
      align-items: center;

      .search-icon {
        position: absolute;
        left: 12px;
        color: #94a3b8;
        font-size: 14px;
        pointer-events: none;
      }

      .search-input {
        width: 320px;
        height: 38px;
        padding: 0 14px 0 36px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 13px;
        color: #0f172a;
        outline: none;
        transition: all 0.2s;

        &:focus {
          background: #ffffff;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        &::placeholder {
          color: #94a3b8;
        }
      }
    }

    .notification-wrap {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      transition: background 0.2s;

      &:hover {
        background: #f1f5f9;
      }

      .bell-icon {
        font-size: 18px;
        color: #64748b;
      }

      .notification-badge {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 16px;
        height: 16px;
        background: #ef4444;
        color: #ffffff;
        font-size: 10px;
        font-weight: 700;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .user-profile-block {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      .avatar-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #2563eb;
        color: #ffffff;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .user-info {
        display: flex;
        flex-direction: column;
        line-height: 1.25;

        .user-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #0f172a;
        }

        .user-role {
          font-size: 11.5px;
          color: #64748b;
        }
      }
    }
  }
}

/* ----------------- Main Body Two-Column Layout ----------------- */
.workspace-body {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 24px 36px;
}

/* ================= Column 1: Network Sub-Nav ================= */
.network-subnav-panel {
  width: 220px;
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  .net-identity-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;
    margin-bottom: 14px;
    border-bottom: 1px solid #f1f5f9;

    .net-icon-box {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: #eff6ff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .net-icon-globe {
        font-size: 22px;
        color: #2563eb;
      }
    }

    .net-identity-info {
      .net-name-status {
        display: flex;
        align-items: center;
        gap: 6px;

        .net-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .active-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #ecfdf5;
          color: #10b981;
          font-size: 10.5px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 10px;

          .status-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #10b981;
          }
        }
      }

      .net-subtitle {
        font-size: 12px;
        color: #64748b;
        margin: 2px 0 0;
      }
    }
  }

  .subnav-menu-list {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .subnav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 40px;
      padding: 0 12px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #475569;
      font-size: 13.5px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s;

      .subnav-icon,
      .subnav-icon-svg {
        font-size: 16px;
        color: #64748b;
        transition: color 0.2s;
      }

      &:hover {
        background: #f8fafc;
        color: #0f172a;
      }

      &.active {
        background: #eff6ff;
        color: #2563eb;
        font-weight: 600;

        .subnav-icon,
        .subnav-icon-svg {
          color: #2563eb;
        }
      }
    }
  }
}

/* ================= Column 2: Instances List ================= */
.instances-list-panel {
  flex: 1;
  min-width: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  .list-header-block {
    margin-bottom: 16px;

    .list-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;

      .list-title-wrap {
        flex: 1;
        min-width: 0;

        .list-main-title {
          font-size: 19px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 2px;
        }

        .list-sub-title {
          font-size: 12.5px;
          color: #64748b;
          margin: 0;
        }
      }

      .btn-create-instance {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: 38px;
        padding: 0 16px;
        background: #2563eb;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 13.5px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
        transition: all 0.2s;
        white-space: nowrap;
        flex-shrink: 0;

        .plus-icon {
          font-size: 13px;
        }

        &:hover {
          background: #1d4ed8;
          box-shadow: 0 4px 8px rgba(37, 99, 235, 0.25);
        }

        &:active {
          transform: translateY(1px);
        }
      }
    }
  }

  .instances-search-wrap {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 14px;

    .search-icon-sm {
      position: absolute;
      left: 10px;
      font-size: 13px;
      color: #94a3b8;
    }

    .instances-search-input {
      width: 100%;
      height: 36px;
      padding: 0 12px 0 32px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 12.5px;
      color: #0f172a;
      outline: none;
      transition: all 0.2s;

      &:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
      }
    }
  }

  .instances-table-container {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 14px;

    .instances-table {
      width: 100%;
      border-collapse: collapse;

      thead {
        background: #1890ff;
        tr th {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff !important;
          text-align: left;
          padding: 9px 12px;
          border-bottom: 1px solid #1677ff;
          white-space: nowrap;

          &.th-num { width: 34px; text-align: center; color: #e6f7ff !important; }
          &.th-actions { width: 36px; text-align: right; }
        }
      }

      tbody {
        tr.instance-row {
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: background 0.15s;

          &:hover {
            background: #f8fafc;
          }

          &.selected {
            background: #eff6ff;
          }

          td {
            padding: 10px 12px;
            font-size: 13px;
            white-space: nowrap;

            &.td-num {
              color: #94a3b8;
              font-size: 12px;
              text-align: center;
            }

            &.td-name {
              .vm-name-text {
                font-weight: 600;
                color: #0f172a;
              }
            }

            .vm-code-text {
              font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              font-size: 12px;
              color: #475569;
              background: #f1f5f9;
              padding: 2px 6px;
              border-radius: 4px;
            }

            .vm-ip-text {
              color: #0284c7;
              font-weight: 500;
              font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              font-size: 12px;
            }

            .vm-zone-text {
              color: #334155;
              font-weight: 500;
            }

            .vm-arch-badge {
              font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              font-size: 11.5px;
              color: #475569;
              background: #f1f5f9;
              padding: 2px 7px;
              border-radius: 4px;
              border: 1px solid #e2e8f0;
              font-weight: 500;
            }

            .vm-host-text {
              color: #334155;
              font-size: 12.5px;
              font-weight: 500;
            }

            .vm-account-text {
              color: #64748b;
              font-size: 12.5px;
            }

            .network-badge {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 3px 8px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 500;

              &.airtel {
                background: #fef2f2;
                border: 1px solid #fecaca;
                color: #b91c1c;

                .net-brand-icon {
                  background: #dc2626;
                  color: #ffffff;
                  font-size: 10px;
                  font-weight: 700;
                  padding: 1px 5px;
                  border-radius: 3px;
                  line-height: 1.2;
                  letter-spacing: 0.3px;
                }

                .net-name-text {
                  color: #991b1b;
                  font-weight: 600;
                }
              }

              &.jio {
                background: #eff6ff;
                border: 1px solid #bfdbfe;
                color: #1d4ed8;

                .net-brand-icon {
                  background: #002884;
                  color: #ffffff;
                  font-size: 10px;
                  font-weight: 700;
                  padding: 1px 5px;
                  border-radius: 3px;
                  line-height: 1.2;
                  letter-spacing: 0.3px;
                }

                .net-name-text {
                  color: #1e40af;
                  font-weight: 600;
                }
              }
            }

            &.td-status {
              .status-pill {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11.5px;
                font-weight: 500;

                .status-dot {
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                }

                &.running {
                  background: #ecfdf5;
                  color: #10b981;
                  .status-dot { background: #10b981; }
                }

                &.stopped {
                  background: #fef2f2;
                  color: #ef4444;
                  .status-dot { background: #ef4444; }
                }
              }
            }

            &.td-actions {
              text-align: right;
              .btn-row-more {
                background: transparent;
                border: none;
                cursor: pointer;
                color: #94a3b8;
                font-size: 14px;
                padding: 4px;
                border-radius: 4px;
                &:hover {
                  color: #0f172a;
                  background: #f1f5f9;
                }
              }
            }
          }
        }

        .no-records-cell {
          text-align: center;
          padding: 20px 10px;
          color: #94a3b8;
          font-size: 12.5px;
        }
      }
    }
  }

  .instances-table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .showing-counter {
      font-size: 12px;
      color: #94a3b8;
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 4px;

      .btn-page-nav {
        width: 26px;
        height: 26px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        color: #94a3b8;
        font-size: 10px;
        cursor: not-allowed;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-page-num {
        width: 26px;
        height: 26px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        color: #64748b;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;

        &.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }
      }
    }
  }
}

/* ================= Column 3: Create Instance Wizard (Right) ================= */
.instance-workspace-right {
  flex: 1;
  min-width: 0;

  .create-instance-wizard-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px 28px 36px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  }

  .wizard-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    .wizard-header-left {
      display: flex;
      align-items: center;
      gap: 16px;

      .server-badge-icon {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        background: #eff6ff;
        border: 1px solid #bfdbfe;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .wizard-title-block {
        .wizard-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 3px;
        }

        .wizard-subtitle {
          font-size: 13.5px;
          color: #64748b;
          margin: 0;
        }
      }
    }

    .btn-back-instances {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #ffffff;
      color: #2563eb;
      border: 1.5px solid #2563eb;
      font-size: 13.5px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      .back-icon { font-size: 13px; }

      &:hover {
        background: #eff6ff;
        color: #1d4ed8;
        border-color: #1d4ed8;
      }
    }
  }

  /* Stepper Horizontal Progress */
  .stepper-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 24px auto;
    max-width: 820px;

    .stepper-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      user-select: none;

      .step-badge {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #ffffff;
        border: 1.5px solid #cbd5e1;
        color: #64748b;
        font-size: 13.5px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .step-text {
        font-size: 12.5px;
        color: #64748b;
        font-weight: 500;
        transition: color 0.2s;
      }

      &.active {
        .step-badge {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }
        .step-text {
          color: #2563eb;
          font-weight: 600;
        }
      }

      &.completed {
        .step-badge {
          background: #eff6ff;
          border-color: #2563eb;
          color: #2563eb;
        }
        .step-text {
          color: #0f172a;
        }
      }
    }

    .step-connector {
      flex: 1;
      height: 2px;
      background: #e2e8f0;
      margin: 0 14px 20px;

      &.filled {
        background: #2563eb;
      }
    }
  }

  /* Two-Column Form Layout */
  .wizard-split-layout {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    border-top: 1px solid #f1f5f9;
    padding-top: 24px;

    .form-inputs-col {
      flex: 1;
      min-width: 0;

      .step-section-header {
        margin-bottom: 20px;
        .step-section-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 3px;
        }
        .step-section-subtitle {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }
      }

      .form-item {
        margin-bottom: 18px;

        .form-field-label {
          display: block;
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 7px;

          .star-req {
            color: #ef4444;
          }
        }

        .styled-input {
          width: 100%;
          height: 42px;
          padding: 0 14px;
          font-size: 14px;
          color: #0f172a;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;

          &:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
          }

          &.num-field {
            max-width: 100%;
          }
        }

        .styled-textarea {
          width: 100%;
          padding: 10px 14px;
          font-size: 14px;
          color: #0f172a;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          resize: vertical;
          font-family: inherit;
          transition: all 0.2s;

          &:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
          }
        }

        .styled-readonly-input {
          width: 100%;
          height: 42px;
          padding: 0 14px;
          font-size: 14px;
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          user-select: none;
        }

        .custom-select-box {
          position: relative;
          display: flex;
          align-items: center;

          .styled-select {
            width: 100%;
            height: 42px;
            padding: 0 36px 0 14px;
            font-size: 14px;
            color: #0f172a;
            background: #ffffff;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            cursor: pointer;
            transition: all 0.2s;

            &:focus {
              border-color: #2563eb;
              box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
            }
          }

          .select-arrow {
            position: absolute;
            right: 14px;
            font-size: 12px;
            color: #64748b;
            pointer-events: none;
          }

          &.os-select-container {
            .os-icon-prefix {
              position: absolute;
              left: 12px;
              display: flex;
              align-items: center;
              pointer-events: none;
              z-index: 2;

              .generic-os-icon {
                font-size: 16px;
                color: #2563eb;
              }
            }

            .select-with-icon {
              padding-left: 38px;
            }
          }
        }
      }

      .form-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .form-bottom-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 26px;
        padding-top: 20px;
        border-top: 1px solid #f1f5f9;

        &.split {
          justify-content: space-between;
        }

        .btn-wizard-primary {
          background: #2563eb;
          color: #ffffff;
          border: none;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
          transition: all 0.2s;

          .btn-arrow { font-size: 12px; }

          &:hover {
            background: #1d4ed8;
          }
        }

        .btn-wizard-secondary {
          background: #ffffff;
          color: #475569;
          border: 1px solid #cbd5e1;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;

          &:hover {
            background: #f8fafc;
            color: #0f172a;
          }
        }

        .btn-deploy-launch {
          background: #10b981;
          color: #ffffff;
          border: none;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.25);
          transition: all 0.2s;

          &:hover:not(:disabled) { background: #059669; }
          &:disabled { opacity: 0.6; cursor: not-allowed; }
        }
      }

      .data-volume-box {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 14px 18px;
        background: #f8fafc;

        .data-vol-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .vol-name { font-weight: 600; font-size: 14px; color: #334155; }
          .styled-checkbox { width: 18px; height: 18px; cursor: pointer; }
        }

        .data-vol-fields {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #e2e8f0;
          .form-sub-label { display: block; font-size: 12.5px; color: #64748b; margin-bottom: 4px; }
        }
      }

      .review-specs-box {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #f8fafc;
        padding: 14px 20px;
        margin-bottom: 20px;

        .review-row {
          display: flex;
          justify-content: space-between;
          padding: 9px 0;
          border-bottom: 1px solid #edf2f7;
          &:last-child { border-bottom: none; }
          .rk { font-size: 13.5px; color: #64748b; }
          .rv { font-size: 13.5px; font-weight: 600; color: #0f172a; }
        }
      }
    }

    /* Right Sub-column: Selected Config + Tips */
    .config-sidebar-col {
      width: 310px;
      flex-shrink: 0;

      .sel-config-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 18px 20px;
        margin-bottom: 18px;

        .sel-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;

          .sel-icon-eye {
            font-size: 17px;
            color: #2563eb;
          }

          .sel-card-title {
            font-size: 14.5px;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
          }
        }

        .sel-items-list {
          display: flex;
          flex-direction: column;
          gap: 15px;

          .sel-row-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;

            .sel-chevron {
              font-size: 16px;
              line-height: 1;
              color: #94a3b8;
              margin-top: 1px;
            }

            .sel-details {
              flex: 1;

              .sel-key {
                display: block;
                font-size: 12px;
                color: #64748b;
                margin-bottom: 2px;
              }

              .sel-val {
                display: block;
                font-size: 13.5px;
                font-weight: 600;
                color: #0f172a;
                word-break: break-word;
              }
            }
          }
        }
      }

      .tips-box-card {
        background: #f0f7ff;
        border: 1px solid #bae6fd;
        border-radius: 10px;
        padding: 16px 18px;

        .tips-box-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;

          .tips-bulb-icon {
            font-size: 17px;
            color: #0284c7;
          }

          .tips-box-title {
            font-size: 14.5px;
            font-weight: 700;
            color: #0369a1;
            margin: 0;
          }
        }

        .tips-bullet-list {
          margin: 0;
          padding-left: 18px;
          list-style-type: disc;

          li {
            font-size: 12.5px;
            line-height: 1.55;
            color: #334155;
            margin-bottom: 7px;
            &:last-child { margin-bottom: 0; }
          }
        }
      }
    }
  }
}

/* ----------------- Responsive Breakpoints ----------------- */
@media (max-width: 1280px) {
  .wizard-split-layout {
    flex-direction: column;
    .config-sidebar-col {
      width: 100%;
    }
  }
}

@media (max-width: 1024px) {
  .workspace-body {
    flex-direction: column;
  }
  .network-subnav-panel,
  .instances-list-panel {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .instances-list-panel .list-header-block .list-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    .btn-create-instance {
      width: 100%;
    }
  }
}
</style>