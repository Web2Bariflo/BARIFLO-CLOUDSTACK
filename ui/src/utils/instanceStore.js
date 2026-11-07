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

import eventBus from '@/config/eventBus'

const STORAGE_KEY = 'cloudstack_instances_shared'

const DEFAULT_INSTANCES = [
  {
    id: '1',
    name: 'web-server-01',
    displayname: 'web-server-01',
    instancename: 'i-2-1-VM',
    status: 'Running',
    state: 'Running',
    ip: '10.10.1.15',
    ipaddress: '10.10.1.15',
    nic: [{ ipaddress: '10.10.1.15', isdefault: true, networkname: 'GM1' }],
    zone: 'Zone-1',
    zonename: 'Zone-1',
    hostname: 'host-01',
    host: 'host-01',
    arch: 'x86_64',
    account: 'admin',
    isp: 'Airtel',
    serviceofferingname: 'Medium (2 vCPU, 4 GB RAM)',
    cpunumber: 2,
    cpuused: '15%',
    cputotal: '2.40 GHz',
    memoryused: '1.4 GB',
    memorytotal: '4.0 GB',
    networkread: '28.4 MB',
    networkwrite: '19.6 MB',
    diskkbsread: '6 KB',
    diskkbswrite: '16 KB',
    diskiopstotal: 130,
    networkname: 'GM1',
    created: '2026-10-01 10:30'
  },
  {
    id: '2',
    name: 'app-server-01',
    displayname: 'app-server-01',
    instancename: 'i-2-2-VM',
    status: 'Running',
    state: 'Running',
    ip: '10.10.1.22',
    ipaddress: '10.10.1.22',
    nic: [{ ipaddress: '10.10.1.22', isdefault: true, networkname: 'GM1' }],
    zone: 'Zone-1',
    zonename: 'Zone-1',
    hostname: 'host-02',
    host: 'host-02',
    arch: 'x86_64',
    account: 'admin',
    isp: 'Airtel',
    serviceofferingname: 'Medium (2 vCPU, 4 GB RAM)',
    cpunumber: 2,
    cpuused: '22%',
    cputotal: '2.40 GHz',
    memoryused: '2.1 GB',
    memorytotal: '4.0 GB',
    networkread: '45.1 MB',
    networkwrite: '33.8 MB',
    diskkbsread: '12 KB',
    diskkbswrite: '28 KB',
    diskiopstotal: 185,
    networkname: 'GM1',
    created: '2026-10-02 14:20'
  },
  {
    id: '3',
    name: 'api-server-01',
    displayname: 'api-server-01',
    instancename: 'i-2-3-VM',
    status: 'Stopped',
    state: 'Stopped',
    ip: '10.10.1.48',
    ipaddress: '10.10.1.48',
    nic: [{ ipaddress: '10.10.1.48', isdefault: true, networkname: 'GM1' }],
    zone: 'Zone-1',
    zonename: 'Zone-1',
    hostname: 'host-01',
    host: 'host-01',
    arch: 'x86_64',
    account: 'admin',
    isp: 'Jio',
    serviceofferingname: 'Small (1 vCPU, 2 GB RAM)',
    cpunumber: 1,
    cpuused: '0%',
    cputotal: '2.40 GHz',
    memoryused: '0 GB',
    memorytotal: '2.0 GB',
    networkread: '0 MB',
    networkwrite: '0 MB',
    diskkbsread: '0 KB',
    diskkbswrite: '0 KB',
    diskiopstotal: 0,
    networkname: 'GM1',
    created: '2026-10-10 09:15'
  }
]

function normalizeVm (vm) {
  const name = vm.name || vm.displayname || vm.instancename || 'instance'
  const state = vm.state || vm.status || 'Running'
  const ip = vm.ip || vm.ipaddress || '10.10.1.50'
  const zone = vm.zone || vm.zonename || 'Zone-1'
  const host = vm.host || vm.hostname || 'host-01'
  const arch = vm.arch || 'x86_64'
  const account = vm.account || 'admin'
  let isp = vm.isp
  if (!isp) {
    const netStr = String(vm.network || vm.networkname || vm.from || '').toLowerCase()
    if (netStr.includes('jio')) isp = 'Jio'
    else if (netStr.includes('airtel')) isp = 'Airtel'
    else isp = 'Airtel'
  }
  return {
    id: String(vm.id || Date.now() + '-' + Math.floor(Math.random() * 1000)),
    name: name,
    displayname: vm.displayname || name,
    instancename: vm.instancename || `i-2-${name}`,
    status: state,
    state: state,
    ip: ip,
    ipaddress: ip,
    nic: vm.nic || [{ ipaddress: ip, isdefault: true, networkname: vm.networkname || vm.network || 'GM1' }],
    zone: zone,
    zonename: zone,
    hostname: host,
    host: host,
    arch: arch,
    account: account,
    isp: isp,
    serviceofferingname: vm.serviceofferingname || 'Medium (2 vCPU, 4 GB RAM)',
    cpunumber: vm.cpunumber || 2,
    cpuused: vm.cpuused || (state === 'Running' ? '18%' : '0%'),
    cputotal: vm.cputotal || '2.40 GHz',
    memoryused: vm.memoryused || (state === 'Running' ? '1.5 GB' : '0 GB'),
    memorytotal: vm.memorytotal || '4.0 GB',
    networkread: vm.networkread || (state === 'Running' ? '15.2 MB' : '0 MB'),
    networkwrite: vm.networkwrite || (state === 'Running' ? '12.4 MB' : '0 MB'),
    diskkbsread: vm.diskkbsread || (state === 'Running' ? '8 KB' : '0 KB'),
    diskkbswrite: vm.diskkbswrite || (state === 'Running' ? '14 KB' : '0 KB'),
    diskiopstotal: vm.diskiopstotal !== undefined ? vm.diskiopstotal : (state === 'Running' ? 120 : 0),
    network: vm.network || vm.networkname || 'GM1',
    networkname: vm.networkname || vm.network || 'GM1',
    created: vm.created || 'Just now'
  }
}

export function getStoredInstances () {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeVm)
      }
    }
  } catch (e) {
    console.error('Error reading stored instances:', e)
  }
  const defaults = DEFAULT_INSTANCES.map(normalizeVm)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
  } catch (e) {}
  return defaults
}

export function saveStoredInstances (instances, notify = true) {
  try {
    const normalized = (instances || []).map(normalizeVm)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
    if (notify) {
      eventBus.emit('vm-refresh-data')
    }
    return normalized
  } catch (e) {
    console.error('Error saving stored instances:', e)
    return instances
  }
}

export function addStoredInstance (vm) {
  const current = getStoredInstances()
  const normalized = normalizeVm(vm)
  const existingIdx = current.findIndex(x => x.id === normalized.id || x.name === normalized.name)
  if (existingIdx >= 0) {
    current[existingIdx] = { ...current[existingIdx], ...normalized }
  } else {
    current.unshift(normalized)
  }
  saveStoredInstances(current, true)
  return normalized
}

export function updateStoredInstance (idOrName, updates) {
  const current = getStoredInstances()
  const idx = current.findIndex(x => String(x.id) === String(idOrName) || x.name === String(idOrName))
  if (idx >= 0) {
    const updated = { ...current[idx], ...updates }
    if (updates.status) updated.state = updates.status
    if (updates.state) updated.status = updates.state
    current[idx] = normalizeVm(updated)
    saveStoredInstances(current, true)
    return current[idx]
  }
  return null
}

export function deleteStoredInstance (idOrName) {
  const current = getStoredInstances()
  const filtered = current.filter(x => String(x.id) !== String(idOrName) && x.name !== String(idOrName))
  saveStoredInstances(filtered, true)
  return filtered
}

