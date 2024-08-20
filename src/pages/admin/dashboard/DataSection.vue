<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <DataSectionItem
      v-for="metric in dashboardMetrics"
      :key="metric.id"
      :title="metric.title"
      :value="metric.value"
      :change-text="metric.changeText"
      :up="metric.changeDirection === 'up'"
      :icon-background="metric.iconBackground"
      :icon-color="metric.iconColor"
    >
      <template #icon>
        <VaIcon :name="metric.icon" size="large" />
      </template>
    </DataSectionItem>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useColors } from 'vuestic-ui'
import DataSectionItem from './DataSectionItem.vue'
import { totalProperties } from '../../../api/services/property-service'

interface DashboardMetric {
  id: string
  title: string
  value: string
  icon: string
  changeText: string
  changeDirection: 'up' | 'down'
  iconBackground: string
  iconColor: string
}

const { getColor } = useColors()
const totalPropertiesValue = ref('0')

async function fetchTotalProperties() {
  const api_return = await totalProperties()
  totalPropertiesValue.value = api_return.data[0].count
}

onMounted(() => {
  fetchTotalProperties()
})

const dashboardMetrics = computed<DashboardMetric[]>(() => [
  {
    id: 'totalProperties',
    title: 'Ativos registrados',
    value: totalPropertiesValue.value,
    icon: 'maps_home_work',
    changeText: '2',
    changeDirection: 'down',
    iconBackground: getColor('success'),
    iconColor: getColor('on-success'),
  },
  {
    id: 'openReviews',
    title: 'Documentos criados',
    value: '15',
    icon: 'mso-folder_open',
    changeText: '25.36%',
    changeDirection: 'up',
    iconBackground: getColor('info'),
    iconColor: getColor('on-info'),
  },
  {
    id: 'userActives',
    title: 'Interações realizadas',
    value: '25',
    icon: 'mso-account_circle',
    changeText: '2.5%',
    changeDirection: 'up',
    iconBackground: getColor('danger'),
    iconColor: getColor('on-danger'),
  },
  {
    id: 'newProfit',
    title: 'Conversão',
    value: '27%',
    icon: 'mso-grade',
    changeText: '4%',
    changeDirection: 'up',
    iconBackground: getColor('warning'),
    iconColor: getColor('on-warning'),
  },
])
</script>
