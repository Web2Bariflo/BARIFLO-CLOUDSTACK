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
  <div class="network-incident-page">
    <!-- Breadcrumb Bar -->
    <div class="breadcrumb-bar">
      <router-link to="/dashboard" class="breadcrumb-item">
        <HomeOutlined class="breadcrumb-home-icon" />
      </router-link>
      <span class="breadcrumb-sep">/</span>
      <router-link to="/ispnetwork" class="breadcrumb-item">Network</router-link>
      <span class="breadcrumb-sep">/</span>
      <router-link to="/networkarchitecture" class="breadcrumb-item">Topology</router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-item active">GM3 (VLAN 192.168.30.0/24)</span>
    </div>

    <!-- Page Header Row -->
    <div class="page-header-row">
      <div class="header-titles">
        <h1 class="page-title">GM3 — Network Details ({{ selectedVmName }})</h1>
        <span v-if="currentVm.status === 'Failed'" class="incident-badge failed-badge">
          <span class="badge-triangle">⚠</span> Incident Detected
        </span>
        <span v-else class="incident-badge healthy-badge">
          <span class="badge-dot-green"></span> Operational
        </span>
      </div>
      <div class="header-right-meta">
        <div class="live-pill">
          <span class="live-dot"></span>
          <span>Live</span>
        </div>
        <span class="last-update-text">Last Update: {{ lastUpdatedTime }}</span>
        <button class="btn-refresh" @click="refreshData" title="Refresh Live Data">
          <ReloadOutlined :spin="refreshing" />
        </button>
      </div>
    </div>

    <!-- Navigation / Action Tabs Toolbar -->
    <div class="action-tabs-toolbar">
      <button class="btn-back-nav" @click="goBack" title="Back to Topology">
        <ArrowLeftOutlined />
      </button>
      <div class="tabs-btn-group">
        <button
          class="nav-tab-btn"
          :class="{ active: activeTab === 'overview' }"
          @click="activeTab = 'overview'"
        >
          <AppstoreOutlined class="tab-icon" /> Overview
        </button>
        <button
          class="nav-tab-btn"
          :class="{ active: activeTab === 'instances' }"
          @click="activeTab = 'instances'"
        >
          <BarsOutlined class="tab-icon" /> Instances
        </button>
        <button
          class="nav-tab-btn"
          :class="{ active: activeTab === 'traffic' }"
          @click="activeTab = 'traffic'"
        >
          <LineChartOutlined class="tab-icon" /> Traffic Flow
        </button>
        <button
          class="nav-tab-btn"
          :class="{ active: activeTab === 'performance' }"
          @click="activeTab = 'performance'"
        >
          <CheckCircleOutlined class="tab-icon" /> Performance
        </button>
        <button
          class="nav-tab-btn"
          :class="{ active: activeTab === 'alerts' }"
          @click="activeTab = 'alerts'"
        >
          <WarningOutlined class="tab-icon" /> Alerts
        </button>
        <button
          class="nav-tab-btn"
          :class="{ active: activeTab === 'configurations' }"
          @click="activeTab = 'configurations'"
        >
          <SettingOutlined class="tab-icon" /> Configurations
        </button>
      </div>
    </div>

    <!-- Summary Banner Card (Below tabs) -->
    <div class="summary-banner-card">
      <div class="summary-banner-left">
        <div class="network-display-icon">
          <DesktopOutlined />
        </div>
        <div class="network-meta-group">
          <div class="network-name-row">
            <span class="network-name">GM3 — VLAN Network</span>
            <span class="degraded-pill">
              <span class="warning-triangle">⚠</span> Degraded
            </span>
          </div>
          <div class="network-sub-row">
            <span>VLAN ID: 30</span>
            <span class="pipe">|</span>
            <span>Subnet: 192.168.30.0/24</span>
            <span class="pipe">|</span>
            <span>Gateway: 192.168.30.1</span>
          </div>
        </div>
      </div>

      <div class="summary-banner-quad">
        <div class="quad-item">
          <span class="quad-label">Total Instances</span>
          <span class="quad-val">4</span>
        </div>
        <div class="quad-item">
          <span class="quad-label">Running</span>
          <span class="quad-val green-text">3</span>
        </div>
        <div class="quad-item">
          <span class="quad-label">Failed</span>
          <span class="quad-val red-text">1</span>
        </div>
        <div class="quad-item">
          <span class="quad-label">Uptime</span>
          <span class="quad-val">99.25%</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid (Two Columns) -->
    <div class="incident-main-grid">
      <!-- Left Column (~68%) -->
      <div class="grid-left-col">
        <!-- 1. GM3 Live Instance Topology Card -->
        <div class="panel-card topology-instance-card">
          <div class="panel-card-header">
            <div class="panel-title-group">
              <div class="title-with-icon">
                <SettingOutlined class="title-gear-icon" />
                <h3 class="panel-title">GM3 — Live Instance Topology</h3>
              </div>
              <p class="panel-subtitle">Real-time view of all instances under GM3 network (click instance to inspect)</p>
            </div>
            <div class="topology-legend-row">
              <span class="legend-item"><span class="dot green"></span> Running</span>
              <span class="legend-item"><span class="dot red"></span> Failed</span>
              <span class="legend-item"><span class="dot amber"></span> Maintenance</span>
            </div>
          </div>

          <!-- Topology Diagram Canvas -->
          <div class="instance-topology-canvas">
            <svg class="instance-tree-svg" viewBox="0 0 740 220" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker
                  id="inst-green-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 1 2 L 8 5 L 1 8 z" fill="#22c55e" />
                </marker>
                <marker
                  id="inst-red-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 1 2 L 8 5 L 1 8 z" fill="#ef4444" />
                </marker>
              </defs>

              <!-- Tree branches from GM3 Network down to instances -->
              <g class="tree-lines">
                <!-- Vertical trunk from top network node (center 370, bottom 54) to y=88 -->
                <line x1="370" y1="54" x2="370" y2="88" stroke="#22c55e" stroke-width="2.2" />

                <!-- Horizontal bus line from x=85 to x=655 at y=88 -->
                <line x1="85" y1="88" x2="655" y2="88" stroke="#22c55e" stroke-width="2.2" />

                <!-- Drop to VM-GM3-01 (x=85) -->
                <line x1="85" y1="88" x2="85" y2="128" stroke="#22c55e" stroke-width="2.2" marker-end="url(#inst-green-arrow)" />

                <!-- Drop to VM-GM3-02 (x=275) -->
                <line x1="275" y1="88" x2="275" y2="128" stroke="#22c55e" stroke-width="2.2" marker-end="url(#inst-green-arrow)" />

                <!-- Drop to VM-GM3-03 (x=465, red failed line) -->
                <line x1="465" y1="88" x2="465" y2="128" stroke="#ef4444" stroke-width="2.2" marker-end="url(#inst-red-arrow)" />

                <!-- Drop to VM-GM3-04 (x=655) -->
                <line x1="655" y1="88" x2="655" y2="128" stroke="#22c55e" stroke-width="2.2" marker-end="url(#inst-green-arrow)" />
              </g>

              <!-- Top Network Node: GM3 - Network -->
              <foreignObject x="270" y="8" width="200" height="46">
                <div class="f-top-net-card">
                  <div class="net-icon-col">
                    <svg class="net-router-svg" viewBox="0 0 24 24">
                      <rect x="2" y="8" width="20" height="8" rx="2" />
                      <circle cx="6" cy="12" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="18" cy="12" r="1.5" />
                      <line x1="12" y1="4" x2="12" y2="8" />
                    </svg>
                  </div>
                  <div class="net-text-col">
                    <span class="net-title">GM3 — Network</span>
                    <span class="net-sub">192.168.30.0/24 (VLAN 30)</span>
                  </div>
                </div>
              </foreignObject>

              <!-- Bottom Row: 4 Instance Nodes (Clickable) -->
              <!-- 1. VM-GM3-01 -->
              <foreignObject x="10" y="130" width="150" height="74" style="overflow: visible;">
                <div
                  class="f-inst-card green-inst"
                  :class="{ 'selected-active': selectedVmName === 'VM-GM3-01' }"
                  @click="selectVm('VM-GM3-01')"
                >
                  <div class="inst-top-row">
                    <span class="inst-cube-icon green">
                      <svg class="cube-svg" viewBox="0 0 24 24">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </span>
                    <div class="inst-info">
                      <span class="inst-name">VM-GM3-01</span>
                      <span class="inst-ip">192.168.30.11</span>
                    </div>
                  </div>
                  <div class="inst-status-line">
                    <span class="status-dot green"></span> Running
                  </div>
                </div>
              </foreignObject>

              <!-- 2. VM-GM3-02 -->
              <foreignObject x="200" y="130" width="150" height="74" style="overflow: visible;">
                <div
                  class="f-inst-card green-inst"
                  :class="{ 'selected-active': selectedVmName === 'VM-GM3-02' }"
                  @click="selectVm('VM-GM3-02')"
                >
                  <div class="inst-top-row">
                    <span class="inst-cube-icon green">
                      <svg class="cube-svg" viewBox="0 0 24 24">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </span>
                    <div class="inst-info">
                      <span class="inst-name">VM-GM3-02</span>
                      <span class="inst-ip">192.168.30.12</span>
                    </div>
                  </div>
                  <div class="inst-status-line">
                    <span class="status-dot green"></span> Running
                  </div>
                </div>
              </foreignObject>

              <!-- 3. VM-GM3-03 (FAILED) -->
              <foreignObject x="390" y="130" width="150" height="74" style="overflow: visible;">
                <div
                  class="f-inst-card red-inst"
                  :class="{ 'selected-active': selectedVmName === 'VM-GM3-03' }"
                  @click="selectVm('VM-GM3-03')"
                >
                  <div class="inst-top-row">
                    <span class="inst-cube-icon red">
                      <svg class="cube-svg" viewBox="0 0 24 24">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </span>
                    <div class="inst-info">
                      <span class="inst-name red-name">VM-GM3-03</span>
                      <span class="inst-ip">192.168.30.13</span>
                    </div>
                  </div>
                  <div class="inst-status-line failed-line">
                    <span class="cross-icon-sm">✕</span> Failed
                  </div>
                </div>
              </foreignObject>

              <!-- 4. VM-GM3-04 -->
              <foreignObject x="580" y="130" width="150" height="74" style="overflow: visible;">
                <div
                  class="f-inst-card green-inst"
                  :class="{ 'selected-active': selectedVmName === 'VM-GM3-04' }"
                  @click="selectVm('VM-GM3-04')"
                >
                  <div class="inst-top-row">
                    <span class="inst-cube-icon green">
                      <svg class="cube-svg" viewBox="0 0 24 24">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </span>
                    <div class="inst-info">
                      <span class="inst-name">VM-GM3-04</span>
                      <span class="inst-ip">192.168.30.14</span>
                    </div>
                  </div>
                  <div class="inst-status-line">
                    <span class="status-dot green"></span> Running
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        <!-- 2. Instances in GM3 (4) Table Card -->
        <div class="panel-card instances-table-card">
          <div class="panel-card-header table-header-flex">
            <div class="header-left-title">
              <BarsOutlined class="table-header-icon" />
              <h3 class="panel-title">Instances in GM3 (4)</h3>
            </div>
            <div class="search-input-wrap">
              <a-input
                v-model:value="searchQuery"
                placeholder="Search instance..."
                class="inst-search-box"
                allow-clear
              >
                <template #prefix>
                  <SearchOutlined style="color: #94a3b8;" />
                </template>
              </a-input>
            </div>
          </div>

          <div class="table-container">
            <table class="styled-table">
              <thead>
                <tr>
                  <th style="width: 36px;">#</th>
                  <th>Instance Name</th>
                  <th>IP Address</th>
                  <th>Flavor (vCPU / RAM)</th>
                  <th>Host</th>
                  <th>Status</th>
                  <th>Uptime</th>
                  <th style="width: 70px; text-align: center;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="vm in filteredInstances"
                  :key="vm.id"
                  :class="{
                    'failed-row-bg': vm.status === 'Failed',
                    'selected-table-row': vm.name === selectedVmName
                  }"
                  @click="selectVm(vm.name)"
                  style="cursor: pointer;"
                >
                  <td class="col-idx">{{ vm.id }}</td>
                  <td class="col-name">
                    <span :class="vm.status === 'Failed' ? 'name-failed' : 'name-normal'">{{ vm.name }}</span>
                  </td>
                  <td class="col-ip">{{ vm.ip }}</td>
                  <td class="col-flavor">{{ vm.flavor }}</td>
                  <td class="col-host">{{ vm.host }}</td>
                  <td class="col-status">
                    <span class="status-dot-cell" :class="vm.status === 'Running' ? 'dot-green' : 'dot-red'"></span>
                    <span :class="vm.status === 'Running' ? 'txt-green' : 'txt-red'">{{ vm.status }}</span>
                  </td>
                  <td class="col-uptime">{{ vm.uptime }}</td>
                  <td class="col-actions">
                    <a-dropdown :trigger="['click']">
                      <button class="btn-ellipsis" @click.stop>•••</button>
                      <template #overlay>
                        <a-menu>
                          <a-menu-item @click="handleAction('details', vm)">View Console</a-menu-item>
                          <a-menu-item @click="handleAction('restart', vm)">Restart Instance</a-menu-item>
                          <a-menu-item danger @click="handleAction('migrate', vm)">Migrate Host</a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 3. Bottom Row: Resource Usage & Network Traffic Dual Cards -->
        <div class="dual-bottom-row">
          <!-- Left: GM3 Resource Usage (Live) -->
          <div class="panel-card resource-usage-card">
            <div class="panel-card-header">
              <div class="title-with-icon">
                <SettingOutlined class="title-gear-icon" />
                <h3 class="panel-title">GM3 Resource Usage (Live)</h3>
              </div>
            </div>
            <div class="resource-bars-list">
              <!-- CPU -->
              <div class="res-bar-row">
                <div class="res-bar-label-group">
                  <svg class="res-icon cpu-icon" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
                    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
                  </svg>
                  <span class="res-name">CPU</span>
                </div>
                <div class="res-progress-wrap">
                  <div class="res-progress-track">
                    <div class="res-progress-bar blue-bar" :style="{ width: usageStats.cpu + '%' }"></div>
                  </div>
                </div>
                <span class="res-percent">{{ usageStats.cpu }}%</span>
              </div>

              <!-- Memory -->
              <div class="res-bar-row">
                <div class="res-bar-label-group">
                  <svg class="res-icon mem-icon" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <line x1="6" y1="10" x2="6" y2="14" /><line x1="10" y1="10" x2="10" y2="14" />
                    <line x1="14" y1="10" x2="14" y2="14" /><line x1="18" y1="10" x2="18" y2="14" />
                  </svg>
                  <span class="res-name">Memory</span>
                </div>
                <div class="res-progress-wrap">
                  <div class="res-progress-track">
                    <div class="res-progress-bar green-bar" :style="{ width: usageStats.mem + '%' }"></div>
                  </div>
                </div>
                <span class="res-percent">{{ usageStats.mem }}%</span>
              </div>

              <!-- Disk -->
              <div class="res-bar-row">
                <div class="res-bar-label-group">
                  <svg class="res-icon disk-icon" viewBox="0 0 24 24">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                  <span class="res-name">Disk</span>
                </div>
                <div class="res-progress-wrap">
                  <div class="res-progress-track">
                    <div class="res-progress-bar purple-bar" :style="{ width: usageStats.disk + '%' }"></div>
                  </div>
                </div>
                <span class="res-percent">{{ usageStats.disk }}%</span>
              </div>
            </div>
          </div>

          <!-- Right: Network Traffic (GM3) -->
          <div class="panel-card network-traffic-card">
            <div class="panel-card-header">
              <div class="title-with-icon">
                <svg class="traffic-title-svg" viewBox="0 0 24 24">
                  <polyline points="17 11 12 6 7 11" />
                  <polyline points="17 18 12 13 7 18" />
                </svg>
                <h3 class="panel-title">Network Traffic (GM3)</h3>
              </div>
            </div>

            <!-- Spline Area SVG Chart -->
            <div class="traffic-chart-container">
              <div class="chart-y-axis">
                <span>800 Mbps</span>
                <span>600 Mbps</span>
                <span>400 Mbps</span>
                <span>200 Mbps</span>
                <span>0</span>
              </div>
              <div class="chart-body-svg-wrap">
                <svg class="traffic-svg" viewBox="0 0 320 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dl-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4" />
                      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.02" />
                    </linearGradient>
                    <linearGradient id="ul-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35" />
                      <stop offset="100%" stop-color="#22c55e" stop-opacity="0.02" />
                    </linearGradient>
                  </defs>

                  <!-- Grid horizontal lines -->
                  <line x1="0" y1="20" x2="320" y2="20" stroke="#f1f5f9" stroke-width="1" />
                  <line x1="0" y1="50" x2="320" y2="50" stroke="#f1f5f9" stroke-width="1" />
                  <line x1="0" y1="80" x2="320" y2="80" stroke="#f1f5f9" stroke-width="1" />
                  <line x1="0" y1="110" x2="320" y2="110" stroke="#f1f5f9" stroke-width="1" />

                  <!-- Download Area & Line (Blue) -->
                  <path
                    d="M 0 65 Q 40 45 80 55 T 160 30 T 240 45 T 320 32 L 320 110 L 0 110 Z"
                    fill="url(#dl-gradient)"
                  />
                  <path
                    d="M 0 65 Q 40 45 80 55 T 160 30 T 240 45 T 320 32"
                    fill="none"
                    stroke="#2563eb"
                    stroke-width="2"
                  />

                  <!-- Upload Area & Line (Green) -->
                  <path
                    d="M 0 85 Q 40 75 80 80 T 160 65 T 240 75 T 320 68 L 320 110 L 0 110 Z"
                    fill="url(#ul-gradient)"
                  />
                  <path
                    d="M 0 85 Q 40 75 80 80 T 160 65 T 240 75 T 320 68"
                    fill="none"
                    stroke="#16a34a"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>

            <!-- Timestamps X Axis & Legend -->
            <div class="chart-x-axis">
              <span>09:15</span>
              <span>09:25</span>
              <span>09:35</span>
              <span>09:45</span>
              <span>09:55</span>
              <span>10:05</span>
              <span>10:15</span>
            </div>

            <div class="chart-legend-row">
              <span class="legend-chip"><span class="dot-chip blue"></span> Download</span>
              <span class="legend-chip"><span class="dot-chip green"></span> Upload</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (~32%) -->
      <div class="grid-right-col">
        <!-- 1. Instance Overview / Failure Detected Box -->
        <div
          class="right-alert-box"
          :class="currentVm.status === 'Failed' ? 'failure-detected-box' : 'healthy-detected-box'"
        >
          <div class="failure-box-header">
            <div class="failure-title-left">
              <span v-if="currentVm.status === 'Failed'" class="failure-warn-triangle">⚠</span>
              <CheckCircleFilled v-else class="healthy-check-icon" />
              <h3 class="failure-title" :class="{ 'green-title': currentVm.status === 'Running' }">
                {{ currentVm.status === 'Failed' ? 'Instance Failure Detected' : 'Instance Overview (Healthy)' }}
              </h3>
            </div>
            <!-- Server Icon Graphic on Right -->
            <div class="failure-server-icon">
              <!-- Red server graphic if failed -->
              <svg v-if="currentVm.status === 'Failed'" class="server-fail-svg" viewBox="0 0 40 32">
                <rect x="2" y="2" width="36" height="12" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.8" />
                <line x1="8" y1="8" x2="16" y2="8" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
                <circle cx="32" cy="8" r="1.5" fill="#ef4444" />

                <rect x="2" y="16" width="36" height="12" rx="3" fill="#fee2e2" stroke="#ef4444" stroke-width="1.8" />
                <line x1="8" y1="22" x2="16" y2="22" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
                <circle cx="32" cy="22" r="1.5" fill="#ef4444" />

                <!-- Red cross circle badge -->
                <circle cx="33" cy="24" r="6" fill="#ef4444" />
                <line x1="31" y1="22" x2="35" y2="26" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />
                <line x1="35" y1="22" x2="31" y2="26" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <!-- Green server graphic if healthy -->
              <svg v-else class="server-fail-svg" viewBox="0 0 40 32">
                <rect x="2" y="2" width="36" height="12" rx="3" fill="#dcfce7" stroke="#22c55e" stroke-width="1.8" />
                <line x1="8" y1="8" x2="16" y2="8" stroke="#15803d" stroke-width="2" stroke-linecap="round" />
                <circle cx="32" cy="8" r="1.5" fill="#22c55e" />

                <rect x="2" y="16" width="36" height="12" rx="3" fill="#dcfce7" stroke="#22c55e" stroke-width="1.8" />
                <line x1="8" y1="22" x2="16" y2="22" stroke="#15803d" stroke-width="2" stroke-linecap="round" />
                <circle cx="32" cy="22" r="1.5" fill="#22c55e" />

                <!-- Green check circle badge -->
                <circle cx="33" cy="24" r="6" fill="#22c55e" />
                <path d="M 30.5 24 L 32.5 26 L 35.5 22" stroke="#ffffff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <div class="failure-details-list">
            <div class="detail-row">
              <span class="detail-lbl">Instance:</span>
              <span class="detail-val bold-text">{{ currentVm.name }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-lbl">IP Address:</span>
              <span class="detail-val">{{ currentVm.ip }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-lbl">{{ currentVm.status === 'Failed' ? 'Detected At:' : 'Uptime SLA:' }}</span>
              <span class="detail-val">{{ currentVm.status === 'Failed' ? 'Nov 7, 2026 10:12:08' : currentVm.uptime }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-lbl">Status:</span>
              <span
                class="detail-val"
                :class="currentVm.status === 'Failed' ? 'red-bold' : 'green-bold'"
              >
                {{ currentVm.status === 'Failed' ? 'Down (Not Reachable)' : 'Running (Healthy)' }}
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-lbl">Impact:</span>
              <span class="detail-val">
                {{ currentVm.status === 'Failed' ? 'Service interruption on GM3 network' : 'Normal operation on GM3 network' }}
              </span>
            </div>
          </div>
        </div>

        <!-- 2. Suggested Actions Box -->
        <div class="right-box suggested-actions-box">
          <div class="box-header-row">
            <ToolOutlined class="blue-icon" />
            <h3 class="box-title">Suggested Actions</h3>
          </div>

          <ul class="suggested-bullets-list" v-if="currentVm.status === 'Failed'">
            <li>Check VM status and power state.</li>
            <li>Verify host resource (CPU/Memory/Storage).</li>
            <li>Review instance logs / console.</li>
            <li>Restart the instance or migrate to another host.</li>
          </ul>
          <ul class="suggested-bullets-list" v-else>
            <li>Check VM status and host health.</li>
            <li>Verify host resource allocation on {{ currentVm.host }}.</li>
            <li>Review active instance logs / console terminal.</li>
            <li>Monitor performance metrics on GM3 network.</li>
          </ul>

          <div class="suggested-buttons-row">
            <button class="btn-action-green" @click="handleRestartInstance">
              <CaretRightOutlined /> {{ currentVm.status === 'Failed' ? 'Restart Instance' : 'Open Console' }}
            </button>
            <button class="btn-action-blue" @click="handleMigrateInstance">
              <SwapOutlined /> Migrate
            </button>
            <a-dropdown :trigger="['click']">
              <button class="btn-action-more">
                Actions <DownOutlined class="icon-down" />
              </button>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="handleActionMenu('poweron')">Force Power On</a-menu-item>
                  <a-menu-item @click="handleActionMenu('hardreboot')">Hard Reboot</a-menu-item>
                  <a-menu-item @click="handleActionMenu('resetnic')">Reset Virtual NIC</a-menu-item>
                  <a-menu-item danger @click="handleActionMenu('isolate')">Isolate from GM3 Network</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>

        <!-- 3. Recent Events (GM3) Box -->
        <div class="right-box recent-events-box">
          <div class="box-header-row space-between">
            <div class="header-title-left">
              <ClockCircleOutlined class="blue-icon" />
              <h3 class="box-title">Recent Events ({{ currentVm.name }})</h3>
            </div>
            <a class="view-all-link" @click="handleViewAllEvents">View All</a>
          </div>

          <div class="events-items-list">
            <div
              v-for="(evt, idx) in currentVmEvents"
              :key="idx"
              class="event-item-row"
            >
              <div class="event-icon-col" :class="evt.type">
                <CloseCircleFilled v-if="evt.type === 'red'" />
                <ExclamationCircleFilled v-else-if="evt.type === 'amber'" />
                <InfoCircleFilled v-else-if="evt.type === 'blue'" />
                <CheckCircleFilled v-else />
              </div>
              <div class="event-text-col">
                <span class="event-msg">{{ evt.msg }}</span>
              </div>
              <span class="event-time">{{ evt.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  HomeOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
  AppstoreOutlined,
  BarsOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SettingOutlined,
  DesktopOutlined,
  SearchOutlined,
  ToolOutlined,
  CaretRightOutlined,
  SwapOutlined,
  DownOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  CheckCircleFilled
} from '@ant-design/icons-vue'
import message from 'ant-design-vue/es/message'

export default {
  name: 'IncidentDetails',
  components: {
    HomeOutlined,
    ReloadOutlined,
    ArrowLeftOutlined,
    AppstoreOutlined,
    BarsOutlined,
    LineChartOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    SettingOutlined,
    DesktopOutlined,
    SearchOutlined,
    ToolOutlined,
    CaretRightOutlined,
    SwapOutlined,
    DownOutlined,
    ClockCircleOutlined,
    CloseCircleFilled,
    ExclamationCircleFilled,
    InfoCircleFilled,
    CheckCircleFilled
  },
  data () {
    return {
      refreshing: false,
      lastUpdatedTime: 'Nov 7, 2026 10:15:24',
      activeTab: 'overview',
      selectedVmName: this.$route.query.vm || 'VM-GM3-01',
      searchQuery: '',
      instancesList: [
        {
          id: 1,
          name: 'VM-GM3-01',
          ip: '192.168.30.11',
          flavor: '2 vCPU / 4 GB',
          host: 'Compute-01',
          status: 'Running',
          uptime: '10d 04h 12m'
        },
        {
          id: 2,
          name: 'VM-GM3-02',
          ip: '192.168.30.12',
          flavor: '4 vCPU / 8 GB',
          host: 'Compute-01',
          status: 'Running',
          uptime: '10d 03h 59m'
        },
        {
          id: 3,
          name: 'VM-GM3-03',
          ip: '192.168.30.13',
          flavor: '4 vCPU / 8 GB',
          host: 'Compute-02',
          status: 'Failed',
          uptime: '-'
        },
        {
          id: 4,
          name: 'VM-GM3-04',
          ip: '192.168.30.14',
          flavor: '2 vCPU / 4 GB',
          host: 'Compute-02',
          status: 'Running',
          uptime: '9d 22h 41m'
        }
      ]
    }
  },
  watch: {
    '$route.query.vm' (newVal) {
      if (newVal) {
        this.selectedVmName = newVal
      }
    }
  },
  created () {
    if (this.$route.query.vm) {
      this.selectedVmName = this.$route.query.vm
    }
  },
  computed: {
    currentVm () {
      return (
        this.instancesList.find(vm => vm.name === this.selectedVmName) ||
        this.instancesList[0]
      )
    },
    filteredInstances () {
      if (!this.searchQuery) return this.instancesList
      const q = this.searchQuery.toLowerCase()
      return this.instancesList.filter(
        vm =>
          vm.name.toLowerCase().includes(q) ||
          vm.ip.toLowerCase().includes(q) ||
          vm.host.toLowerCase().includes(q)
      )
    },
    usageStats () {
      if (this.currentVm.name === 'VM-GM3-03') {
        return { cpu: 8, mem: 12, disk: 45 }
      } else if (this.currentVm.name === 'VM-GM3-01') {
        return { cpu: 42, mem: 61, disk: 55 }
      } else if (this.currentVm.name === 'VM-GM3-02') {
        return { cpu: 58, mem: 74, disk: 62 }
      } else {
        return { cpu: 31, mem: 48, disk: 40 }
      }
    },
    currentVmEvents () {
      if (this.currentVm.name === 'VM-GM3-03') {
        return [
          { type: 'red', msg: 'VM-GM3-03 is DOWN (No response)', time: '10:12:08' },
          { type: 'amber', msg: 'Ping lost to 192.168.30.13', time: '10:11:52' },
          { type: 'blue', msg: 'High packet loss (85%) on VM-GM3-03', time: '10:10:37' },
          { type: 'green', msg: 'All instances running normally', time: '09:55:01' }
        ]
      } else if (this.currentVm.name === 'VM-GM3-01') {
        return [
          { type: 'green', msg: 'VM-GM3-01 heartbeat normal (0% packet loss)', time: '10:15:20' },
          { type: 'blue', msg: 'Disk read/write normalized on Compute-01', time: '10:13:45' },
          { type: 'green', msg: 'VLAN 30 network port link confirmed UP', time: '10:11:10' },
          { type: 'green', msg: 'All instances running normally', time: '09:55:01' }
        ]
      } else if (this.currentVm.name === 'VM-GM3-02') {
        return [
          { type: 'green', msg: 'VM-GM3-02 heartbeat active (0.8ms latency)', time: '10:15:15' },
          { type: 'blue', msg: 'Memory allocated: 8 GB on Compute-01', time: '10:12:30' },
          { type: 'green', msg: 'Health check probe passed', time: '10:10:05' },
          { type: 'green', msg: 'All instances running normally', time: '09:55:01' }
        ]
      } else {
        return [
          { type: 'green', msg: 'VM-GM3-04 health check passed on eth0', time: '10:14:50' },
          { type: 'blue', msg: 'Compute-02 network bridge interface healthy', time: '10:10:00' },
          { type: 'green', msg: 'Instance network metrics within SLA', time: '10:05:22' },
          { type: 'green', msg: 'All instances running normally', time: '09:55:01' }
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push('/networkarchitecture')
    },
    selectVm (vmName) {
      this.selectedVmName = vmName
      this.$router.replace({ path: '/incident', query: { vm: vmName } }).catch(() => {})
      message.info(`Inspecting ${vmName}`)
    },
    refreshData () {
      this.refreshing = true
      setTimeout(() => {
        const now = new Date()
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
        const timeStr = now.toTimeString().split(' ')[0]
        this.lastUpdatedTime = `${dateStr} ${timeStr}`
        this.refreshing = false
        message.success(`Telemetry and ${this.currentVm.name} status refreshed`)
      }, 700)
    },
    handleRestartInstance () {
      if (this.currentVm.status === 'Failed') {
        message.loading(`Sending ACPI reset command to ${this.currentVm.name} on ${this.currentVm.host}...`, 2).then(() => {
          message.success('Reboot signal delivered. Verifying instance ping...')
        })
      } else {
        message.loading(`Opening web console for ${this.currentVm.name}...`, 1.5).then(() => {
          message.success(`Console session initialized on ${this.currentVm.ip}`)
        })
      }
    },
    handleMigrateInstance () {
      const targetHost = this.currentVm.host === 'Compute-01' ? 'Compute-02' : 'Compute-01'
      message.loading(`Planning live migration of ${this.currentVm.name} to ${targetHost}...`, 2).then(() => {
        message.info(`Target host ${targetHost} verified ready with available compute capacity`)
      })
    },
    handleActionMenu (action) {
      if (action === 'poweron') {
        message.loading(`Powering on ${this.currentVm.name}...`, 1.5).then(() => {
          message.success('Power signal sent')
        })
      } else if (action === 'hardreboot') {
        message.warning(`Triggered hard reboot on host ${this.currentVm.host}`)
      } else if (action === 'resetnic') {
        message.info(`Flushed virtual port VLAN 30 for ${this.currentVm.name} on ovs-br0`)
      } else if (action === 'isolate') {
        message.error(`${this.currentVm.name} isolated from GM3 broadcast domain`)
      }
    },
    handleViewAllEvents () {
      message.info(`Displaying full event log for ${this.currentVm.name}`)
    },
    handleAction (type, vm) {
      this.selectVm(vm.name)
      if (type === 'restart') {
        message.loading(`Restarting ${vm.name}...`, 1.5).then(() => {
          message.success(`Command sent to ${vm.host}`)
        })
      } else if (type === 'migrate') {
        message.info(`Initiating migration assistant for ${vm.name}`)
      } else {
        message.info(`Opening console connection to ${vm.name} (${vm.ip})`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.network-incident-page {
  padding: 18px 24px 40px;
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
  margin-bottom: 14px;

  .breadcrumb-item {
    color: #64748b;
    text-decoration: none;
    &:hover { color: #0f172a; }
    &.active { color: #1e293b; font-weight: 500; }
  }

  .breadcrumb-home-icon { font-size: 14px; color: #64748b; }
  .breadcrumb-sep { margin: 0 8px; color: #94a3b8; }
}

/* Page Header Row */
.page-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  .header-titles {
    display: flex;
    align-items: center;
    gap: 12px;

    .page-title {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
      margin: 0;
    }

    .incident-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 14px;
      font-size: 12px;
      font-weight: 600;

      &.failed-badge {
        background: #fee2e2;
        border: 1px solid #fca5a5;
        color: #dc2626;
        .badge-triangle { font-size: 12px; }
      }

      &.healthy-badge {
        background: #ecfdf5;
        border: 1px solid #a7f3d0;
        color: #15803d;
        .badge-dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
        }
      }
    }
  }

  .header-right-meta {
    display: flex;
    align-items: center;
    gap: 12px;

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      border-radius: 14px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #059669;
      font-size: 12px;
      font-weight: 600;

      .live-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #10b981;
      }
    }

    .last-update-text {
      font-size: 12px;
      color: #475569;
    }

    .btn-refresh {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #334155;
      transition: all 0.2s ease;

      &:hover {
        border-color: #94a3b8;
        color: #0f172a;
      }
    }
  }
}

/* Action Tabs Toolbar */
.action-tabs-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;

  .btn-back-nav {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #334155;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
      border-color: #94a3b8;
      color: #0f172a;
    }
  }

  .tabs-btn-group {
    display: flex;
    align-items: center;
    gap: 8px;

    .nav-tab-btn {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      font-size: 12.5px;
      font-weight: 500;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;

      .tab-icon { font-size: 13px; }

      &:hover {
        border-color: #94a3b8;
        color: #0f172a;
      }

      &.active {
        background: #1677ff;
        border-color: #1677ff;
        color: #ffffff;
      }
    }
  }
}

/* Summary Banner Card */
.summary-banner-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }

  .summary-banner-left {
    display: flex;
    align-items: center;
    gap: 14px;

    .network-display-icon {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      background: #f0f9ff;
      border: 1.5px solid #bae6fd;
      color: #0284c7;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }

    .network-meta-group {
      .network-name-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 4px;

        .network-name {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .degraded-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 1px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: #e11d48;

          .warning-triangle { font-size: 10.5px; }
        }
      }

      .network-sub-row {
        font-size: 12px;
        color: #64748b;
        display: flex;
        align-items: center;
        gap: 8px;

        .pipe { color: #cbd5e1; }
      }
    }
  }

  .summary-banner-quad {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 16px;
    gap: 24px;
    text-align: center;

    .quad-item {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .quad-label {
        font-size: 11px;
        color: #64748b;
        white-space: nowrap;
      }

      .quad-val {
        font-size: 17px;
        font-weight: 700;
        color: #0f172a;

        &.green-text { color: #16a34a; }
        &.red-text { color: #dc2626; }
      }
    }
  }
}

/* Main Content Grid */
.incident-main-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 18px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}

/* Reusable Panel Card */
.panel-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  margin-bottom: 18px;

  .panel-card-header {
    padding: 12px 18px;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .panel-title-group {
      .title-with-icon {
        display: flex;
        align-items: center;
        gap: 6px;

        .title-gear-icon {
          color: #0284c7;
          font-size: 14px;
        }

        .panel-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
      }

      .panel-subtitle {
        font-size: 11.5px;
        color: #64748b;
        margin: 2px 0 0;
      }
    }

    .topology-legend-row {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 11.5px;
      color: #475569;

      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          &.green { background: #22c55e; }
          &.red { background: #ef4444; }
          &.amber { background: #eab308; }
        }
      }
    }
  }
}

/* Topology Diagram Canvas */
.instance-topology-canvas {
  padding: 16px 14px 20px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  .instance-tree-svg {
    width: 100%;
    max-width: 760px;
    height: auto;
    display: block;
  }
}

/* ForeignObject Node Cards inside Topology */
.f-top-net-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f0f9ff;
  border: 1.5px solid #93c5fd;
  border-radius: 8px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  .net-icon-col {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .net-router-svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: #0284c7;
      stroke-width: 2;
    }
  }

  .net-text-col {
    display: flex;
    flex-direction: column;
    .net-title {
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
    }
    .net-sub {
      font-size: 10px;
      color: #64748b;
    }
  }
}

.f-inst-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  &.selected-active {
    outline: 2.5px solid #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
  }

  &.red-inst.selected-active {
    outline: 2.5px solid #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.25);
  }

  &.green-inst {
    background: #f0fdf4;
    border: 1.5px solid #86efac;
  }

  &.red-inst {
    background: #fff5f5;
    border: 1.5px solid #fca5a5;
  }

  .inst-top-row {
    display: flex;
    align-items: center;
    gap: 8px;

    .inst-cube-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .cube-svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      &.green .cube-svg { stroke: #16a34a; }
      &.red .cube-svg { stroke: #dc2626; }
    }

    .inst-info {
      display: flex;
      flex-direction: column;

      .inst-name {
        font-size: 12px;
        font-weight: 700;
        color: #0f172a;
        &.red-name { color: #0f172a; }
      }
      .inst-ip {
        font-size: 10.5px;
        color: #64748b;
      }
    }
  }

  .inst-status-line {
    font-size: 10.5px;
    font-weight: 600;
    color: #15803d;
    display: flex;
    align-items: center;
    gap: 4px;

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      &.green { background: #22c55e; }
    }

    &.failed-line {
      color: #dc2626;

      .cross-icon-sm {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ef4444;
        color: #ffffff;
        font-size: 8px;
        font-weight: 800;
      }
    }
  }
}

/* Instances Table Card */
.instances-table-card {
  .table-header-flex {
    .header-left-title {
      display: flex;
      align-items: center;
      gap: 6px;

      .table-header-icon {
        color: #0284c7;
        font-size: 14px;
      }
      .panel-title {
        font-size: 13.5px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
      }
    }

    .search-input-wrap {
      width: 200px;
      .inst-search-box {
        border-radius: 6px;
        font-size: 12px;
      }
    }
  }

  .table-container {
    overflow-x: auto;

    .styled-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;

      thead {
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;

        th {
          padding: 8px 12px;
          font-weight: 600;
          color: #475569;
          font-size: 11.5px;
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #f1f5f9;
          &:last-child { border-bottom: none; }

          &:hover { background: #f8fafc; }

          &.failed-row-bg {
            background: #fff5f5;
            &:hover { background: #fee2e2; }

            &.selected-table-row {
              background: #fee2e2 !important;
              box-shadow: inset 3px 0 0 #ef4444;
            }
          }

          &.selected-table-row {
            background: #f0f7ff !important;
            box-shadow: inset 3px 0 0 #2563eb;
            td {
              font-weight: 600;
            }
          }

          td {
            padding: 8px 12px;
            color: #1e293b;
          }

          .col-idx { color: #64748b; }

          .col-name {
            font-weight: 600;
            .name-normal { color: #0284c7; cursor: pointer; }
            .name-failed { color: #dc2626; cursor: pointer; }
          }

          .col-ip { color: #475569; }
          .col-flavor { color: #475569; }
          .col-host { color: #475569; }

          .col-status {
            display: flex;
            align-items: center;
            gap: 6px;

            .status-dot-cell {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              &.dot-green { background: #22c55e; }
              &.dot-red { background: #ef4444; }
            }

            .txt-green { color: #16a34a; font-weight: 600; }
            .txt-red { color: #dc2626; font-weight: 600; }
          }

          .col-uptime { color: #475569; }

          .col-actions {
            text-align: center;
            .btn-ellipsis {
              background: transparent;
              border: none;
              cursor: pointer;
              color: #94a3b8;
              font-size: 14px;
              line-height: 1;
              padding: 2px 6px;
              border-radius: 4px;
              &:hover {
                background: #e2e8f0;
                color: #0f172a;
              }
            }
          }
        }
      }
    }
  }
}

/* Dual Bottom Row */
.dual-bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

/* Resource Usage Card */
.resource-usage-card {
  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 6px;
    .title-gear-icon { color: #0284c7; font-size: 14px; }
    .panel-title { font-size: 13.5px; font-weight: 700; color: #0f172a; margin: 0; }
  }

  .resource-bars-list {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .res-bar-row {
      display: flex;
      align-items: center;
      gap: 12px;

      .res-bar-label-group {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 80px;

        .res-icon {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: #64748b;
          stroke-width: 2;
        }

        .res-name {
          font-size: 12px;
          font-weight: 600;
          color: #334155;
        }
      }

      .res-progress-wrap {
        flex: 1;
        .res-progress-track {
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;

          .res-progress-bar {
            height: 100%;
            border-radius: 4px;

            &.blue-bar { background: #3b82f6; }
            &.green-bar { background: #22c55e; }
            &.purple-bar { background: #8b5cf6; }
          }
        }
      }

      .res-percent {
        font-size: 13px;
        font-weight: 700;
        color: #0f172a;
        width: 38px;
        text-align: right;
      }
    }
  }
}

/* Network Traffic Card */
.network-traffic-card {
  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 6px;
    .traffic-title-svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: #0284c7;
      stroke-width: 2;
    }
    .panel-title { font-size: 13.5px; font-weight: 700; color: #0f172a; margin: 0; }
  }

  .traffic-chart-container {
    padding: 12px 14px 4px;
    display: flex;
    gap: 8px;

    .chart-y-axis {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 9.5px;
      color: #94a3b8;
      height: 90px;
      text-align: right;
      padding-top: 2px;
    }

    .chart-body-svg-wrap {
      flex: 1;
      height: 90px;

      .traffic-svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .chart-x-axis {
    display: flex;
    justify-content: space-between;
    padding: 0 14px 0 55px;
    font-size: 9.5px;
    color: #94a3b8;
  }

  .chart-legend-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 8px 0 12px;

    .legend-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: #475569;

      .dot-chip {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        &.blue { background: #3b82f6; }
        &.green { background: #22c55e; }
      }
    }
  }
}

/* Right Column Boxes */
.grid-right-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 1. Failure / Healthy Alert Box */
.right-alert-box {
  border-radius: 10px;
  padding: 16px 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  &.failure-detected-box {
    background: #fff8f8;
    border: 1.5px solid #fecdd3;
    .failure-warn-triangle { color: #ef4444; font-size: 16px; }
    .failure-title { color: #dc2626; font-size: 14.5px; font-weight: 700; margin: 0; }
  }

  &.healthy-detected-box {
    background: #f0fdf4;
    border: 1.5px solid #bbf7d0;
    .healthy-check-icon { color: #16a34a; font-size: 16px; }
    .failure-title { color: #15803d; font-size: 14.5px; font-weight: 700; margin: 0; }
  }

  .failure-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .failure-title-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .failure-server-icon {
      width: 44px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;

      .server-fail-svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .failure-details-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .detail-row {
      display: flex;
      align-items: baseline;
      font-size: 12px;

      .detail-lbl {
        width: 90px;
        color: #64748b;
        flex-shrink: 0;
      }

      .detail-val {
        color: #0f172a;

        &.bold-text {
          font-weight: 700;
        }

        &.red-bold {
          color: #dc2626;
          font-weight: 700;
        }

        &.green-bold {
          color: #16a34a;
          font-weight: 700;
        }
      }
    }
  }
}

/* Reusable Right Box */
.right-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  .box-header-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    &.space-between {
      justify-content: space-between;
    }

    .header-title-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .blue-icon {
      color: #0284c7;
      font-size: 14px;
    }

    .box-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    .view-all-link {
      font-size: 11.5px;
      color: #0284c7;
      font-weight: 600;
      cursor: pointer;
      &:hover { text-decoration: underline; }
    }
  }
}

/* Suggested Actions Box */
.suggested-actions-box {
  .suggested-bullets-list {
    margin: 0 0 16px;
    padding-left: 18px;
    font-size: 11.5px;
    color: #475569;
    line-height: 1.6;

    li {
      margin-bottom: 4px;
    }
  }

  .suggested-buttons-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;

    .btn-action-green {
      background: #22c55e;
      border: 1px solid #22c55e;
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;

      &:hover { background: #16a34a; border-color: #16a34a; }
    }

    .btn-action-blue {
      background: #1677ff;
      border: 1px solid #1677ff;
      color: #ffffff;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;

      &:hover { background: #0284c7; border-color: #0284c7; }
    }

    .btn-action-more {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      font-size: 12px;
      font-weight: 500;
      border-radius: 6px;
      padding: 6px 10px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;

      .icon-down { font-size: 9px; color: #64748b; }

      &:hover {
        border-color: #94a3b8;
        color: #0f172a;
      }
    }
  }
}

/* Recent Events Box */
.recent-events-box {
  .events-items-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .event-item-row {
      display: flex;
      align-items: center;
      gap: 10px;

      .event-icon-col {
        font-size: 14px;
        line-height: 1;
        flex-shrink: 0;

        &.red { color: #ef4444; }
        &.amber { color: #f59e0b; }
        &.blue { color: #0284c7; }
        &.green { color: #22c55e; }
      }

      .event-text-col {
        flex: 1;
        min-width: 0;

        .event-msg {
          font-size: 11.5px;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
      }

      .event-time {
        font-size: 10.5px;
        color: #94a3b8;
        white-space: nowrap;
      }
    }
  }
}
</style>
