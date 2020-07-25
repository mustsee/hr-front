<template>
  <div class="advert">
    <header>
      <b-button @click="handleGoBack">&#8592;</b-button>
    </header>
    <main>
      <b-field label="Domain">
        <b-select v-model="form.domain" placeholder="Select a domain" expanded>
          <option
            v-for="option in domains"
            :value="option.name"
            :key="option.id"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Company name">
        <b-input
          v-model="form.companyName"
          placeholder="Enter the company name"
          spellcheck="false"
        ></b-input>
      </b-field>
      <b-field label="Advert url">
        <b-input
          v-model="form.url"
          placeholder="Copy advertising url"
          spellcheck="false"
        ></b-input>
      </b-field>
      <b-field label="Job position">
        <b-input
          v-model="form.jobPosition"
          placeholder="Enter the job position"
          spellcheck="false"
        ></b-input>
      </b-field>
      <b-field label="Technical stack">
        <b-input
          v-model="form.technicalStack"
          placeholder="Enter the technical stack"
          spellcheck="false"
        ></b-input>
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
        domain: null,
        companyName: "",
        url: "",
        jobPosition: "",
        technicalStack: "",
        impressions: "",
      },
      domains: [
        { id: 1, name: "Finance" },
        { id: 2, name: "Assurances" },
        { id: 3, name: "Banques" },
      ],
    };
  },
  methods: {
    handleGoBack() {
      this.$router.push({ path: "/" });
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
              technicalStack: "",
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
  },
  mounted() {
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
  padding: 0 60px;
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
