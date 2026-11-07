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
  <div class="isp-network-container">
    <!-- Breadcrumbs -->
    <div class="breadcrumb-bar">
      <router-link to="/dashboard" class="breadcrumb-item">
        <HomeOutlined class="breadcrumb-home-icon" />
      </router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-item">Network</span>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-item active">{{ currentNetworkTitle }}</span>
    </div>

    <!-- Header Section -->
    <div class="page-header-row">
      <div class="header-titles">
        <h1 class="page-title">Network Management</h1>
        <p class="page-subtitle">Manage ISP connectivity and datacenter networks</p>
      </div>
      <div class="header-actions">
        <a-button class="btn-network-architecture" @click="openArchitectureModal">
          <ApartmentOutlined />
          Network Architecture
        </a-button>
        <a-button class="btn-network-settings" @click="openSettingsModal">
          <SettingOutlined />
          Network Settings
        </a-button>
        <a-button type="primary" class="btn-add-isp" @click="openAddModal">
          <PlusOutlined />
          Add ISP Network
        </a-button>
      </div>
    </div>

    <!-- ISP Cards Grid -->
    <div class="isp-cards-grid">

      <!-- JIO NETWORK CARD -->
      <div class="isp-card jio-card" @click="openNetworkDetails(jioNetwork)">
        <div class="card-top jio-card-header">
          <div class="card-brand-group">
            <div class="isp-brand-logo jio-logo">
              <span class="jio-logo-text">Jio</span>
            </div>
            <div class="brand-info">
              <div class="brand-title-row">
                <span class="brand-name">{{ jioNetwork.name }}</span>
                <span class="status-pill active">
                  <span class="status-dot"></span>
                  Active
                </span>
              </div>
              <div class="brand-desc">{{ jioNetwork.subtitle }}</div>
            </div>
          </div>
          <div class="card-top-actions">
            <a-button class="btn-edit-card" size="small" @click.stop="openEditModal(jioNetwork)">
              <EditOutlined /> Edit
            </a-button>
            <RightOutlined class="card-chevron" />
          </div>
        </div>

        <div class="card-middle-stats">
          <div class="stat-col">
            <div class="stat-icon-wrap"><GlobalOutlined class="blue-icon" /></div>
            <div class="stat-content">
              <div class="stat-label">Static IP</div>
              <div class="stat-value">{{ jioNetwork.staticIp }}</div>
            </div>
          </div>
          <div class="stat-col">
            <div class="stat-icon-wrap">
              <svg class="blue-svg" viewBox="0 0 24 24">
                <rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/>
                <rect x="16" y="17" width="6" height="5" rx="1"/><line x1="12" y1="7" x2="12" y2="12"/>
                <line x1="5" y1="17" x2="5" y2="12"/><line x1="19" y1="17" x2="19" y2="12"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Gateway</div>
              <div class="stat-value">{{ jioNetwork.gateway }}</div>
            </div>
          </div>
          <div class="stat-col">
            <div class="stat-icon-wrap">
              <svg class="blue-svg" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Link Status</div>
              <div class="health-pill healthy"><span class="status-dot"></span> Healthy</div>
            </div>
          </div>
        </div>

        <div class="card-bottom-row">
          <div class="metrics-group">
            <div class="metric-item">
              <div class="metric-icon-circle"><ArrowDownOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Download</div>
                <div class="metric-value">{{ jioNetwork.download }}</div>
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-icon-circle"><ArrowUpOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Upload</div>
                <div class="metric-value">{{ jioNetwork.upload }}</div>
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-icon-circle"><ClockCircleOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Uptime</div>
                <div class="metric-value">{{ jioNetwork.uptime }}</div>
              </div>
            </div>
          </div>
          <a-button type="primary" class="btn-open-network" @click.stop="openNetworkDetails(jioNetwork)">
            Open Network <ArrowRightOutlined />
          </a-button>
        </div>
      </div>

      <!-- AIRTEL NETWORK CARD -->
      <div class="isp-card airtel-card" @click="openNetworkDetails(airtelNetwork)">
        <div class="card-top airtel-card-header">
          <div class="card-brand-group">
            <div class="isp-brand-logo airtel-logo-wrap">
              <img src="assets/airtel.png" alt="Airtel" class="airtel-card-img" />
            </div>
            <div class="brand-info">
              <div class="brand-title-row">
                <span class="brand-name">{{ airtelNetwork.name }}</span>
                <span class="status-pill active">
                  <span class="status-dot"></span>
                  Active
                </span>
              </div>
              <div class="brand-desc">{{ airtelNetwork.subtitle }}</div>
            </div>
          </div>
          <div class="card-top-actions">
            <a-button class="btn-edit-card" size="small" @click.stop="openEditModal(airtelNetwork)">
              <EditOutlined /> Edit
            </a-button>
            <RightOutlined class="card-chevron" />
          </div>
        </div>

        <div class="card-middle-stats">
          <div class="stat-col">
            <div class="stat-icon-wrap"><GlobalOutlined class="blue-icon" /></div>
            <div class="stat-content">
              <div class="stat-label">Static IP</div>
              <div class="stat-value">{{ airtelNetwork.staticIp }}</div>
            </div>
          </div>
          <div class="stat-col">
            <div class="stat-icon-wrap">
              <svg class="blue-svg" viewBox="0 0 24 24">
                <rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/>
                <rect x="16" y="17" width="6" height="5" rx="1"/><line x1="12" y1="7" x2="12" y2="12"/>
                <line x1="5" y1="17" x2="5" y2="12"/><line x1="19" y1="17" x2="19" y2="12"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Gateway</div>
              <div class="stat-value">{{ airtelNetwork.gateway }}</div>
            </div>
          </div>
          <div class="stat-col">
            <div class="stat-icon-wrap">
              <svg class="blue-svg" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Link Status</div>
              <div class="health-pill healthy"><span class="status-dot"></span> Healthy</div>
            </div>
          </div>
        </div>

        <div class="card-bottom-row">
          <div class="metrics-group">
            <div class="metric-item">
              <div class="metric-icon-circle"><ArrowDownOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Download</div>
                <div class="metric-value">{{ airtelNetwork.download }}</div>
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-icon-circle"><ArrowUpOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Upload</div>
                <div class="metric-value">{{ airtelNetwork.upload }}</div>
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-icon-circle"><ClockCircleOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Uptime</div>
                <div class="metric-value">{{ airtelNetwork.uptime }}</div>
              </div>
            </div>
          </div>
          <a-button type="primary" class="btn-open-network" @click.stop="openNetworkDetails(airtelNetwork)">
            Open Network <ArrowRightOutlined />
          </a-button>
        </div>
      </div>

      <!-- DYNAMIC ISP CARDS (added by user via Add ISP Network) -->
      <div
        class="isp-card dynamic-isp-card"
        v-for="isp in extraIspNetworks"
        :key="isp.id"
        @click="openNetworkDetails(isp)"
      >
        <div class="card-top" :class="getCardHeaderClass(isp)">
          <div class="card-brand-group">
            <!-- Airtel Logo -->
            <div v-if="isp.brand === 'airtel'" class="isp-brand-logo airtel-logo-wrap">
              <img src="assets/airtel.png" alt="Airtel" class="airtel-card-img" />
            </div>
            <!-- Jio Logo -->
            <div v-else-if="isp.brand === 'jio'" class="isp-brand-logo jio-logo">
              <span class="jio-logo-text">Jio</span>
            </div>
            <!-- Generic Logo -->
            <div v-else class="isp-brand-logo dynamic-logo">
              <span class="dynamic-logo-text">{{ isp.name.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="brand-info">
              <div class="brand-title-row">
                <span class="brand-name">{{ isp.name }}</span>
                <span class="status-pill active">
                  <span class="status-dot"></span>
                  Active
                </span>
              </div>
              <div class="brand-desc">{{ isp.subtitle }}</div>
            </div>
          </div>
          <div class="card-top-actions">
            <a-button class="btn-edit-card" size="small" @click.stop="openEditModal(isp)">
              <EditOutlined /> Edit
            </a-button>
            <RightOutlined class="card-chevron" />
          </div>
        </div>

        <div class="card-middle-stats">
          <div class="stat-col">
            <div class="stat-icon-wrap"><GlobalOutlined class="blue-icon" /></div>
            <div class="stat-content">
              <div class="stat-label">Static IP</div>
              <div class="stat-value">{{ isp.staticIp }}</div>
            </div>
          </div>
          <div class="stat-col">
            <div class="stat-icon-wrap">
              <svg class="blue-svg" viewBox="0 0 24 24">
                <rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/>
                <rect x="16" y="17" width="6" height="5" rx="1"/><line x1="12" y1="7" x2="12" y2="12"/>
                <line x1="5" y1="17" x2="5" y2="12"/><line x1="19" y1="17" x2="19" y2="12"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Gateway</div>
              <div class="stat-value">{{ isp.gateway }}</div>
            </div>
          </div>
          <div class="stat-col">
            <div class="stat-icon-wrap">
              <svg class="blue-svg" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Link Status</div>
              <div class="health-pill healthy"><span class="status-dot"></span> Healthy</div>
            </div>
          </div>
        </div>

        <div class="card-bottom-row">
          <div class="metrics-group">
            <div class="metric-item">
              <div class="metric-icon-circle"><ArrowDownOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Download</div>
                <div class="metric-value">{{ isp.download }}</div>
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-icon-circle"><ArrowUpOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Upload</div>
                <div class="metric-value">{{ isp.upload }}</div>
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-icon-circle"><ClockCircleOutlined class="metric-icon" /></div>
              <div class="metric-text">
                <div class="metric-label">Uptime</div>
                <div class="metric-value">{{ isp.uptime }}</div>
              </div>
            </div>
          </div>
          <a-button type="primary" class="btn-open-network" @click.stop="openNetworkDetails(isp)">
            Open Network <ArrowRightOutlined />
          </a-button>
        </div>
      </div>

    </div>

    <!-- Bottom ISP Connectivity Overview Card -->
    <div id="network-architecture" class="connectivity-overview-card">
      <div class="overview-left">
        <h3 class="overview-title">ISP Connectivity Overview</h3>
        <p class="overview-subtitle">Live status of ISP links, datacenter and automatic failover</p>
      </div>

      <div class="overview-diagram">
        <div class="diagram-node">
          <div class="mini-jio-logo">Jio</div>
          <div class="node-info">
            <div class="node-name-status">
              <span class="node-title">JIO NETWORK</span>
              <span class="mini-pill up"><span class="status-dot"></span> UP</span>
            </div>
            <div class="node-ip">203.0.113.10</div>
            <div class="node-speed">950 / 820 Mbps</div>
          </div>
        </div>
        <div class="green-link-line"></div>
        <div class="datacenter-node">
          <div class="datacenter-icon-circle">
            <svg class="dc-server-svg" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="8" rx="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
          </div>
          <div class="datacenter-label">Datacenter</div>
          <div class="datacenter-sublabel">Active-Active</div>
        </div>
        <div class="green-link-line"></div>
        <div class="diagram-node">
          <div class="mini-airtel-logo">
            <img src="assets/airtel.png" alt="Airtel" class="airtel-diagram-img" />
          </div>
          <div class="node-info">
            <div class="node-name-status">
              <span class="node-title">AIRTEL NETWORK</span>
              <span class="mini-pill up"><span class="status-dot"></span> UP</span>
            </div>
            <div class="node-ip">198.51.100.20</div>
            <div class="node-speed">900 / 750 Mbps</div>
          </div>
        </div>
      </div>

      <div class="failover-status-box">
        <div class="shield-icon-wrap">
          <svg class="shield-svg" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <div class="failover-text-group">
          <div class="failover-title">Failover Status</div>
          <div class="failover-desc">Both ISP links are active</div>
          <div class="failover-sub">Automatic failover configured</div>
        </div>
      </div>
    </div>

    <!-- Details Drawer Modal -->
    <a-drawer
      v-model:visible="drawerVisible"
      :title="selectedNetwork ? selectedNetwork.name + ' - Details' : 'ISP Details'"
      placement="right"
      width="640"
    >
      <div v-if="selectedNetwork" class="drawer-content">
        <div class="drawer-header-card" :class="selectedNetwork.id === 'jio' ? 'drawer-jio-bg' : (selectedNetwork.id === 'airtel' ? 'drawer-airtel-bg' : 'drawer-dynamic-bg')">
          <div class="drawer-brand">
            <div v-if="selectedNetwork.id === 'jio'" class="isp-brand-logo jio-logo">
              <span class="jio-logo-text">Jio</span>
            </div>
            <div v-else-if="selectedNetwork.id === 'airtel'" class="isp-brand-logo airtel-logo-wrap">
              <img src="assets/airtel.png" alt="Airtel" class="airtel-card-img" />
            </div>
            <div v-else class="isp-brand-logo dynamic-logo">
              <span class="dynamic-logo-text">{{ selectedNetwork.name.charAt(0).toUpperCase() }}</span>
            </div>
            <div>
              <h3>{{ selectedNetwork.name }}</h3>
              <p>{{ selectedNetwork.subtitle }}</p>
            </div>
          </div>
          <span class="status-pill active">
            <span class="status-dot"></span> Active &amp; Healthy
          </span>
        </div>

        <a-descriptions title="Network Specifications" bordered :column="2" style="margin-top: 20px;">
          <a-descriptions-item label="Static IP">{{ selectedNetwork.staticIp }}</a-descriptions-item>
          <a-descriptions-item label="Gateway">{{ selectedNetwork.gateway }}</a-descriptions-item>
          <a-descriptions-item label="Subnet Mask">255.255.255.0</a-descriptions-item>
          <a-descriptions-item label="VLAN ID">{{ selectedNetwork.vlan }}</a-descriptions-item>
          <a-descriptions-item label="Interface">{{ selectedNetwork.interface }}</a-descriptions-item>
          <a-descriptions-item label="DNS Servers">{{ selectedNetwork.dns }}</a-descriptions-item>
          <a-descriptions-item label="Bandwidth Down">{{ selectedNetwork.download }}</a-descriptions-item>
          <a-descriptions-item label="Bandwidth Up">{{ selectedNetwork.upload }}</a-descriptions-item>
          <a-descriptions-item label="Availability Uptime">{{ selectedNetwork.uptime }}</a-descriptions-item>
          <a-descriptions-item label="Latency">{{ selectedNetwork.latency }}</a-descriptions-item>
        </a-descriptions>

        <div class="traffic-section" style="margin-top: 24px;">
          <h4>Live Link Utilization</h4>
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span>Download Rate (Current: {{ selectedNetwork.curDown }})</span>
              <span>Capacity: {{ selectedNetwork.download }}</span>
            </div>
            <a-progress :percent="selectedNetwork.downPercent" status="active" strokeColor="#1677ff" />
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span>Upload Rate (Current: {{ selectedNetwork.curUp }})</span>
              <span>Capacity: {{ selectedNetwork.upload }}</span>
            </div>
            <a-progress :percent="selectedNetwork.upPercent" status="active" strokeColor="#52c41a" />
          </div>
        </div>

        <div style="margin-top: 32px; display: flex; gap: 12px; justify-content: flex-end;">
          <a-button @click="testPing(selectedNetwork)">Run Ping Diagnostics</a-button>
          <a-button type="primary" @click="drawerVisible = false">Close</a-button>
        </div>
      </div>
    </a-drawer>

    <!-- Add ISP Network Modal -->
    <a-modal
      v-model:visible="addModalVisible"
      title="Add ISP Network Connection"
      okText="Create Connection"
      @ok="handleAddNetwork"
      width="580px"
    >
      <a-form layout="vertical">
        <a-form-item label="ISP Provider Name" required>
          <a-input v-model:value="newIsp.name" placeholder="e.g. TATA Telecommunications, BSNL Enterprise" />
        </a-form-item>
        <a-form-item label="Subtitle / Description">
          <a-input v-model:value="newIsp.subtitle" placeholder="e.g. TATA - Internet Connectivity" />
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Static IP" required>
              <a-input v-model:value="newIsp.staticIp" placeholder="e.g. 103.21.244.15" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Gateway" required>
              <a-input v-model:value="newIsp.gateway" placeholder="e.g. 103.21.244.1" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="DNS Servers">
              <a-input v-model:value="newIsp.dns" placeholder="e.g. 8.8.8.8, 8.8.4.4" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="VLAN ID">
              <a-input v-model:value="newIsp.vlan" placeholder="e.g. 1005" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Download Speed (Mbps)">
              <a-input-number v-model:value="newIsp.downloadSpeed" style="width: 100%" :min="10" :max="10000" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Upload Speed (Mbps)">
              <a-input-number v-model:value="newIsp.uploadSpeed" style="width: 100%" :min="10" :max="10000" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="Physical Interface">
          <a-select v-model:value="newIsp.interface" placeholder="Select Interface">
            <a-select-option value="eth2">eth2 (10G SFP+)</a-select-option>
            <a-select-option value="eth3">eth3 (10G SFP+)</a-select-option>
            <a-select-option value="bond0">bond0 (Aggregated)</a-select-option>
          </a-select>
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Latency">
              <a-input v-model:value="newIsp.latency" placeholder="e.g. 5.0 ms" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Uptime SLA">
              <a-input v-model:value="newIsp.uptime" placeholder="e.g. 99.9%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

    <!-- Edit ISP Network Modal -->
    <a-modal
      v-model:visible="editModalVisible"
      title="Edit ISP Network"
      okText="Save Changes"
      @ok="handleEditNetwork"
      width="580px"
    >
      <a-form layout="vertical" v-if="editIsp">
        <a-form-item label="ISP Provider Name" required>
          <a-input v-model:value="editIsp.name" placeholder="ISP Provider Name" />
        </a-form-item>
        <a-form-item label="Subtitle / Description">
          <a-input v-model:value="editIsp.subtitle" placeholder="Description" />
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Static IP" required>
              <a-input v-model:value="editIsp.staticIp" placeholder="e.g. 203.0.113.10" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Gateway" required>
              <a-input v-model:value="editIsp.gateway" placeholder="e.g. 203.0.113.1" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="DNS Servers">
              <a-input v-model:value="editIsp.dns" placeholder="e.g. 8.8.8.8, 8.8.4.4" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="VLAN ID">
              <a-input v-model:value="editIsp.vlan" placeholder="e.g. 1002" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Download Bandwidth">
              <a-input v-model:value="editIsp.download" placeholder="e.g. 950 Mbps" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Upload Bandwidth">
              <a-input v-model:value="editIsp.upload" placeholder="e.g. 820 Mbps" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Physical Interface">
              <a-input v-model:value="editIsp.interface" placeholder="e.g. eth0 (10G SFP+)" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Latency">
              <a-input v-model:value="editIsp.latency" placeholder="e.g. 4.2 ms" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="Uptime SLA">
          <a-input v-model:value="editIsp.uptime" placeholder="e.g. 99.98%" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Network Settings Modal -->
    <a-modal
      v-model:visible="settingsModalVisible"
      title="ISP & Datacenter Network Settings"
      okText="Save Settings"
      @ok="saveSettings"
      width="580px"
    >
      <a-form layout="vertical">
        <a-form-item label="Failover Configuration Mode">
          <a-radio-group v-model:value="settings.failoverMode">
            <a-radio value="active-active">Active - Active (Load Balanced)</a-radio>
            <a-radio value="active-passive">Active - Passive (Hot Standby)</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Health Check Probe Target IP">
          <a-input v-model:value="settings.probeIp" placeholder="8.8.8.8, 1.1.1.1" />
        </a-form-item>
        <a-form-item label="Health Check Interval (seconds)">
          <a-slider v-model:value="settings.checkInterval" :min="1" :max="30" />
        </a-form-item>
        <a-form-item label="Automatic Failover Threshold (Missed Pings)">
          <a-input-number v-model:value="settings.failThreshold" :min="2" :max="10" style="width: 100%" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Network Architecture Modal -->
    <a-modal
      v-model:visible="architectureModalVisible"
      title="Datacenter Network Architecture & Topology"
      :footer="null"
      width="900px"
      centered
      class="architecture-modal"
    >
      <div class="arch-modal-content">
        <div class="arch-modal-header-desc">
          High-level topology overview showing external ISP providers, redundant edge firewalls, datacenter core switching, and isolated network zones.
        </div>

        <div class="arch-topology-flow">
          <!-- Tier 1: Internet & External ISPs -->
          <div class="arch-tier">
            <div class="arch-tier-label">
              <span class="arch-tier-tag">TIER 1</span>
              <span class="arch-tier-name">External ISP Carriers</span>
            </div>
            <div class="arch-cards-row">
              <div class="arch-node-box jio-node">
                <div class="arch-node-top">
                  <span class="arch-logo jio">Jio</span>
                  <span class="arch-node-badge active">UP</span>
                </div>
                <div class="arch-node-title">{{ jioNetwork.name }}</div>
                <div class="arch-node-meta">IP: {{ jioNetwork.staticIp }}</div>
                <div class="arch-node-meta">Cap: {{ jioNetwork.download }} &bull; VLAN {{ jioNetwork.vlan }}</div>
              </div>

              <div class="arch-node-box airtel-node">
                <div class="arch-node-top">
                  <span class="arch-logo airtel"><img src="assets/airtel.png" alt="Airtel" /></span>
                  <span class="arch-node-badge active">UP</span>
                </div>
                <div class="arch-node-title">{{ airtelNetwork.name }}</div>
                <div class="arch-node-meta">IP: {{ airtelNetwork.staticIp }}</div>
                <div class="arch-node-meta">Cap: {{ airtelNetwork.download }} &bull; VLAN {{ airtelNetwork.vlan }}</div>
              </div>

              <div
                v-for="isp in extraIspNetworks"
                :key="isp.id"
                class="arch-node-box custom-node"
              >
                <div class="arch-node-top">
                  <span class="arch-logo custom">{{ isp.name.charAt(0).toUpperCase() }}</span>
                  <span class="arch-node-badge active">UP</span>
                </div>
                <div class="arch-node-title">{{ isp.name }}</div>
                <div class="arch-node-meta">IP: {{ isp.staticIp }}</div>
                <div class="arch-node-meta">Cap: {{ isp.download }} &bull; VLAN {{ isp.vlan || 'N/A' }}</div>
              </div>
            </div>
          </div>

          <!-- Connecting Trunk Lines -->
          <div class="arch-connector-line">
            <div class="line-pulse"></div>
            <span class="connector-label">Dual BGP Peering (10GbE Uplinks)</span>
          </div>

          <!-- Tier 2: Edge Security & Datacenter Gateways -->
          <div class="arch-tier">
            <div class="arch-tier-label">
              <span class="arch-tier-tag">TIER 2</span>
              <span class="arch-tier-name">Edge Routing &amp; Failover</span>
            </div>
            <div class="arch-center-box">
              <div class="arch-core-header">
                <div class="core-icon-wrap">
                  <svg class="dc-server-svg" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
                <div>
                  <div class="core-title">Datacenter Gateway Cluster (HA Active-Active)</div>
                  <div class="core-subtitle">VRRP / BGP Equal-Cost Multi-Path &bull; Auto Health-Probe Failover</div>
                </div>
              </div>
              <div class="core-specs-grid">
                <div class="core-stat">
                  <span class="stat-lbl">Failover Mode</span>
                  <span class="stat-val highlight">{{ settings.failoverMode === 'active-active' ? 'Active - Active' : 'Active - Passive' }}</span>
                </div>
                <div class="core-stat">
                  <span class="stat-lbl">Probe Target</span>
                  <span class="stat-val">{{ settings.probeIp }}</span>
                </div>
                <div class="core-stat">
                  <span class="stat-lbl">Heartbeat</span>
                  <span class="stat-val">{{ settings.checkInterval }}s interval</span>
                </div>
                <div class="core-stat">
                  <span class="stat-lbl">Switchover SLA</span>
                  <span class="stat-val">&lt; 1.2s instant</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Connecting Trunk Lines -->
          <div class="arch-connector-line">
            <div class="line-pulse"></div>
            <span class="connector-label">Core Distribution Switch Fabric (100GbE M-LAG)</span>
          </div>

          <!-- Tier 3: Isolated Network Segments -->
          <div class="arch-tier">
            <div class="arch-tier-label">
              <span class="arch-tier-tag">TIER 3</span>
              <span class="arch-tier-name">Datacenter Network Zones</span>
            </div>
            <div class="arch-zones-grid">
              <div class="zone-box zone-blue">
                <div class="zone-name"><GlobalOutlined /> General Network</div>
                <div class="zone-desc">Core service subnet, DNS &amp; NTP</div>
                <div class="zone-pill">VLAN 1001-1010</div>
              </div>
              <div class="zone-box zone-green">
                <div class="zone-name"><svg class="zone-svg" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> Ping / Telemetry</div>
                <div class="zone-desc">Health-checking &amp; node heartbeat</div>
                <div class="zone-pill">VLAN 1020-1030</div>
              </div>
              <div class="zone-box zone-purple">
                <div class="zone-name"><svg class="zone-svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /></svg> Local Network</div>
                <div class="zone-desc">Inter-VM cluster &amp; database traffic</div>
                <div class="zone-pill">VLAN 1040-1060</div>
              </div>
              <div class="zone-box zone-orange">
                <div class="zone-name"><svg class="zone-svg" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> Isolated VPC</div>
                <div class="zone-desc">Tenant isolation &amp; security groups</div>
                <div class="zone-pill">VXLAN Overlay</div>
              </div>
            </div>
          </div>
        </div>

        <div class="arch-modal-footer">
          <a-button @click="scrollToOverview">
            View Live Overview Section
          </a-button>
          <a-button type="primary" @click="architectureModalVisible = false">
            Close Architecture
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  HomeOutlined,
  SettingOutlined,
  PlusOutlined,
  RightOutlined,
  GlobalOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  EditOutlined,
  ApartmentOutlined
} from '@ant-design/icons-vue'
import message from 'ant-design-vue/es/message'

export default {
  name: 'IspNetworkView',
  components: {
    HomeOutlined,
    SettingOutlined,
    PlusOutlined,
    RightOutlined,
    GlobalOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
    ClockCircleOutlined,
    ArrowRightOutlined,
    EditOutlined,
    ApartmentOutlined
  },
  data () {
    return {
      drawerVisible: false,
      addModalVisible: false,
      editModalVisible: false,
      settingsModalVisible: false,
      architectureModalVisible: false,
      selectedNetwork: null,
      editIsp: null,
      editTargetId: null,
      jioNetwork: {
        id: 'jio',
        name: 'JIO NETWORK',
        subtitle: 'Reliance Jio - Internet Connectivity',
        staticIp: '203.0.113.10',
        gateway: '203.0.113.1',
        download: '950 Mbps',
        upload: '820 Mbps',
        uptime: '99.98%',
        vlan: '1002',
        interface: 'eth0 (10G SFP+)',
        dns: '49.45.0.1, 49.45.0.2',
        latency: '4.2 ms',
        curDown: '412 Mbps',
        curUp: '280 Mbps',
        downPercent: 43,
        upPercent: 34
      },
      airtelNetwork: {
        id: 'airtel',
        name: 'AIRTEL NETWORK',
        subtitle: 'Bharti Airtel - Internet Connectivity',
        staticIp: '198.51.100.20',
        gateway: '198.51.100.1',
        download: '900 Mbps',
        upload: '750 Mbps',
        uptime: '99.95%',
        vlan: '1004',
        interface: 'eth1 (10G SFP+)',
        dns: '125.63.242.1, 125.63.242.2',
        latency: '5.1 ms',
        curDown: '390 Mbps',
        curUp: '210 Mbps',
        downPercent: 43,
        upPercent: 28
      },
      extraIspNetworks: JSON.parse(localStorage.getItem('isp_extra_networks') || '[]'),
      newIsp: {
        name: '',
        subtitle: '',
        staticIp: '',
        gateway: '',
        dns: '',
        vlan: '',
        downloadSpeed: 1000,
        uploadSpeed: 1000,
        interface: 'eth2',
        latency: '',
        uptime: ''
      },
      settings: {
        failoverMode: 'active-active',
        probeIp: '8.8.8.8, 1.1.1.1',
        checkInterval: 5,
        failThreshold: 3
      }
    }
  },
  computed: {
    currentNetworkTitle () {
      const p = this.$route.path
      if (p.startsWith('/guestnetwork')) return 'Guest Networks'
      if (p.startsWith('/generalnetwork')) return 'General Networks'
      if (p.startsWith('/pingnetwork')) return 'Ping Networks'
      if (p.startsWith('/localnetwork')) return 'Local Networks'
      if (p.startsWith('/vpc')) return 'VPC'
      if (p.startsWith('/publicip')) return 'Public IP Addresses'
      if (p.startsWith('/s2svpn')) return 'Site-to-site VPN'
      return 'ISP Networks'
    }
  },
  methods: {
    openNetworkDetails (network) {
      if (network && (network.id === 'jio' || (network.name && network.name.toLowerCase().includes('jio')))) {
        this.$router.push('/jionetwork')
        return
      }
      if (network && (network.id === 'airtel' || (network.name && network.name.toLowerCase().includes('airtel')))) {
        this.$router.push('/airtelnetwork')
        return
      }
      this.selectedNetwork = network
      this.drawerVisible = true
    },
    openAddModal () {
      this.newIsp = {
        name: '',
        subtitle: '',
        staticIp: '',
        gateway: '',
        dns: '',
        vlan: '',
        downloadSpeed: 1000,
        uploadSpeed: 1000,
        interface: 'eth2',
        latency: '',
        uptime: ''
      }
      this.addModalVisible = true
    },
    handleAddNetwork () {
      if (!this.newIsp.name || !this.newIsp.staticIp) {
        message.warning('Please enter ISP Name and Static IP')
        return
      }
      const nameLower = this.newIsp.name.toLowerCase()
      let brand = 'generic'
      if (nameLower.includes('airtel')) brand = 'airtel'
      else if (nameLower.includes('jio')) brand = 'jio'

      const newCard = {
        id: 'isp-' + Date.now(),
        brand: brand,
        name: this.newIsp.name.toUpperCase(),
        subtitle: this.newIsp.subtitle || (this.newIsp.name + ' - Internet Connectivity'),
        staticIp: this.newIsp.staticIp,
        gateway: this.newIsp.gateway,
        download: this.newIsp.downloadSpeed + ' Mbps',
        upload: this.newIsp.uploadSpeed + ' Mbps',
        uptime: this.newIsp.uptime || '99.9%',
        vlan: this.newIsp.vlan || 'N/A',
        interface: this.newIsp.interface || 'eth2',
        dns: this.newIsp.dns || 'N/A',
        latency: this.newIsp.latency || 'N/A',
        curDown: Math.floor(this.newIsp.downloadSpeed * 0.4) + ' Mbps',
        curUp: Math.floor(this.newIsp.uploadSpeed * 0.3) + ' Mbps',
        downPercent: 40,
        upPercent: 30
      }
      this.extraIspNetworks.push(newCard)
      localStorage.setItem('isp_extra_networks', JSON.stringify(this.extraIspNetworks))
      message.success(`ISP connection "${this.newIsp.name}" added successfully`)
      this.addModalVisible = false
    },
    openEditModal (network) {
      this.editTargetId = network.id
      this.editIsp = { ...network }
      this.editModalVisible = true
    },
    handleEditNetwork () {
      if (!this.editIsp.name || !this.editIsp.staticIp) {
        message.warning('Please enter ISP Name and Static IP')
        return
      }
      if (this.editTargetId === 'jio') {
        Object.assign(this.jioNetwork, this.editIsp)
      } else if (this.editTargetId === 'airtel') {
        Object.assign(this.airtelNetwork, this.editIsp)
      } else {
        const idx = this.extraIspNetworks.findIndex(n => n.id === this.editTargetId)
        if (idx >= 0) {
          this.extraIspNetworks[idx] = { ...this.editIsp }
          localStorage.setItem('isp_extra_networks', JSON.stringify(this.extraIspNetworks))
        }
      }
      message.success(`ISP network "${this.editIsp.name}" updated successfully`)
      this.editModalVisible = false
      this.editIsp = null
      this.editTargetId = null
    },
    openSettingsModal () {
      this.settingsModalVisible = true
    },
    openArchitectureModal () {
      this.$router.push('/networkarchitecture')
    },
    scrollToOverview () {
      this.architectureModalVisible = false
      this.$nextTick(() => {
        const el = document.getElementById('network-architecture')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
    getCardHeaderClass (isp) {
      if (isp.brand === 'airtel') return 'airtel-card-header'
      if (isp.brand === 'jio') return 'jio-card-header'
      return 'dynamic-card-header'
    },
    saveSettings () {
      message.success('Datacenter network settings updated successfully')
      this.settingsModalVisible = false
    },
    testPing (network) {
      message.loading(`Pinging gateway ${network.gateway}...`, 1.5).then(() => {
        message.success(`Gateway ${network.gateway} responded in ${network.latency} (0% packet loss)`)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.isp-network-container {
  padding: 20px 24px 40px;
  background-color: #f8fafc;
  min-height: calc(100vh - 64px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #0f172a;
}

/* Breadcrumb */
.breadcrumb-bar {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 16px;

  .breadcrumb-home-icon {
    font-size: 15px;
    color: #64748b;
    transition: color 0.2s;
    &:hover { color: #1677ff; }
  }

  .breadcrumb-sep { margin: 0 8px; color: #94a3b8; }

  .breadcrumb-item {
    color: #64748b;
    &.active { color: #1e293b; font-weight: 500; }
  }
}

/* Page Header Row */
.page-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;

  .header-titles {
    .page-title { font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.2; margin: 0 0 6px 0; }
    .page-subtitle { font-size: 13px; color: #64748b; margin: 0; }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;

    .btn-network-architecture {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #1e293b;
      font-weight: 500;
      border-radius: 6px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      &:hover {
        border-color: #0284c7;
        color: #0284c7;
        background: #f0f9ff;
      }
    }

    .btn-network-settings {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #1e293b;
      font-weight: 500;
      border-radius: 6px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      &:hover { border-color: #94a3b8; color: #0f172a; }
    }

    .btn-add-isp {
      background: #1677ff;
      border-color: #1677ff;
      color: #ffffff;
      font-weight: 500;
      border-radius: 6px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 1px 2px rgba(22, 119, 255, 0.2);
      &:hover { background: #4096ff; border-color: #4096ff; }
    }
  }
}

/* ISP Cards Grid */
.isp-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
  align-items: stretch;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
}

.isp-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    min-height: 88px;
    box-sizing: border-box;

    &.jio-card-header { background-color: #f0f7ff; border-bottom: 1px solid #dbeafe; }
    &.airtel-card-header { background-color: #fff1f1; border-bottom: 1px solid #fed7d7; }
    &.dynamic-card-header { background-color: #f0fdf4; border-bottom: 1px solid #bbf7d0; }

    .card-brand-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .card-top-actions {
      display: flex;
      align-items: center;
      gap: 10px;

      .btn-edit-card {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        color: #334155;
        font-size: 12px;
        font-weight: 500;
        border-radius: 6px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 0 10px;
        &:hover { background: #f1f5f9; border-color: #94a3b8; color: #1677ff; }
      }

      .card-chevron { color: #1677ff; font-size: 15px; }
    }

    .isp-brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      &.jio-logo {
        width: 52px; height: 52px; border-radius: 50%;
        background-color: #002884; color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 40, 132, 0.2);
        .jio-logo-text { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
      }

      &.airtel-logo-wrap {
        width: 52px; height: 52px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        .airtel-card-img { width: 52px; height: 52px; object-fit: contain; mix-blend-mode: multiply; display: block; transform: scale(1.15); }
      }

      &.dynamic-logo {
        width: 52px; height: 52px; border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: #ffffff; box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
        .dynamic-logo-text { font-size: 24px; font-weight: 800; }
      }
    }

    .brand-info {
      display: flex; flex-direction: column;
      .brand-title-row {
        display: flex; align-items: center; gap: 10px;
        .brand-name { font-size: 15px; font-weight: 700; color: #0f172a; letter-spacing: 0.3px; }
      }
      .brand-desc { font-size: 12px; color: #64748b; margin-top: 3px; }
    }
  }

  /* Middle Stats Row */
  .card-middle-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 16px 20px;
    background: #ffffff;
    border-bottom: 1px solid #f1f5f9;
    align-items: center;
    flex: 1;

    .stat-col {
      display: flex; align-items: center; gap: 10px;
      .stat-icon-wrap {
        display: flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; border-radius: 8px; background: #eff6ff; flex-shrink: 0;
        .blue-icon { color: #1677ff; font-size: 18px; }
        .blue-svg { width: 20px; height: 20px; fill: none; stroke: #1677ff; stroke-width: 2px; stroke-linecap: round; stroke-linejoin: round; }
      }
      .stat-content {
        .stat-label { font-size: 11px; color: #64748b; margin-bottom: 2px; }
        .stat-value { font-size: 13.5px; font-weight: 700; color: #0f172a; letter-spacing: -0.2px; }
      }
    }
  }

  /* Bottom Metrics Row */
  .card-bottom-row {
    display: flex; align-items: center; justify-content: space-between; padding: 14px 20px 16px;
    .metrics-group {
      display: flex; align-items: center; gap: 20px;
      .metric-item {
        display: flex; align-items: center; gap: 8px;
        .metric-icon-circle {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%; background: #eff6ff; color: #1677ff; font-size: 12px;
        }
        .metric-text {
          .metric-label { font-size: 10px; color: #64748b; line-height: 1.1; }
          .metric-value { font-size: 13px; font-weight: 600; color: #0f172a; }
        }
      }
    }
    .btn-open-network {
      background: #1677ff; border-color: #1677ff; border-radius: 6px; font-weight: 500;
      height: 34px; font-size: 12.5px; padding: 0 14px; display: inline-flex; align-items: center; gap: 6px;
      &:hover { background: #4096ff; }
    }
  }
}

/* Status Pills */
.status-pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;
  &.active {
    background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;
    .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
  }
}

.health-pill {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600;
  &.healthy {
    background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;
    .status-dot { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; }
  }
}

/* Connectivity Overview Card */
.connectivity-overview-card {
  background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 18px 24px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex; align-items: center; justify-content: space-between; gap: 20px;

  @media (max-width: 1200px) { flex-direction: column; align-items: stretch; }

  .overview-left {
    min-width: 240px;
    .overview-title { font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0; }
    .overview-subtitle { font-size: 12px; color: #64748b; margin: 0; line-height: 1.4; }
  }

  .overview-diagram {
    display: flex; align-items: center; justify-content: center; flex: 1; gap: 12px;

    .diagram-node {
      display: flex; align-items: center; gap: 10px;
      .mini-jio-logo {
        width: 32px; height: 32px; border-radius: 50%; background-color: #002884; color: #ffffff;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; font-weight: 800; flex-shrink: 0;
      }
      .mini-airtel-logo {
        width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        .airtel-diagram-img { width: 32px; height: 32px; object-fit: contain; mix-blend-mode: multiply; display: block; transform: scale(1.15); }
      }
      .node-info {
        .node-name-status {
          display: flex; align-items: center; gap: 6px;
          .node-title { font-size: 11px; font-weight: 700; color: #0f172a; }
          .mini-pill {
            display: inline-flex; align-items: center; gap: 3px;
            padding: 1px 5px; border-radius: 8px; font-size: 9.5px; font-weight: 700;
            &.up {
              background: #dcfce7; color: #15803d;
              .status-dot { width: 4px; height: 4px; border-radius: 50%; background: #22c55e; }
            }
          }
        }
        .node-ip { font-size: 11px; color: #64748b; line-height: 1.2; }
        .node-speed { font-size: 11px; font-weight: 600; color: #1e293b; }
      }
    }

    .green-link-line { height: 3px; background: #22c55e; flex: 1; min-width: 36px; max-width: 90px; border-radius: 2px; }

    .datacenter-node {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      .datacenter-icon-circle {
        width: 36px; height: 36px; border-radius: 50%; background: #1677ff;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 8px rgba(22, 119, 255, 0.3);
        .dc-server-svg { width: 22px; height: 22px; fill: none; stroke: #ffffff; stroke-width: 2px; stroke-linecap: round; stroke-linejoin: round; }
      }
      .datacenter-label { font-size: 11.5px; font-weight: 700; color: #0f172a; margin-top: 4px; }
      .datacenter-sublabel { font-size: 10px; font-weight: 600; color: #059669; }
    }
  }

  .failover-status-box {
    display: flex; align-items: center; gap: 12px;
    background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;
    padding: 10px 16px; min-width: 200px;
    .shield-icon-wrap {
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      .shield-svg { width: 28px; height: 28px; fill: none; stroke: #16a34a; stroke-width: 2.2px; stroke-linecap: round; stroke-linejoin: round; }
    }
    .failover-text-group {
      .failover-title { font-size: 12.5px; font-weight: 700; color: #15803d; margin-bottom: 2px; }
      .failover-desc { font-size: 11px; font-weight: 500; color: #334155; }
      .failover-sub { font-size: 10.5px; color: #64748b; }
    }
  }
}

/* Drawer Styling */
.drawer-header-card {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;
  &.drawer-jio-bg { background: #f0f7ff; border-color: #dbeafe; }
  &.drawer-airtel-bg { background: #fff1f1; border-color: #fed7d7; }
  &.drawer-dynamic-bg { background: #f0fdf4; border-color: #bbf7d0; }
  .drawer-brand {
    display: flex; align-items: center; gap: 12px;
    h3 { margin: 0; font-size: 16px; font-weight: 700; color: #0f172a; }
    p { margin: 2px 0 0; font-size: 12px; color: #64748b; }
  }
}

/* Network Architecture Modal */
.arch-modal-content {
  padding: 4px 0 12px;

  .arch-modal-header-desc {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 20px;
    line-height: 1.5;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 10px 14px;
    border-radius: 8px;
  }

  .arch-topology-flow {
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: #fdfefe;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 18px 20px;
  }

  .arch-tier {
    .arch-tier-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;

      .arch-tier-tag {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.5px;
        background: #0ea5e9;
        color: #ffffff;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .arch-tier-name {
        font-size: 12px;
        font-weight: 700;
        color: #334155;
        text-transform: uppercase;
        letter-spacing: 0.4px;
      }
    }
  }

  .arch-cards-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }

  .arch-node-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 14px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;

    &:hover {
      border-color: #0284c7;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
    }

    &.jio-node {
      border-top: 3px solid #002884;
    }
    &.airtel-node {
      border-top: 3px solid #e11d48;
    }
    &.custom-node {
      border-top: 3px solid #059669;
    }

    .arch-node-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;

      .arch-logo {
        &.jio {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #002884;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
        }
        &.airtel img {
          width: 26px;
          height: 26px;
          object-fit: contain;
          mix-blend-mode: multiply;
        }
        &.custom {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #059669;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
        }
      }

      .arch-node-badge {
        font-size: 10px;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: 10px;
        &.active {
          background: #dcfce7;
          color: #15803d;
        }
      }
    }

    .arch-node-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .arch-node-meta {
      font-size: 11.5px;
      color: #64748b;
      line-height: 1.4;
    }
  }

  .arch-connector-line {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 0;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 2px;
      background: #cbd5e1;
      z-index: 1;
    }

    .connector-label {
      position: relative;
      z-index: 2;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 3px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      color: #475569;
    }
  }

  .arch-center-box {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 14px 18px;

    .arch-core-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;

      .core-icon-wrap {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: #0284c7;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        .dc-server-svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: #ffffff;
          stroke-width: 2px;
        }
      }

      .core-title {
        font-size: 13.5px;
        font-weight: 700;
        color: #0f172a;
      }
      .core-subtitle {
        font-size: 11.5px;
        color: #64748b;
      }
    }

    .core-specs-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      .core-stat {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .stat-lbl {
          font-size: 10.5px;
          color: #64748b;
        }
        .stat-val {
          font-size: 12px;
          font-weight: 600;
          color: #1e293b;
          &.highlight {
            color: #0284c7;
          }
        }
      }
    }
  }

  .arch-zones-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    .zone-box {
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border: 1px solid transparent;

      .zone-name {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12.5px;
        font-weight: 700;

        .zone-svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
      }

      .zone-desc {
        font-size: 11px;
        color: #64748b;
        line-height: 1.3;
      }

      .zone-pill {
        margin-top: 4px;
        align-self: flex-start;
        font-size: 10px;
        font-weight: 600;
        padding: 1px 6px;
        border-radius: 4px;
      }

      &.zone-blue {
        background: #f0f9ff;
        border-color: #bae6fd;
        .zone-name { color: #0284c7; }
        .zone-pill { background: #e0f2fe; color: #0369a1; }
      }
      &.zone-green {
        background: #f0fdf4;
        border-color: #bbf7d0;
        .zone-name { color: #16a34a; }
        .zone-pill { background: #dcfce7; color: #15803d; }
      }
      &.zone-purple {
        background: #faf5ff;
        border-color: #e9d5ff;
        .zone-name { color: #9333ea; }
        .zone-pill { background: #f3e8ff; color: #7e22ce; }
      }
      &.zone-orange {
        background: #fff7ed;
        border-color: #fed7aa;
        .zone-name { color: #ea580c; }
        .zone-pill { background: #ffedd5; color: #c2410c; }
      }
    }
  }

  .arch-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 18px;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
  }
}
</style>
