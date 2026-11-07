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
      <span class="breadcrumb-active">Local Networks</span>
    </div>

    <div class="page-header-row">
      <div>
        <h1 class="page-title">Local Networks</h1>
        <p class="page-subtitle">Configure intra-datacenter LAN segments, broadcast domains and host clustering</p>
      </div>
      <a-button type="primary">
        <PlusOutlined /> Add Local Segment
      </a-button>
    </div>

    <a-card :bordered="false" class="content-card">
      <a-table :columns="columns" :dataSource="localNets" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'state'">
            <a-badge status="success" :text="record.state" />
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { HomeOutlined, PlusOutlined } from '@ant-design/icons-vue'

export default {
  name: 'LocalNetworksView',
  components: { HomeOutlined, PlusOutlined },
  data () {
    return {
      columns: [
        { title: 'Segment Name', dataIndex: 'name', key: 'name' },
        { title: 'State', dataIndex: 'state', key: 'state' },
        { title: 'Broadcast Domain', dataIndex: 'vlan', key: 'vlan' },
        { title: 'Subnet CIDR', dataIndex: 'cidr', key: 'cidr' },
        { title: 'Connected Hosts', dataIndex: 'hosts', key: 'hosts' },
        { title: 'MTU Size', dataIndex: 'mtu', key: 'mtu' }
      ],
      localNets: [
        { key: '1', name: 'SAN-Storage-Fabric-A', state: 'Active', vlan: 'VLAN 1010', cidr: '172.16.10.0/24', hosts: '16 Hosts', mtu: '9000 (Jumbo)' },
        { key: '2', name: 'SAN-Storage-Fabric-B', state: 'Active', vlan: 'VLAN 1020', cidr: '172.16.20.0/24', hosts: '16 Hosts', mtu: '9000 (Jumbo)' },
        { key: '3', name: 'VM-Migration-Network', state: 'Active', vlan: 'VLAN 1030', cidr: '172.16.30.0/24', hosts: '24 Hosts', mtu: '9000 (Jumbo)' },
        { key: '4', name: 'Cluster-Heartbeat-LAN', state: 'Active', vlan: 'VLAN 1040', cidr: '172.16.40.0/24', hosts: '32 Hosts', mtu: '1500 (Standard)' }
      ]
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
