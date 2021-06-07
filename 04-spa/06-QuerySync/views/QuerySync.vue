<template>
  <meetups-view v-bind.sync="meetupsViewProps" />
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'QuerySync',

  components: { MeetupsView },

  data() {
    return {
      defaults: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },

      meetupsViewProps: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },
    };
  },

  computed: {
    navQuery() {
      let qry = {};
      if (JSON.stringify(this.defaults) != JSON.stringify(this.meetupsViewProps)) {
        if (this.meetupsViewProps.view != this.defaults.view) qry.view = this.meetupsViewProps.view;
        if (this.meetupsViewProps.date != this.defaults.date) qry.date = this.meetupsViewProps.date;
        if (this.meetupsViewProps.participation != this.defaults.participation)
          qry.participation = this.meetupsViewProps.participation;
        if (this.meetupsViewProps.search != this.defaults.search) qry.search = this.meetupsViewProps.search;
      }
      return qry;
    },

    urlQuery() {
      return this.$route.query;
    },
  },

  watch: {
    meetupsViewProps: {
      handler: function () {
        this.$router.push({ query: this.navQuery }).catch((err) => {
          if (err.name != 'NavigationDuplicated') {
            throw err;
          }
        });
      },

      deep: true,
    },

    urlQuery: {
      handler: function () {
        this.updQuery();
      },

      deep: true,
      immediate: true,
    },
  },

  methods: {
    updQuery() {
      this.meetupsViewProps = {
        view: this.urlQuery.view || this.meetupsViewProps.view,
        date: this.urlQuery.date || this.meetupsViewProps.date,
        participation: this.urlQuery.participation || this.meetupsViewProps.participation,
        search: this.urlQuery.search || this.meetupsViewProps.search,
      };
    },
  },
};
</script>
