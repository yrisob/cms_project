<template>
  <div>
    <v-card>
      <v-card-title>
        {{ tableTitle }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchingString"
          append-icon="search"
          v-bind:label="searchTitle"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        :search="searchingString"
        :total-items="totlaCount"
      >
        <template v-slot:items="props">
          <template v-for="(header, index) in headers">
            <td
              v-bind:key="index + '-data'"
              v-if="!header.action && !header.isImage"
              :class="index ? 'text-xs-right' : ''"
              @click="editItem(props.item)"
            >
              {{
                header.convert
                  ? header.convert(props.item[header.value])
                  : props.item[header.value]
              }}
            </td>
            <td
              v-bind:key="index + '-data'"
              v-if="!header.action && header.isImage"
              :class="index ? 'text-xs-right' : ''"
              @click="editItem(props.item)"
            >
              <v-img :src="getImage(props.item[header.value])"></v-img>
            </td>
            <td
              v-bind:key="index + '-action'"
              v-if="header.action && !header.isImage"
              :class="index ? 'text-xs-right' : ''"
            >
              <v-tooltip v-if="hasEditAction" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :to="getEditHref(props.item[header.value])"
                    v-on="on"
                    flat
                    icon
                    color="black"
                  >
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                </template>
                <span>Редактировать</span>
              </v-tooltip>

              <v-tooltip v-if="hasDeleteAction" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="setItemForDel(props.item[header.value])"
                    v-on="on"
                    flat
                    icon
                    color="black"
                  >
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </template>
                <span>Удалить</span>
              </v-tooltip>
            </td>
          </template>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="30%">
      <v-card>
        <v-card-title class="headline"
          >Вы точно хотите удалить данные?</v-card-title
        >
        <v-card-text
          >После подтверждения действия, данные будут удалены без возможности
          восстановления. Для отмены нажмите «Отменить».</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="primary" flat @click="dialog = false"
            >Отменить</v-btn
          >
          <v-btn color="red darken-1" flat @click="deleteItem()"
            >Подтвердить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: [
    'tableTitle',
    'searchTitle',
    'headers',
    'search',
    'items',
    'actions',
    'editHref'
  ],
  data: () => ({
    searchingText: '',
    isSearchTextChanged: false,
    dialog: false,
    totlaCount: 25,
    idItemForDel: null
  }),
  computed: {
    searchingString: {
      get () {
        if (this.isSearchTextChanged) {
          return this.searchingText
        }
        return this.search
      },
      set (newValue) {
        this.isSearchTextChanged = true
        this.searchingText = newValue
      }
    },
    hasDeleteAction: {
      get () {
        return !!this.actions && this.actions.indexOf('delete') > -1
      }
    },
    hasEditAction: {
      get () {
        return (
          !!this.actions && !!this.editHref && this.actions.indexOf('edit') > -1
        )
      }
    }
  },
  methods: {
    getImage (path) {
      if (!path) {
        return require('../assets/noimage.jpg')
      } else {
        return `${this.$store.getters.BASE_URL}${path}`
      }
    },
    setItemForDel (id) {
      this.idItemForDel = id
      this.dialog = true
    },
    getEditHref (id) {
      if (this.editHref) {
        return `${this.editHref}/${id}`
      }
    },
    deleteItem () {
      if (this.idItemForDel) {
        this.$emit('deleteAction', this.idItemForDel)
        this.dialog = false
      }
    },
    editItem (item) {
      this.$emit('previewAction', item)
    }
  }
}
</script>
