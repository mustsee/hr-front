<template>
  <div class="home">
    <header>
      <b-button @click="handleOpenForm">Add advert</b-button>
      <b-tag rounded type="is-primary-invert" size="is-medium">{{
        adverts.length
      }}</b-tag>
    </header>
    <main>
      <b-table
        :data="adverts"
        :loading="isLoading"
        mobile-cards
        ref="table"
        detailed
        detail-key="id"
        :opened-detailed="defaultOpenedDetails"
        :show-detail-icon="false"
        paginated
        :per-page="10"
        :pagination-simple="true"
        pagination-position="top"
      >
        <template slot-scope="props">
          <b-table-column field="domain" label="Domain" sortable width="150">
            <div class="truncate w-150">
              {{ props.row.domain }}
            </div>
          </b-table-column>

          <b-table-column
            field="companyName"
            label="Company Name"
            sortable
            width="200"
          >
            <div class="truncate w-200">
              {{ props.row.companyName }}
            </div>
          </b-table-column>

          <b-table-column field="url" label="URL" centered>
            <div class="one-line">
              <a :href="props.row.url">link</a>
            </div>
          </b-table-column>

          <b-table-column
            field="jobPosition"
            label="Job position"
            sortable
            width="200"
          >
            <div class="truncate w-200">
              {{ props.row.jobPosition }}
            </div>
          </b-table-column>

          <b-table-column
            field="technicalStack"
            label="Technical stack"
            width="200"
          >
            <div class="truncate w-200">
              {{ props.row.technicalStack }}
            </div>
          </b-table-column>

          <b-table-column label="Details" width="100" centered>
            <div class="truncate w-100">
              <div @click="toggle(props.row)" class="action-icon">
                {{
                  defaultOpenedDetails.includes(props.row.id)
                    ? "&#8595;"
                    : "&#8594;"
                }}
              </div>
            </div>
          </b-table-column>

          <b-table-column field="date" label="Date" sortable centered>
            {{
              props.row.date
                ? new Date(props.row.date).toLocaleDateString()
                : "No date"
            }}
          </b-table-column>

          <b-table-column>
            <div class="icons-wrapper">
              <div class="action-icon" @click="handleEdit(props.row.id)">
                <b-icon icon="pencil" size="is-small"></b-icon>
              </div>
              <div class="action-icon" @click="handleDelete(props.row.id)">
                <b-icon icon="delete" size="is-small"></b-icon>
              </div>
            </div>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>Technical stack :</p>
                <p>Impressions : {{ props.row.impressions }}</p>
              </div>
            </div>
          </article>
        </template>

        <template slot="empty" v-if="!isLoading">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-outline" size="is-large"> </b-icon>
              </p>
              <p>Nothing here</p>
              <p>Start by adding an advert !</p>
            </div>
          </section>
        </template>
      </b-table>
    </main>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000";

export default {
  name: "Home",
  data() {
    return {
      defaultOpenedDetails: [],
      isLoading: false,
      adverts: [],
    };
  },
  methods: {
    handleOpenForm() {
      this.$router.push({ path: "/advert" });
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    deleteAd(rowId) {
      const payload = {
        method: "DELETE",
      };
      // TODO: change "adverts" route
      // If "ad" prefix is in the route, the add-blocker is blocking the route...
      fetch(`${baseUrl}/adverts/${rowId}`, payload)
        .then(() => {
          this.$buefy.toast.open({
            message: "Ad deleted !",
            type: "is-success",
          });
          this.loadAds();
        })
        .catch((err) => console.log("Error : ", err));
    },
    handleDelete(rowId) {
      this.$buefy.dialog.confirm({
        title: "Deleting advert",
        message:
          "Are you sure you want to <b>delete</b> your ad? <br> This action cannot be undone.",
        confirmText: "Delete",
        hasIcon: true,
        type: "is-danger",
        onConfirm: () => this.deleteAd(rowId),
      });
    },
    handleEdit(rowId) {
      this.$router.push({ path: `/advert/${rowId}` });
    },
    loadAds() {
      this.isLoading = true;
      const payload = {
        method: "GET",
      };
      fetch(`${baseUrl}/adverts`, payload)
        .then((res) => res.json())
        .then((data) => {
          this.adverts = data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log("Error : ", err);
        });
    },
  },
  mounted() {
    this.loadAds();
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 80px;
  padding: 0 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffdc00;
  border-bottom: 1px solid #111;
}

main {
  margin: 60px auto;
  max-width: 90vw;
  table.table {
    table-layout: fixed;
    .w-100 {
      width: 100px;
    }
    .w-150 {
      width: 150px;
    }
    .w-200 {
      width: 200px;
    }
    .truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .one-line {
    white-space: no-wrap;
    overflow: hidden;
  }
  .action-button {
    display: flex;
    justify-content: center;
  }
  .icons-wrapper {
    display: flex;
    justify-content: space-evenly;
  }
  .action-icon {
    padding: 0 2px;
    cursor: pointer;
  }
}
</style>
