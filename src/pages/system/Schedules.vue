<script setup lang="ts">
import { ref, computed } from 'vue'

const calendarValue = ref([{ date: new Date().toISOString().substr(0, 10) }])

const appointments = ref([
  {
    id: 1,
    patient: { name: 'João Silva' },
    date: '2025-05-18T09:00:00',
  },
  {
    id: 2,
    patient: { name: 'Maria Oliveira' },
    date: '2025-05-18T14:30:00',
  },
  {
    id: 3,
    patient: { name: 'Carlos Souza' },
    date: '2025-05-21T11:00:00',
  },
])

const upcomingAppointments = computed(() => {
  const now = new Date()
  return appointments.value
    .filter(a => new Date(a.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
})

const calendarEvents = computed(() =>
  appointments.value.map(a => ({
    name: a.patient.name,
    start: a.date,
    color: 'primary',
  }))
)

function getAppointmentsForDay(dateString: string) {
  return appointments.value.filter(a => {
    const aDate = new Date(a.date).toISOString().substr(0, 10)
    return aDate === dateString
  })
}

function formatDateTime(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDay({ date }: { date: string }) {
  return new Date(date).getDate().toString()
}
</script>


<template>
  <v-container fluid>
    <v-row>
      <!-- Coluna esquerda: próximos agendamentos -->
      <v-col cols="12" md="3">
        <h3 class="mb-2">Próximos agendamentos</h3>
        <v-list density="compact">
          <v-list-item
            v-for="appointment in upcomingAppointments"
            :key="appointment.id"
          >
            <v-list-item-title class="font-weight-medium">
              {{ appointment.patient.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ formatDateTime(appointment.date) }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Coluna direita: calendário mensal -->
      <v-col cols="12" md="9">
        <h3 class="mb-2">Calendário de agendamentos</h3>
        <!-- <v-calendar
          ref="calendar"
          v-model="calendarValue"
          type="month"
          :events="calendarEvents"
          color="primary"
          :weekdays="[0, 1, 2, 3, 4, 5, 6]"
          :day-format="formatDay"
          :show-adjacent-months="true"
          :short-intervals="false"
          :short-weekdays="false"
        > -->
          <!-- Customização dos dias com eventos -->
          <!-- <template #event="{ event, day }">
            <div>{{ event.title }} {{ day }}</div>
          </template> -->
        <!-- </v-calendar> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-grey {
  color: #aaa;
}
</style>
