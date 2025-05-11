<script setup lang="ts">
import IntegrationTab from '@/components/system/myAccount/tabs/IntegrationTab.vue'
import NotificationTab from '@/components/system/myAccount/tabs/NotificationTab.vue'
import PersonalTab from '@/components/system/myAccount/tabs/PersonalTab.vue'
import SubscriptionTab from '@/components/system/myAccount/tabs/SubscriptionTab.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { name:'Informações Pessoais', value: 'informacoes-pessoais' },
  { name: 'Notificações', value: 'notificacao' },
  { name:'Assinatura', value: 'assinatura' },
  { name: 'Integrações', value: 'integracoes' }
]

const selectedTab = ref(route.query.tab || 'informacoes-pessoais')

watch(selectedTab, (newTab) => {
  router.replace({ query: { ...route.query, tab: newTab } })
})
</script>

<template>
  <v-container fluid>
    <v-tabs
      v-model="selectedTab"
      class="border-b"
    >
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :value="tab.value"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <v-container class="py-12">
      <v-tabs-window v-model="selectedTab">
        <v-tabs-window-item value="informacoes-pessoais">
          <PersonalTab />
        </v-tabs-window-item>

        <v-tabs-window-item value="notificacao">
          <NotificationTab />
        </v-tabs-window-item>

        <v-tabs-window-item value="assinatura">
          <SubscriptionTab />
        </v-tabs-window-item>

        <v-tabs-window-item value="integracoes">
          <IntegrationTab />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </v-container>
</template>
