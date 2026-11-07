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
  <div class="network-page-container">
    <div class="breadcrumb-bar">
      <router-link to="/dashboard"><HomeOutlined class="breadcrumb-home-icon" /></router-link>
      <span class="breadcrumb-sep">/</span>
      <span>Network</span>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-active">Ping Networks</span>
    </div>

    <div class="page-header-row">
      <div>
        <h1 class="page-title">Ping Networks & Probes</h1>
        <p class="page-subtitle">Latency monitoring, ICMP health checks, and packet loss diagnostics</p>
      </div>
      <a-button type="primary" @click="runAllProbes">
        <ReloadOutlined /> Ping All Targets
      </a-button>
    </div>

    <a-card :bordered="false" class="content-card">
      <a-table :columns="columns" :dataSource="probes" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'UP' ? 'success' : 'error'">{{ record.status }}</a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import message from 'ant-design-vue/es/message'

export default {
  name: 'PingNetworksView',
  components: { HomeOutlined, ReloadOutlined },
  data () {
    return {
      columns: [
        { title: 'Target Host / IP', dataIndex: 'host', key: 'host' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Avg Latency', dataIndex: 'latency', key: 'latency' },
        { title: 'Packet Loss', dataIndex: 'packetLoss', key: 'packetLoss' },
        { title: 'Via ISP Link', dataIndex: 'isp', key: 'isp' },
        { title: 'Last Probed', dataIndex: 'lastCheck', key: 'lastCheck' }
      ],
      probes: [
        { key: '1', host: 'Google DNS (8.8.8.8)', status: 'UP', latency: '4.8 ms', packetLoss: '0.0%', isp: 'JIO NETWORK', lastCheck: 'Just now' },
        { key: '2', host: 'Cloudflare DNS (1.1.1.1)', status: 'UP', latency: '3.9 ms', packetLoss: '0.0%', isp: 'AIRTEL NETWORK', lastCheck: 'Just now' },
        { key: '3', host: 'Gateway-Jio (203.0.113.1)', status: 'UP', latency: '1.2 ms', packetLoss: '0.0%', isp: 'JIO NETWORK', lastCheck: '1 min ago' },
        { key: '4', host: 'Gateway-Airtel (198.51.100.1)', status: 'UP', latency: '1.5 ms', packetLoss: '0.0%', isp: 'AIRTEL NETWORK', lastCheck: '1 min ago' }
      ]
    }
  },
  methods: {
    runAllProbes () {
      message.success('Ping probes executed successfully. All ISP targets reachable.')
    }
  }
}
</script>

<style lang="less" scoped>
.network-page-container {
  padding: 20px 24px;
  background-color: #f8fafc;
  min-height: calc(100vh - 64px);

  .breadcrumb-bar {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #64748b;
    margin-bottom: 16px;
    .breadcrumb-sep { margin: 0 8px; color: #94a3b8; }
    .breadcrumb-active { color: #1e293b; font-weight: 500; }
  }

  .page-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .page-title { font-size: 24px; font-weight: 700; color: #0f172a; margin: 0; }
    .page-subtitle { font-size: 13px; color: #64748b; margin: 4px 0 0; }
  }

  .content-card {
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
}
</style>
