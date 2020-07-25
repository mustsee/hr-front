<template>
  <div class="advert">
    <header>
      <b-button @click="handleGoBack">&#8592;</b-button>
    </header>
    <main>
      <b-field label="Domain">
        <b-select placeholder="Select a domain" expanded>
          <option v-for="option in domains" :value="option.id" :key="option.id">
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
      <b-field label="Avert url">
        <b-input
          v-model="form.url"
          placeholder="Copy advertising url"
          spellcheck="false"
        ></b-input>
      </b-field>
      <b-field label="Job position">
        <b-input
          v-model="form.jobPostion"
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
        <b-button @click="handleCreateAd" type="is-success">Create ad</b-button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Advert",
  data() {
    return {
      form: {
        domain: "",
        companyName: "",
        url: "",
        jobPostion: "",
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
    handleCreateAd() {},
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
  border-bottom: 1px solid black;
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
