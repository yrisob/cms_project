<template>
    <v-card>
      <v-card-title>
        {{tableTitle}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          v-bind:label="searchTitle"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:items="props">
          <td
                v-for="(header, index) in headers"
                :key="index"
                :class="(index)? 'text-xs-right':'' ">{{ props.item[header.value] }} </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
export default {
  name: 'table-with-search',
  props: ['tableTitle', 'searchTitle', 'headers', 'search', 'items'],
  data: () => ({}),
  methods: {

  }
}
</script>
