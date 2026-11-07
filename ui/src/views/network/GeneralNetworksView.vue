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
      <span class="breadcrumb-active">General Networks</span>
    </div>

    <div class="page-header-row">
      <div>
        <h1 class="page-title">General Networks</h1>
        <p class="page-subtitle">Manage datacenter core and spine-leaf routing fabrics</p>
      </div>
      <a-button type="primary" class="btn-primary-action">
        <PlusOutlined /> Add Network
      </a-button>
    </div>

    <a-card :bordered="false" class="content-card">
      <a-table :columns="columns" :dataSource="networks" :pagination="{ pageSize: 10 }">
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
  name: 'GeneralNetworksView',
  components: { HomeOutlined, PlusOutlined },
  data () {
    return {
      columns: [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'State', dataIndex: 'state', key: 'state' },
        { title: 'VLAN / VXLAN', dataIndex: 'vlan', key: 'vlan' },
        { title: 'CIDR', dataIndex: 'cidr', key: 'cidr' },
        { title: 'Gateway', dataIndex: 'gateway', key: 'gateway' },
        { title: 'Zone', dataIndex: 'zone', key: 'zone' }
      ],
      networks: [
        { key: '1', name: 'Core-Backbone-01', state: 'Active', vlan: '100', cidr: '10.10.0.0/16', gateway: '10.10.0.1', zone: 'Datacenter-Zone-1' },
        { key: '2', name: 'Spine-Leaf-Interconnect', state: 'Active', vlan: '200', cidr: '10.20.0.0/16', gateway: '10.20.0.1', zone: 'Datacenter-Zone-1' },
        { key: '3', name: 'OOB-Management', state: 'Active', vlan: '300', cidr: '192.168.100.0/24', gateway: '192.168.100.1', zone: 'Datacenter-Zone-1' }
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
