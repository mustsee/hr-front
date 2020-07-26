<template>
  <div class="advert">
    <header>
      <b-button @click="handleGoBack">&#8592;</b-button>
    </header>
    <main>
      <b-field label="Domain">
        <b-autocomplete
          v-model="form.domain"
          ref="autocompleteSecond"
          :data="filteredDomainsNamesArray"
          placeholder="Select a domain"
          spellcheck="false"
        >
          <template slot="header">
            <a @click="showAddDomain">
              <span> Add new... </span>
            </a>
          </template>
          <template slot="empty">No results for {{ form.domain }}</template>
        </b-autocomplete>
      </b-field>

      <b-field label="Company name">
        <b-autocomplete
          v-model="form.companyName"
          ref="autocomplete"
          :data="filteredCompanyNamesArray"
          placeholder="Select a company name"
        >
          <template slot="header">
            <a @click="showAddCompanyName">
              <span> Add new... </span>
            </a>
          </template>
          <template slot="empty"
            >No results for {{ form.companyName }}</template
          >
        </b-autocomplete>
      </b-field>

      <b-field label="Advert url">
        <b-input
          v-model="form.url"
          placeholder="Copy advertising url"
          spellcheck="false"
        ></b-input>
      </b-field>
      <b-field label="Job position">
        <b-autocomplete
          v-model="form.jobPosition"
          ref="autocompleteThird"
          :data="filteredJobNamesArray"
          placeholder="Select a job position"
        >
          <template slot="header">
            <a @click="showAddJobPosition">
              <span> Add new... </span>
            </a>
          </template>
          <template slot="empty"
            >No results for {{ form.jobPosition }}</template
          >
        </b-autocomplete>
      </b-field>
      <b-field label="Technical stack">
        <b-taginput
          v-model="form.technicalStack"
          :data="filteredStack"
          autocomplete
          :allow-new="true"
          :open-on-focus="true"
          icon="label"
          placeholder="Add a stack"
          @typing="getFilteredStack"
        >
        </b-taginput>
      </b-field>
      <b-field label="Overall impressions">
        <b-input
          v-model="form.impressions"
          placeholder="What did you feel while reading the ad..."
          spellcheck="false"
          maxlength="200"
          type="textarea"
        ></b-input>
      </b-field>
      <div class="action-button">
        <b-button @click="handleAd" type="is-success">
          {{ edit ? "Edit" : "Create" }} ad</b-button
        >
      </div>
    </main>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000";

export default {
  name: "Advert",
  data() {
    return {
      edit: false,
      form: {
        id: null,
        domain: "",
        companyName: "",
        url: "",
        jobPosition: "",
        technicalStack: [],
        impressions: "",
      },
      domains: [],
      companyNames: [],
      jobPositions: [],
      stack: [],
      filteredStack: [],
    };
  },
  computed: {
    filteredCompanyNamesArray() {
      return this.companyNames.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.form.companyName.toLowerCase()) >= 0
        );
      });
    },
    filteredJobNamesArray() {
      return this.jobPositions.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.form.jobPosition.toLowerCase()) >= 0
        );
      });
    },
    filteredDomainsNamesArray() {
      return this.domains.filter((option) => {
        if (!this.form.domain) return option;
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.form.domain.toLowerCase()) >= 0
        );
      });
    },
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/" });
    },
    getFilteredStack(text) {
      this.filteredStack = this.stack.filter((option) => {
        if (!text) return option;
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
    showAddJobPosition() {
      this.$buefy.dialog.prompt({
        message: `Job position`,
        inputAttrs: {
          placeholder: "e.g. front-end",
          maxlength: 20,
          value: this.form.jobPosition,
        },
        confirmText: "Add",
        onConfirm: () => {
          this.handleAddJobPosition(this.form.jobPosition);
        },
      });
    },
    showAddCompanyName() {
      this.$buefy.dialog.prompt({
        message: `Company name`,
        inputAttrs: {
          placeholder: "e.g. Google",
          maxlength: 20,
          value: this.form.companyName,
        },
        confirmText: "Add",
        onConfirm: () => {
          this.handleAddCompany(this.form.companyName);
        },
      });
    },
    showAddDomain() {
      this.$buefy.dialog.prompt({
        message: `Domain`,
        inputAttrs: {
          placeholder: "e.g. Regtech",
          maxlength: 20,
          value: this.form.domain,
        },
        confirmText: "Add",
        onConfirm: () => {
          this.handleAddDomain(this.form.domain);
        },
      });
    },
    handleAddJobPosition(value) {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      const payload = {
        method: "POST",
        body: JSON.stringify({ name: value }),
        headers,
        mode: "cors",
        cache: "default",
      };
      fetch(`${baseUrl}/jobPositions`, payload)
        .then(() => {
          this.loadJobPositions();
          this.$refs.autocompleteThird.setSelected(value);
        })
        .catch((err) => console.log("Error in handleAddJobPosition: ", err));
    },
    handleAddDomain(value) {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      const payload = {
        method: "POST",
        body: JSON.stringify({ name: value }),
        headers,
        mode: "cors",
        cache: "default",
      };
      fetch(`${baseUrl}/domains`, payload)
        .then(() => {
          this.loadDomains();
          this.$refs.autocompleteSecond.setSelected(value);
        })
        .catch((err) => console.log("Error in handleAddDomain: ", err));
    },
    handleAddCompany(value) {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      const payload = {
        method: "POST",
        body: JSON.stringify({ name: value }),
        headers,
        mode: "cors",
        cache: "default",
      };
      fetch(`${baseUrl}/companyNames`, payload)
        .then(() => {
          this.loadCompanyNames();
          this.$refs.autocomplete.setSelected(value);
        })
        .catch((err) => console.log("Error in handleAddCompany: ", err));
    },
    handleAd() {
      let advert = this.form;
      advert.date = new Date();
      const { edit, form } = this;
      const method = edit ? "PATCH" : "POST";
      const url = edit ? `${baseUrl}/adverts/${form.id}` : `${baseUrl}/adverts`;
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      const payload = {
        method,
        body: JSON.stringify(advert),
        headers,
        mode: "cors",
        cache: "default",
      };
      fetch(url, payload)
        .then(() => {
          if (edit) {
            this.$router.push({ path: "/" });
            this.$buefy.toast.open({
              message: "Ad edited !",
              type: "is-success",
            });
          } else {
            this.form = {
              id: null,
              domain: null,
              companyName: "",
              url: "",
              jobPosition: "",
              technicalStack: [],
              impressions: "",
            };
            this.$buefy.toast.open({
              message: "Ad created !",
              type: "is-success",
            });
          }
        })
        .catch((err) => {
          console.log("Error :", err);
        });
    },
    loadJobPositions() {
      fetch(`${baseUrl}/jobPositions`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.jobPositions = data.map((item) => item.name);
        })
        .catch((err) => console.log("Error : ", err));
    },
    loadCompanyNames() {
      fetch(`${baseUrl}/companyNames`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.companyNames = data.map((item) => item.name);
        })
        .catch((err) => console.log("Error : ", err));
    },
    loadDomains() {
      fetch(`${baseUrl}/domains`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.domains = data.map((item) => item.name);
        })
        .catch((err) => console.log("Error : ", err));
    },
    loadStack() {
      fetch(`${baseUrl}/stack`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.stack = data.map((item) => item.name);
        })
        .catch((err) => console.log("Error : ", err));
    },
  },
  mounted() {
    this.loadStack();
    this.loadJobPositions();
    this.loadCompanyNames();
    this.loadDomains();
    const { id } = this.$route.params;
    if (id) {
      this.edit = true;
      const payload = {
        method: "GET",
      };
      fetch(`${baseUrl}/adverts/${id}`, payload)
        .then((res) => res.json())
        .then((data) => {
          this.form = data;
        })
        .catch((err) => console.log("Error : ", err));
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 80px;
  padding: 0 5vw;
  display: flex;
  align-items: center;
  background-color: #ffdc00;
  border-bottom: 1px solid #111;
}
main {
  margin: 60px auto;
  max-width: 50vw;
  .action-button {
    display: flex;
    justify-content: center;
  }
}
</style>
