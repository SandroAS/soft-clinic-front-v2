<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDate } from 'vuetify'

interface CalendarEvent {
  title: string
  start: Date
  end: Date
  color: string
  allDay: boolean
}

const type = ref<'month' | 'week' | 'day'>('month')
const types = [
  { text: 'MÊS', value: 'month' },
  { text: 'SEMANA', value: 'week' },
  { text: 'DIA', value: 'day' },
]

const value = ref<Date[]>([new Date()])
const events = ref<CalendarEvent[]>([])

const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
const titles = ['Atendimento', 'Feriado', 'Reunião', 'Viagem', 'Cirurgia', 'Aniversário', 'Conferência', 'Festa']

const dateAdapter = useDate()

function getEvents({ start, end }: { start: Date; end: Date }) {
  const generatedEvents: CalendarEvent[] = []

  const min = start
  const max = end
  const days = (max.getTime() - min.getTime()) / 86400000
  const eventCount = rnd(days, days + 20)

  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0
    const firstTimestamp = rnd(min.getTime(), max.getTime())
    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
    const second = new Date(first.getTime() + secondTimestamp)

    // generatedEvents.push({
    //   title: titles[rnd(0, titles.length - 1)],
    //   start: first,
    //   end: second,
    //   color: colors[rnd(0, colors.length - 1)],
    //   allDay: !allDay,
    // })
    // console.log('Event:', {
    //   title: titles[rnd(0, titles.length - 1)],
    //   start: first,
    //   end: second,
    //   color: colors[rnd(0, colors.length - 1)],
    //   allDay: !allDay,
    // })
  }

  generatedEvents.push({
    allDay: false,
    color: "orange",
    end: new Date("2025-05-22T09:10:00"),
    start: new Date("2025-05-22T09:20:00"),
    title: "Feriado"
  })

  events.value = generatedEvents
}

function rnd(a: number, b: number): number {
  return Math.floor((b - a + 1) * Math.random()) + a
}

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

onMounted(() => {
  const start = dateAdapter.startOfDay(dateAdapter.startOfMonth(new Date())) as Date
  const end = dateAdapter.endOfDay(dateAdapter.endOfMonth(new Date())) as Date
  getEvents({ start, end })
})

function teste(n) {
  return n.label
}
</script>


<template>
  <v-container fluid>
    <v-row>
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

      <v-col cols="12" md="12">
        <v-row justify="end">
          <v-col cols="12" md="6">
            <h3 class="mb-2">Calendário de agendamentos</h3>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="type"
              :items="types"
              item-title="text"
              item-value="value"
              label="Modo de exibição"
              density="comfortable"
              variant="solo-filled"
              hide-details
            />
          </v-col>
        </v-row>
        <v-calendar
          ref="calendarRef"
          v-model="value"
          :events="events"
          :view-mode="type"
          :first-day-of-week="0"
          :interval-duration="60"
          :interval-format="teste"
          :interval-height="25"
        >
          <template #header="{ title, clickNext, clickPrev, clickToday }">
            Teste {{ title }}
          </template>
        </v-calendar>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-grey {
  color: #aaa;
}
</style>

<style>
/* .v-calendar__container {
  padding: 4px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
} */
</style>
