<template>
  <v-navigation-drawer app permanent color="grey-lighten-4">
    <v-list nav>
      <v-list-item title="Dashboard" to="/dashboard" prepend-icon="mdi-view-dashboard" />
      <v-list-item title="Pacientes" to="/pacientes" prepend-icon="mdi-account" />
      <v-list-item title="Orçamentos" to="/orcamentos" prepend-icon="mdi-file-document" />
      <v-list-item title="Atendimentos" to="/atendimentos" prepend-icon="mdi-stethoscope" />
      <v-list-item title="Sair" to="/logout" prepend-icon="mdi-logout" />
    </v-list>
  </v-navigation-drawer>
</template>