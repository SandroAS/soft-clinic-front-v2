<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'

const totalPacientes = 124
const totalOrcamentos = 89
const totalAtendimentos = 152
const totalFaturamento = 38250.75

// Simulação de dados para os últimos 30 dias
const today = new Date()
const labels = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(today)
  date.setDate(today.getDate() - (29 - i))
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
})

const values = Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000) + 300)

const series = [
  {
    name: 'Faturamento',
    data: values,
  },
]

const chartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false },
  },
  xaxis: {
    categories: labels,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#1976d2'],
  tooltip: {
    y: {
      formatter: (val: number) => `R$ ${val.toLocaleString()}`,
    },
  },
}
</script>

<template>
  <v-container fluid>
    <!-- Totalizadores -->
    <v-row dense class="mb-6">
      <v-col cols="12" md="3">
        <v-card class="pa-4" elevation="2">
          <v-icon size="32" color="primary">mdi-account</v-icon>
          <div class="text-h6 mt-2">Pacientes</div>
          <div class="text-h5 font-weight-bold">{{ totalPacientes }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-4" elevation="2">
          <v-icon size="32" color="primary">mdi-file-document-outline</v-icon>
          <div class="text-h6 mt-2">Orçamentos</div>
          <div class="text-h5 font-weight-bold">{{ totalOrcamentos }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-4" elevation="2">
          <v-icon size="32" color="primary">mdi-stethoscope</v-icon>
          <div class="text-h6 mt-2">Atendimentos</div>
          <div class="text-h5 font-weight-bold">{{ totalAtendimentos }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-4 bg-primary text-white" elevation="2">
          <v-icon size="32" color="white">mdi-cash-multiple</v-icon>
          <div class="text-h6 mt-2">Faturamento</div>
          <div class="text-h5 font-weight-bold">R$ {{ totalFaturamento.toLocaleString() }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gráfico de Faturamento -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="pa-4">
          <h3 class="mb-4">Faturamento - Últimos 30 dias</h3>
          <apexchart
            width="100%"
            height="350"
            type="bar"
            :options="chartOptions"
            :series="series"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h3 {
  font-weight: 600;
}
</style>
