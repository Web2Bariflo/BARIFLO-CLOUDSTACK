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
  <div class="network-architecture-page">
    <!-- Breadcrumb Bar -->
    <div class="breadcrumb-bar">
      <router-link to="/dashboard" class="breadcrumb-item">
        <HomeOutlined class="breadcrumb-home-icon" />
      </router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-item">Network</span>
      <span class="breadcrumb-sep">/</span>
      <router-link to="/ispnetwork" class="breadcrumb-item">ISP Networks</router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-item active">Network Architecture</span>
    </div>

    <!-- Page Header Row -->
    <div class="page-header-row">
      <div class="header-titles">
        <h1 class="page-title">Network Architecture &amp; Live Topology</h1>
        <p class="page-subtitle">End-to-end network representation with live status, traffic flow and device health</p>
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

    <!-- Top Row: ISP Status Cards -->
    <div class="isp-overview-grid">
      <!-- JIO NETWORK -->
      <div class="isp-status-card">
        <div class="isp-status-left">
          <div class="isp-round-logo jio-round">Jio</div>
          <div class="isp-title-group">
            <div class="isp-title-row">
              <span class="isp-name">JIO NETWORK</span>
              <span class="status-pill active">
                <span class="status-dot"></span> Active
              </span>
            </div>
            <div class="isp-ip-row">
              <span>203.0.113.10</span>
              <span class="pipe">|</span>
              <span>GW: 203.0.113.1</span>
            </div>
          </div>
        </div>
        <div class="isp-status-metrics">
          <div class="metric-item">
            <ArrowDownOutlined class="metric-arrow" />
            <span class="metric-val">950 Mbps</span>
          </div>
          <div class="metric-item">
            <ArrowUpOutlined class="metric-arrow" />
            <span class="metric-val">820 Mbps</span>
          </div>
          <div class="metric-item">
            <ClockCircleOutlined class="metric-clock" />
            <span class="metric-val">99.98%</span>
          </div>
        </div>
      </div>

      <!-- AIRTEL NETWORK -->
      <div class="isp-status-card">
        <div class="isp-status-left">
          <div class="isp-round-logo airtel-round">
            <img src="assets/airtel.png" alt="Airtel" class="airtel-img" />
          </div>
          <div class="isp-title-group">
            <div class="isp-title-row">
              <span class="isp-name">AIRTEL NETWORK</span>
              <span class="status-pill active">
                <span class="status-dot"></span> Active
              </span>
            </div>
            <div class="isp-ip-row">
              <span>198.51.100.20</span>
              <span class="pipe">|</span>
              <span>GW: 198.51.100.1</span>
            </div>
          </div>
        </div>
        <div class="isp-status-metrics">
          <div class="metric-item">
            <ArrowDownOutlined class="metric-arrow" />
            <span class="metric-val">900 Mbps</span>
          </div>
          <div class="metric-item">
            <ArrowUpOutlined class="metric-arrow" />
            <span class="metric-val">750 Mbps</span>
          </div>
          <div class="metric-item">
            <ClockCircleOutlined class="metric-clock" />
            <span class="metric-val">99.95%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Metric Stat Cards Row (6 Cards) -->
    <div class="stat-cards-row">
      <!-- 1. Networks -->
      <div class="stat-mini-card">
        <div class="stat-mini-icon-wrap blue-wrap">
          <svg class="mini-svg" viewBox="0 0 24 24">
            <rect x="2" y="2" width="6" height="6" rx="1"/>
            <rect x="16" y="2" width="6" height="6" rx="1"/>
            <rect x="9" y="16" width="6" height="6" rx="1"/>
            <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/>
            <line x1="12" y1="13" x2="12" y2="16"/>
          </svg>
        </div>
        <div class="stat-mini-content">
          <div class="stat-mini-label">Networks</div>
          <div class="stat-mini-val-row">
            <span class="stat-mini-number">4</span>
            <span class="sub-pill green-sub"><span class="arrow-up-sm">↑</span> 3 Active</span>
          </div>
        </div>
      </div>

      <!-- 2. Network Devices -->
      <div class="stat-mini-card">
        <div class="stat-mini-icon-wrap blue-wrap">
          <svg class="mini-svg" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="5" rx="1"/>
            <rect x="2" y="9" width="20" height="5" rx="1"/>
            <rect x="2" y="16" width="20" height="5" rx="1"/>
            <circle cx="6" cy="4.5" r="1"/>
            <circle cx="6" cy="11.5" r="1"/>
            <circle cx="6" cy="18.5" r="1"/>
          </svg>
        </div>
        <div class="stat-mini-content">
          <div class="stat-mini-label">Network Devices</div>
          <div class="stat-mini-val-row">
            <span class="stat-mini-number">12</span>
            <span class="sub-pill green-sub"><span class="arrow-up-sm">↑</span> 11 Up</span>
          </div>
        </div>
      </div>

      <!-- 3. Instances -->
      <div class="stat-mini-card">
        <div class="stat-mini-icon-wrap blue-wrap">
          <svg class="mini-svg" viewBox="0 0 24 24">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <div class="stat-mini-content">
          <div class="stat-mini-label">Instances</div>
          <div class="stat-mini-val-row">
            <span class="stat-mini-number">18</span>
            <span class="sub-pill green-sub"><span class="arrow-up-sm">↑</span> 17 Running</span>
          </div>
        </div>
      </div>

      <!-- 4. Total Bandwidth -->
      <div class="stat-mini-card">
        <div class="stat-mini-icon-wrap blue-wrap">
          <svg class="mini-svg" viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div class="stat-mini-content">
          <div class="stat-mini-label">Total Bandwidth</div>
          <div class="stat-mini-val-row">
            <span class="stat-mini-number">1.85 Gbps</span>
          </div>
        </div>
      </div>

      <!-- 5. Uptime -->
      <div class="stat-mini-card">
        <div class="stat-mini-icon-wrap blue-wrap">
          <svg class="mini-svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="stat-mini-content">
          <div class="stat-mini-label">Uptime</div>
          <div class="stat-mini-val-row">
            <span class="stat-mini-number">99.96%</span>
          </div>
        </div>
      </div>

      <!-- 6. Alerts -->
      <div class="stat-mini-card alert-card-style">
        <div class="stat-mini-icon-wrap red-wrap">
          <svg class="mini-svg red-svg" viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div class="stat-mini-content">
          <div class="stat-mini-label">Alerts</div>
          <div class="stat-mini-val-row">
            <span class="stat-mini-number alert-highlight">3 (1 Critical)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Middle Section: Topology on Left, Sidebar on Right -->
    <div class="middle-layout-row">
      <!-- Topology Canvas Panel -->
      <div class="topology-panel-card">
        <!-- Topology View Filter Toolbar -->
        <div class="topology-toolbar">
          <div class="toolbar-btn-group">
            <button
              class="toolbar-tab-btn"
              :class="{ active: activeViewTab === 'topology' }"
              @click="activeViewTab = 'topology'"
            >
              <PartitionOutlined class="btn-icon" /> Topology
            </button>
            <button
              class="toolbar-tab-btn"
              :class="{ active: activeViewTab === 'logical' }"
              @click="activeViewTab = 'logical'"
            >
              Logical View
            </button>
            <button
              class="toolbar-tab-btn"
              :class="{ active: activeViewTab === 'physical' }"
              @click="activeViewTab = 'physical'"
            >
              Physical View
            </button>
            <button
              class="toolbar-tab-btn"
              :class="{ active: activeViewTab === 'traffic' }"
              @click="activeViewTab = 'traffic'"
            >
              <LineChartOutlined class="btn-icon" /> Traffic Flow
            </button>
          </div>
          <button class="toolbar-filter-btn">
            <FilterOutlined /> Filters <DownOutlined class="down-arrow-sm" />
          </button>
        </div>

        <!-- Diagram Canvas -->
        <div class="topology-canvas-wrap">
          <svg class="topology-workflow-svg" viewBox="0 0 940 375" preserveAspectRatio="xMidYMid meet">
            <!-- Markers for green & red arrowheads -->
            <defs>
              <marker
                id="green-arrow"
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
                id="red-arrow"
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

            <!-- 1. Connecting Lines Layer (rendered behind cards) -->
            <g class="topology-lines-group">
              <!-- Jio Cloud (center ~ 185, bottom 68) to Edge Router (top 92, entry ~ 340) -->
              <path d="M 185 68 C 185 92, 335 78, 345 90" stroke="#22c55e" stroke-width="2.5" fill="none" marker-end="url(#green-arrow)" />

              <!-- Airtel Cloud (center ~ 615, bottom 68) to Edge Router (top 92, entry ~ 430) -->
              <path d="M 615 68 C 615 92, 435 78, 425 90" stroke="#22c55e" stroke-width="2.5" fill="none" marker-end="url(#green-arrow)" />

              <!-- Edge Router (bottom 138) to Firewall (top 154) -->
              <line x1="385" y1="138" x2="385" y2="152" stroke="#22c55e" stroke-width="2.5" marker-end="url(#green-arrow)" />

              <!-- Firewall (bottom 200) to Core Switch (top 216) -->
              <line x1="385" y1="200" x2="385" y2="214" stroke="#22c55e" stroke-width="2.5" marker-end="url(#green-arrow)" />

              <!-- Core Switch (right 495, center Y 239) to Access Switch (left 625, center Y 239) -->
              <line x1="495" y1="239" x2="623" y2="239" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#red-arrow)" />

              <!-- Core Switch bottom (385, 262) down to distribution bus at y=284 -->
              <line x1="385" y1="262" x2="385" y2="284" stroke="#22c55e" stroke-width="2.5" />
              <!-- Horizontal Distribution Bus -->
              <line x1="115" y1="284" x2="555" y2="284" stroke="#22c55e" stroke-width="2.5" />

              <!-- Drop into GM1 (115, 304) -->
              <line x1="115" y1="284" x2="115" y2="302" stroke="#22c55e" stroke-width="2.5" marker-end="url(#green-arrow)" />

              <!-- Drop into GM2 (335, 304) -->
              <line x1="335" y1="284" x2="335" y2="302" stroke="#22c55e" stroke-width="2.5" marker-end="url(#green-arrow)" />

              <!-- Drop into GM3 (555, 304) -->
              <line x1="555" y1="284" x2="555" y2="302" stroke="#22c55e" stroke-width="2.5" marker-end="url(#green-arrow)" />

              <!-- Drop from Access Switch bottom (725, 262) straight down into GM4 (725, 304) -->
              <line x1="725" y1="262" x2="725" y2="302" stroke="#22c55e" stroke-width="2.5" marker-end="url(#green-arrow)" />
            </g>

            <!-- 2. Nodes Layer via foreignObject -->
            <!-- Jio Cloud -->
            <foreignObject x="65" y="8" width="240" height="60">
              <div class="f-cloud-card jio-f-cloud">
                <div class="cloud-left-logo jio-mini-logo">Jio</div>
                <div class="cloud-info">
                  <div class="cloud-title-row">
                    <span class="cloud-name">JIO NETWORK</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="cloud-ip">203.0.113.0/24</div>
                  <div class="cloud-speed-row">
                    <span>↓ 950 Mbps</span>
                    <span>↑ 820 Mbps</span>
                  </div>
                </div>
              </div>
            </foreignObject>

            <!-- Airtel Cloud -->
            <foreignObject x="495" y="8" width="240" height="60">
              <div class="f-cloud-card airtel-f-cloud">
                <div class="cloud-left-logo airtel-mini-logo">
                  <img src="assets/airtel.png" alt="Airtel" />
                </div>
                <div class="cloud-info">
                  <div class="cloud-title-row">
                    <span class="cloud-name">AIRTEL NETWORK</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="cloud-ip">198.51.100.0/24</div>
                  <div class="cloud-speed-row">
                    <span>↓ 900 Mbps</span>
                    <span>↑ 750 Mbps</span>
                  </div>
                </div>
              </div>
            </foreignObject>

            <!-- Edge Router (HA) -->
            <foreignObject x="275" y="92" width="220" height="46">
              <div class="f-node-card router-card">
                <div class="node-icon-col blue-icon">
                  <svg class="node-svg" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="10" rx="2" />
                    <line x1="6" y1="12" x2="10" y2="12" />
                    <polyline points="8 10 10 12 8 14" />
                    <line x1="18" y1="12" x2="14" y2="12" />
                    <polyline points="16 10 14 12 16 14" />
                    <line x1="6" y1="4" x2="6" y2="7" />
                    <line x1="18" y1="4" x2="18" y2="7" />
                  </svg>
                </div>
                <div class="node-text-col">
                  <div class="node-title-row">
                    <span class="node-title">Edge Router (HA)</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="node-sub">203.0.113.1 / 198.51.100.1</div>
                </div>
              </div>
            </foreignObject>

            <!-- Next-Gen Firewall (HA) -->
            <foreignObject x="265" y="154" width="240" height="46">
              <div class="f-node-card firewall-card">
                <div class="node-icon-col red-icon">
                  <svg class="node-svg" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="2" y1="9" x2="22" y2="9" />
                    <line x1="2" y1="14" x2="22" y2="14" />
                    <line x1="8" y1="4" x2="8" y2="9" />
                    <line x1="16" y1="4" x2="16" y2="9" />
                    <line x1="12" y1="9" x2="12" y2="14" />
                    <line x1="7" y1="14" x2="7" y2="20" />
                    <line x1="17" y1="14" x2="17" y2="20" />
                  </svg>
                </div>
                <div class="node-text-col">
                  <div class="node-title-row">
                    <span class="node-title">Next-Gen Firewall (HA)</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="node-sub">Policy | NAT | VPN | IDS/IPS</div>
                </div>
              </div>
            </foreignObject>

            <!-- Core Switch (L3) -->
            <foreignObject x="275" y="216" width="220" height="46">
              <div class="f-node-card switch-card core-switch">
                <div class="node-icon-col blue-icon">
                  <svg class="node-svg" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <line x1="5" y1="10" x2="9" y2="10" />
                    <line x1="15" y1="10" x2="19" y2="10" />
                    <line x1="5" y1="14" x2="9" y2="14" />
                    <line x1="15" y1="14" x2="19" y2="14" />
                    <circle cx="12" cy="12" r="1.5" />
                  </svg>
                </div>
                <div class="node-text-col">
                  <div class="node-title-row">
                    <span class="node-title">Core Switch (L3)</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="node-sub">192.168.10.1</div>
                </div>
              </div>
            </foreignObject>

            <!-- Access Switch - GM3 -->
            <foreignObject x="625" y="216" width="200" height="46">
              <div class="f-node-card switch-card access-switch-card">
                <div class="node-icon-col red-icon">
                  <svg class="node-svg" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <line x1="5" y1="10" x2="9" y2="10" />
                    <line x1="15" y1="10" x2="19" y2="10" />
                    <line x1="5" y1="14" x2="9" y2="14" />
                    <line x1="15" y1="14" x2="19" y2="14" />
                    <circle cx="12" cy="12" r="1.5" />
                  </svg>
                </div>
                <div class="node-text-col">
                  <div class="node-title-row">
                    <span class="node-title">Access Switch - GM3</span>
                    <span class="cross-icon-circle red-cross">✕</span>
                  </div>
                  <div class="node-sub">192.168.30.1</div>
                </div>
              </div>
            </foreignObject>

            <!-- Subnets Bottom Row -->
            <!-- GM1 - LAN -->
            <foreignObject x="20" y="304" width="190" height="58">
              <div class="f-subnet-box gm1-box">
                <div class="subnet-icon-wrap green-icon">
                  <DesktopOutlined />
                </div>
                <div class="subnet-info">
                  <div class="subnet-title-row">
                    <span class="subnet-title">GM1 - LAN</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="subnet-cidr">192.168.10.0/24</div>
                  <div class="subnet-devices">3 Devices</div>
                </div>
              </div>
            </foreignObject>

            <!-- GM2 - LAN -->
            <foreignObject x="240" y="304" width="190" height="58">
              <div class="f-subnet-box gm2-box">
                <div class="subnet-icon-wrap green-icon">
                  <DesktopOutlined />
                </div>
                <div class="subnet-info">
                  <div class="subnet-title-row">
                    <span class="subnet-title">GM2 - LAN</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="subnet-cidr">192.168.20.0/24</div>
                  <div class="subnet-devices">4 Devices</div>
                </div>
              </div>
            </foreignObject>

            <!-- GM3 - VLAN (Incident / Selected) -->
            <foreignObject x="460" y="304" width="190" height="58">
              <div class="f-subnet-box gm3-box incident-active" @click="goToIncident" style="cursor: pointer;">
                <div class="subnet-icon-wrap red-icon">
                  <DesktopOutlined />
                </div>
                <div class="subnet-info">
                  <div class="subnet-title-row">
                    <span class="subnet-title">GM3 - VLAN</span>
                    <span class="cross-icon-circle red-cross">✕</span>
                  </div>
                  <div class="subnet-cidr">192.168.30.0/24</div>
                  <div class="subnet-warning">
                    <span class="warning-triangle">⚠</span> 1 Down / 3 Up
                  </div>
                </div>
              </div>
            </foreignObject>

            <!-- GM4 - LAN -->
            <foreignObject x="630" y="304" width="190" height="58">
              <div class="f-subnet-box gm4-box">
                <div class="subnet-icon-wrap green-icon">
                  <DesktopOutlined />
                </div>
                <div class="subnet-info">
                  <div class="subnet-title-row">
                    <span class="subnet-title">GM4 - LAN</span>
                    <span class="check-icon-circle green-check">✔</span>
                  </div>
                  <div class="subnet-cidr">192.168.40.0/24</div>
                  <div class="subnet-devices">6 Devices</div>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>

      <!-- Right Column: Sidebar Panels -->
      <div class="sidebar-panels-col">
        <!-- 1. Network Health Summary -->
        <div class="sidebar-box health-summary-box">
          <div class="sidebar-box-header">
            <AppstoreOutlined class="box-header-icon blue" />
            <h3 class="box-header-title">Network Health Summary</h3>
          </div>
          <div class="health-donut-section">
            <!-- Donut Chart SVG -->
            <div class="donut-chart-wrap">
              <svg class="donut-svg" viewBox="0 0 100 100">
                <!-- Background track -->
                <circle cx="50" cy="50" r="38" stroke="#f1f5f9" stroke-width="12" fill="none" />
                <!-- Green arc: 94.4% of circumference (2 * PI * 38 ≈ 238.76) => 225.4 -->
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#22c55e"
                  stroke-width="12"
                  stroke-dasharray="225.4 238.76"
                  stroke-dashoffset="0"
                  fill="none"
                  transform="rotate(-90 50 50)"
                />
                <!-- Red arc: 5.6% of circumference => 13.36 -->
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#ef4444"
                  stroke-width="12"
                  stroke-dasharray="13.36 238.76"
                  stroke-dashoffset="-225.4"
                  fill="none"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div class="donut-center-text">
                <span class="big-num">18</span>
                <span class="lbl-small">Devices</span>
              </div>
            </div>

            <!-- Health Breakdown Legend -->
            <div class="health-legend-list">
              <div class="legend-row">
                <div class="legend-left">
                  <span class="legend-dot green"></span>
                  <span class="legend-name">Up</span>
                </div>
                <span class="legend-val">17 (94.4%)</span>
              </div>
              <div class="legend-row">
                <div class="legend-left">
                  <span class="legend-dot red"></span>
                  <span class="legend-name">Down</span>
                </div>
                <span class="legend-val">1 (5.6%)</span>
              </div>
              <div class="legend-row">
                <div class="legend-left">
                  <span class="legend-dot yellow"></span>
                  <span class="legend-name">Maintenance</span>
                </div>
                <span class="legend-val">0 (0%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Active Alerts (3) -->
        <div class="sidebar-box active-alerts-box">
          <div class="sidebar-box-header alerts-header">
            <div class="alerts-title-left">
              <svg class="alert-header-svg" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <h3 class="box-header-title">Active Alerts (3)</h3>
            </div>
            <a class="view-all-link" @click="handleViewAllAlerts">View All</a>
          </div>

          <div class="alerts-items-list">
            <!-- Alert 1: Critical -->
            <div class="alert-item-row" @click="goToIncident" style="cursor: pointer;">
              <div class="alert-icon-wrap red-alert-icon">
                <CloseCircleFilled />
              </div>
              <div class="alert-body">
                <div class="alert-msg">VM-GM3-03 is DOWN (No response)</div>
                <div class="alert-net">Network GM3 (192.168.30.0/24)</div>
              </div>
              <div class="alert-time">10:12:08</div>
            </div>

            <!-- Alert 2: Warning -->
            <div class="alert-item-row">
              <div class="alert-icon-wrap yellow-alert-icon">
                <ExclamationCircleFilled />
              </div>
              <div class="alert-body">
                <div class="alert-msg">GM3 network under Maintenance</div>
                <div class="alert-net">Access Switch - GM3 degraded</div>
              </div>
              <div class="alert-time">10:13:15</div>
            </div>

            <!-- Alert 3: Info -->
            <div class="alert-item-row">
              <div class="alert-icon-wrap blue-alert-icon">
                <InfoCircleFilled />
              </div>
              <div class="alert-body">
                <div class="alert-msg">High packet loss (85%) on VM-GM3-03</div>
              </div>
              <div class="alert-time">10:10:37</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: GM3 - Network Details (Incident) -->
    <div class="incident-details-card">
      <div class="incident-header-bar">
        <div class="incident-title-row">
          <h2 class="incident-title">GM3 — Network Details (Incident)</h2>
          <span class="incident-badge">
            <span class="badge-triangle">⚠</span> Incident Detected
          </span>
        </div>
        <div class="incident-sub-row">
          <span>VLAN ID: 30</span>
          <span class="pipe">|</span>
          <span>Subnet: 192.168.30.0/24</span>
          <span class="pipe">|</span>
          <span>Gateway: 192.168.30.1</span>
        </div>
      </div>

      <div class="incident-body-split">
        <!-- Left Stats Quad Box -->
        <div class="incident-stats-quad">
          <div class="quad-col">
            <span class="quad-label">Total Instances</span>
            <span class="quad-number">4</span>
          </div>
          <div class="quad-col">
            <span class="quad-label">Running</span>
            <span class="quad-number green-text">3</span>
          </div>
          <div class="quad-col">
            <span class="quad-label">Failed</span>
            <span class="quad-number red-text">1</span>
          </div>
          <div class="quad-col">
            <span class="quad-label">Uptime</span>
            <span class="quad-number">99.25%</span>
          </div>
        </div>

        <!-- Right Side: Tabs + Instances Table -->
        <div class="incident-table-side">
          <div class="incident-tabs-row">
            <button
              class="inc-tab-btn"
              :class="{ active: activeBottomTab === 'instances' }"
              @click="activeBottomTab = 'instances'"
            >
              <BarsOutlined class="btn-icon" /> Instances (4)
            </button>
            <button
              class="inc-tab-btn"
              :class="{ active: activeBottomTab === 'traffic' }"
              @click="activeBottomTab = 'traffic'"
            >
              <LineChartOutlined class="btn-icon" /> Traffic Flow
            </button>
            <button
              class="inc-tab-btn"
              :class="{ active: activeBottomTab === 'performance' }"
              @click="activeBottomTab = 'performance'"
            >
              <DashboardOutlined class="btn-icon" /> Performance
            </button>
          </div>

          <!-- Table Content -->
          <div class="instances-table-wrap">
            <table class="styled-instances-table">
              <thead>
                <tr>
                  <th style="width: 40px;">#</th>
                  <th>Instance Name</th>
                  <th>IP Address</th>
                  <th>Flavor (vCPU / RAM)</th>
                  <th>Host</th>
                  <th>Status</th>
                  <th style="width: 70px; text-align: center;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="vm in instancesList"
                  :key="vm.id"
                  :class="{ 'failed-row-highlight': vm.status === 'Failed' }"
                  @click="goToInstance(vm)"
                  style="cursor: pointer;"
                >
                  <td class="col-idx">{{ vm.id }}</td>
                  <td class="col-name">
                    <a class="vm-link" @click.stop="goToInstance(vm)">{{ vm.name }}</a>
                  </td>
                  <td class="col-ip">{{ vm.ip }}</td>
                  <td class="col-flavor">{{ vm.flavor }}</td>
                  <td class="col-host">{{ vm.host }}</td>
                  <td class="col-status">
                    <span class="status-dot-cell" :class="vm.status === 'Running' ? 'dot-running' : 'dot-failed'"></span>
                    <span :class="vm.status === 'Running' ? 'text-running' : 'text-failed'">{{ vm.status }}</span>
                  </td>
                  <td class="col-actions">
                    <a-dropdown :trigger="['click']">
                      <button class="btn-ellipsis" @click.stop>•••</button>
                      <template #overlay>
                        <a-menu>
                          <a-menu-item @click="viewVmDetails(vm)">View Details</a-menu-item>
                          <a-menu-item @click="restartVm(vm)">Restart Instance</a-menu-item>
                          <a-menu-item danger @click="troubleshootVm(vm)">Troubleshoot Alert</a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
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
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  PartitionOutlined,
  LineChartOutlined,
  FilterOutlined,
  DownOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  BarsOutlined,
  DashboardOutlined
} from '@ant-design/icons-vue'
import message from 'ant-design-vue/es/message'

export default {
  name: 'NetworkArchitecture',
  components: {
    HomeOutlined,
    ReloadOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
    ClockCircleOutlined,
    PartitionOutlined,
    LineChartOutlined,
    FilterOutlined,
    DownOutlined,
    DesktopOutlined,
    AppstoreOutlined,
    CloseCircleFilled,
    ExclamationCircleFilled,
    InfoCircleFilled,
    BarsOutlined,
    DashboardOutlined
  },
  data () {
    return {
      refreshing: false,
      lastUpdatedTime: 'Nov 7, 2026 10:15:24',
      activeViewTab: 'topology',
      activeBottomTab: 'instances',
      instancesList: [
        {
          id: 1,
          name: 'VM-GM3-01',
          ip: '192.168.30.11',
          flavor: '2 vCPU / 4 GB',
          host: 'Compute-01',
          status: 'Running'
        },
        {
          id: 2,
          name: 'VM-GM3-02',
          ip: '192.168.30.12',
          flavor: '4 vCPU / 8 GB',
          host: 'Compute-01',
          status: 'Running'
        },
        {
          id: 3,
          name: 'VM-GM3-03',
          ip: '192.168.30.13',
          flavor: '4 vCPU / 8 GB',
          host: 'Compute-02',
          status: 'Failed'
        },
        {
          id: 4,
          name: 'VM-GM3-04',
          ip: '192.168.30.14',
          flavor: '2 vCPU / 4 GB',
          host: 'Compute-02',
          status: 'Running'
        }
      ]
    }
  },
  methods: {
    refreshData () {
      this.refreshing = true
      setTimeout(() => {
        const now = new Date()
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
        const timeStr = now.toTimeString().split(' ')[0]
        this.lastUpdatedTime = `${dateStr} ${timeStr}`
        this.refreshing = false
        message.success('Network topology & live telemetry updated')
      }, 700)
    },
    handleViewAllAlerts () {
      message.info('Showing all active alerts for datacenter topology')
    },
    goToInstance (vm) {
      const name = typeof vm === 'string' ? vm : (vm && vm.name ? vm.name : '')
      if (name && name.startsWith('VM-GM3')) {
        this.$router.push({ path: '/incident', query: { vm: name } })
      } else if (vm && (vm.name === 'VM-GM3-03' || vm.status === 'Failed')) {
        this.$router.push({ path: '/incident', query: { vm: 'VM-GM3-03' } })
      } else {
        this.$router.push({ path: '/incident', query: { vm: 'VM-GM3-01' } })
      }
    },
    goToIncident () {
      this.$router.push({ path: '/incident', query: { vm: 'VM-GM3-03' } })
    },
    viewVmDetails (vm) {
      this.goToInstance(vm)
    },
    restartVm (vm) {
      message.loading(`Initiating reboot for ${vm.name}...`, 1.5).then(() => {
        message.success(`Reboot command sent to ${vm.host}`)
      })
    },
    troubleshootVm (vm) {
      this.goToInstance(vm)
    }
  }
}
</script>

<style lang="less" scoped>
.network-architecture-page {
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

/* Page Header */
.page-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;

  .header-titles {
    .page-title {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
      margin: 0 0 4px 0;
    }
    .page-subtitle {
      font-size: 13px;
      color: #64748b;
      margin: 0;
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

/* ISP Status Grid */
.isp-overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.isp-status-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  .isp-status-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .isp-round-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      &.jio-round {
        background: #002884;
        color: #ffffff;
        font-size: 16px;
        font-weight: 800;
      }

      &.airtel-round {
        background: #fff;
        .airtel-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          mix-blend-mode: multiply;
        }
      }
    }

    .isp-title-group {
      .isp-title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 3px;

        .isp-name {
          font-size: 14.5px;
          font-weight: 700;
          color: #0f172a;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 1px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;

          &.active {
            background: #dcfce7;
            color: #15803d;
            border: 1px solid #bbf7d0;

            .status-dot {
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: #22c55e;
            }
          }
        }
      }

      .isp-ip-row {
        font-size: 12px;
        color: #64748b;
        display: flex;
        align-items: center;
        gap: 6px;

        .pipe { color: #cbd5e1; }
      }
    }
  }

  .isp-status-metrics {
    display: flex;
    align-items: center;
    gap: 16px;

    .metric-item {
      display: flex;
      align-items: center;
      gap: 5px;

      .metric-arrow {
        color: #0284c7;
        font-size: 12px;
      }
      .metric-clock {
        color: #64748b;
        font-size: 13px;
      }
      .metric-val {
        font-size: 13px;
        font-weight: 600;
        color: #1e293b;
      }
    }
  }
}

/* Metric Stat Cards Row */
.stat-cards-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
  margin-bottom: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-mini-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  &.alert-card-style {
    background: #ffffff;
    border-color: #fee2e2;
  }

  .stat-mini-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &.blue-wrap {
      background: #eff6ff;
      .mini-svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: #2563eb;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    &.red-wrap {
      background: #fef2f2;
      .mini-svg.red-svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: #dc2626;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }
  }

  .stat-mini-content {
    flex: 1;
    min-width: 0;

    .stat-mini-label {
      font-size: 11.5px;
      color: #64748b;
      margin-bottom: 2px;
      white-space: nowrap;
    }

    .stat-mini-val-row {
      display: flex;
      align-items: center;
      gap: 6px;

      .stat-mini-number {
        font-size: 17px;
        font-weight: 700;
        color: #0f172a;
        line-height: 1.2;

        &.alert-highlight {
          color: #0f172a;
        }
      }

      .sub-pill {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 1px 6px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 600;

        &.green-sub {
          background: #ecfdf5;
          color: #15803d;
          .arrow-up-sm { font-size: 9px; }
        }
      }
    }
  }
}

/* Middle Layout Row */
.middle-layout-row {
  display: grid;
  grid-template-columns: 1fr 310px;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}

/* Topology Panel */
.topology-panel-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
}

.topology-toolbar {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .toolbar-btn-group {
    display: flex;
    align-items: center;
    gap: 8px;

    .toolbar-tab-btn {
      background: #ffffff;
      border: 1px solid #e2e8f0;
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

      .btn-icon { font-size: 13px; }

      &:hover {
        border-color: #cbd5e1;
        color: #0f172a;
      }

      &.active {
        background: #1677ff;
        border-color: #1677ff;
        color: #ffffff;
      }
    }
  }

  .toolbar-filter-btn {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #475569;
    font-size: 12.5px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    .down-arrow-sm { font-size: 10px; color: #64748b; }
    &:hover { border-color: #cbd5e1; }
  }
}

/* Canvas Wrap */
.topology-canvas-wrap {
  position: relative;
  padding: 16px 12px 20px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;

  .topology-workflow-svg {
    width: 100%;
    max-width: 940px;
    height: auto;
    display: block;
  }
}

/* ForeignObject Cards Styling */
.f-cloud-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f0f9ff;
  border: 1.5px solid #bae6fd;
  border-radius: 30px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  &.airtel-f-cloud {
    background: #fff1f2;
    border-color: #fecdd3;
  }

  .cloud-left-logo {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &.jio-mini-logo {
      background: #002884;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
    }
    &.airtel-mini-logo {
      background: #ffffff;
      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
        mix-blend-mode: multiply;
      }
    }
  }

  .cloud-info {
    flex: 1;
    min-width: 0;
    .cloud-title-row {
      display: flex;
      align-items: center;
      gap: 5px;
      .cloud-name {
        font-size: 12px;
        font-weight: 700;
        color: #0f172a;
      }
    }
    .cloud-ip {
      font-size: 10.5px;
      color: #64748b;
      line-height: 1.2;
    }
    .cloud-speed-row {
      font-size: 10px;
      font-weight: 600;
      color: #1e293b;
      display: flex;
      gap: 6px;
    }
  }
}

.f-node-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 8px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &.router-card {
    border: 1.5px solid #93c5fd;
    background: #f8fbff;
  }
  &.firewall-card {
    border: 1.5px solid #fca5a5;
    background: #fff8f8;
  }
  &.core-switch {
    border: 1.5px solid #93c5fd;
    background: #f8fbff;
  }
  &.access-switch-card {
    border: 1.5px solid #fca5a5;
    background: #fff8f8;
  }

  .node-icon-col {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .node-svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    &.blue-icon .node-svg { stroke: #2563eb; }
    &.red-icon .node-svg { stroke: #dc2626; }
  }

  .node-text-col {
    flex: 1;
    min-width: 0;
    .node-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
      .node-title {
        font-size: 12px;
        font-weight: 700;
        color: #0f172a;
        white-space: nowrap;
      }
    }
    .node-sub {
      font-size: 10.5px;
      color: #64748b;
      white-space: nowrap;
    }
  }
}

.f-subnet-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f0fdf4;
  border: 1.5px solid #86efac;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &.incident-active {
    border-color: #fca5a5;
    background: #fff5f5;
  }

  .subnet-icon-wrap {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;

    &.green-icon { color: #16a34a; }
    &.red-icon { color: #dc2626; }
  }

  .subnet-info {
    flex: 1;
    min-width: 0;
    .subnet-title-row {
      display: flex;
      align-items: center;
      gap: 5px;
      .subnet-title {
        font-size: 12px;
        font-weight: 700;
        color: #0f172a;
        white-space: nowrap;
      }
    }
    .subnet-cidr {
      font-size: 10.5px;
      color: #64748b;
      line-height: 1.2;
      white-space: nowrap;
    }
    .subnet-devices {
      font-size: 10.5px;
      font-weight: 600;
      color: #15803d;
      white-space: nowrap;
    }
    .subnet-warning {
      font-size: 10.5px;
      font-weight: 600;
      color: #b45309;
      display: flex;
      align-items: center;
      gap: 3px;
      white-space: nowrap;
      .warning-triangle { font-size: 10px; }
    }
  }
}

/* Shared check and cross status pills */
.check-icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;

  &.green-check {
    background: #22c55e;
    color: #ffffff;
  }
}

.cross-icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;

  &.red-cross {
    background: #ef4444;
    color: #ffffff;
  }
}

/* Sidebar Panels */
.sidebar-panels-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  .sidebar-box-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;

    .box-header-icon {
      font-size: 14px;
      &.blue { color: #2563eb; }
    }

    .box-header-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    &.alerts-header {
      justify-content: space-between;

      .alerts-title-left {
        display: flex;
        align-items: center;
        gap: 6px;

        .alert-header-svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: #ef4444;
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      }

      .view-all-link {
        font-size: 12px;
        color: #2563eb;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
    }
  }
}

/* Donut Health Section */
.health-donut-section {
  display: flex;
  align-items: center;
  gap: 18px;

  .donut-chart-wrap {
    position: relative;
    width: 90px;
    height: 90px;
    flex-shrink: 0;

    .donut-svg {
      width: 100%;
      height: 100%;
    }

    .donut-center-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1;

      .big-num {
        font-size: 20px;
        font-weight: 800;
        color: #0f172a;
      }
      .lbl-small {
        font-size: 10px;
        color: #64748b;
        margin-top: 2px;
      }
    }
  }

  .health-legend-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .legend-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;

      .legend-left {
        display: flex;
        align-items: center;
        gap: 6px;

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;

          &.green { background: #22c55e; }
          &.red { background: #ef4444; }
          &.yellow { background: #eab308; }
        }

        .legend-name {
          color: #334155;
          font-weight: 500;
        }
      }

      .legend-val {
        color: #64748b;
        font-weight: 600;
      }
    }
  }
}

/* Alerts List */
.alerts-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .alert-item-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    .alert-icon-wrap {
      font-size: 15px;
      line-height: 1;
      margin-top: 2px;
      flex-shrink: 0;

      &.red-alert-icon { color: #ef4444; }
      &.yellow-alert-icon { color: #f59e0b; }
      &.blue-alert-icon { color: #2563eb; }
    }

    .alert-body {
      flex: 1;
      min-width: 0;

      .alert-msg {
        font-size: 12px;
        font-weight: 700;
        color: #0f172a;
        line-height: 1.3;
      }
      .alert-net {
        font-size: 11px;
        color: #64748b;
        margin-top: 1px;
      }
    }

    .alert-time {
      font-size: 11px;
      color: #94a3b8;
      white-space: nowrap;
    }
  }
}

/* Incident Details Card */
.incident-details-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  .incident-header-bar {
    margin-bottom: 14px;

    .incident-title-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 4px;

      .incident-title {
        font-size: 15.5px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
      }

      .incident-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #fee2e2;
        border: 1px solid #fca5a5;
        color: #dc2626;
        padding: 1px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;

        .badge-triangle { font-size: 11px; }
      }
    }

    .incident-sub-row {
      font-size: 12px;
      color: #64748b;
      display: flex;
      align-items: center;
      gap: 8px;

      .pipe { color: #cbd5e1; }
    }
  }

  .incident-body-split {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 20px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .incident-stats-quad {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    text-align: center;

    .quad-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-right: 1px solid #f1f5f9;

      &:last-child {
        border-right: none;
      }

      .quad-label {
        font-size: 11px;
        color: #64748b;
        white-space: nowrap;
      }

      .quad-number {
        font-size: 17px;
        font-weight: 700;
        color: #0f172a;

        &.green-text { color: #16a34a; }
        &.red-text { color: #dc2626; }
      }
    }
  }

  .incident-table-side {
    display: flex;
    flex-direction: column;

    .incident-tabs-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      .inc-tab-btn {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        color: #475569;
        font-size: 12px;
        font-weight: 500;
        padding: 5px 12px;
        border-radius: 6px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.15s ease;

        .btn-icon { font-size: 12px; }

        &:hover {
          border-color: #cbd5e1;
          color: #0f172a;
        }

        &.active {
          background: #1677ff;
          border-color: #1677ff;
          color: #ffffff;
        }
      }
    }

    .instances-table-wrap {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow-x: auto;

      .styled-instances-table {
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

            &:hover {
              background: #f8fafc;
            }

            &.failed-row-highlight {
              background: #fff5f5;
              &:hover {
                background: #fee2e2;
              }
            }

            td {
              padding: 9px 12px;
              color: #1e293b;
            }

            .col-idx {
              color: #64748b;
            }

            .col-name {
              .vm-link {
                color: #2563eb;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                &:hover { text-decoration: underline; }
              }
            }

            .col-ip {
              color: #475569;
            }

            .col-flavor {
              color: #475569;
            }

            .col-host {
              color: #475569;
            }

            .col-status {
              display: flex;
              align-items: center;
              gap: 6px;

              .status-dot-cell {
                width: 6px;
                height: 6px;
                border-radius: 50%;

                &.dot-running { background: #22c55e; }
                &.dot-failed { background: #ef4444; }
              }

              .text-running {
                color: #16a34a;
                font-weight: 600;
              }
              .text-failed {
                color: #dc2626;
                font-weight: 600;
              }
            }

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
}
</style>

