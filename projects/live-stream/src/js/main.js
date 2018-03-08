Vue.component('app-youtube', {
  template: `<div>
    TODO YOUTUBE
  </div>`
});

Vue.component('app-form', {
  template: `
  <form method="GET" @submit="checkForm" @keyup="clearErrors">
  <fieldset>
    <legend>Amazing form for amazing people who want a car wash done!</legend>

    <div v-if="errors.length" class="alert alert-danger">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>

    <div class="form-group">
      <label class="form-control-label" for="name">Name</label>
      <input type="text" class="form-control" name="name" v-model.trim="name" placeholder="Name">
    </div>
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" name="email" v-model.trim="email" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="phone">Phone</label>
      <input type="tel" class="form-control" name="phone" v-model.trim="phone" placeholder="Phone number">
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea class="form-control" name="description" v-model.trim="description" rows="3" placeholder="Description"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
  `,
  data() {
    return {
      errors:[],
      name:null,
      email:null,
      phone:null,
      description:null
    }
  },
  methods: {
    clearErrors() {
      this.errors = [];
    },
    checkForm(e) {
      let descriptionWordCount = this.description ? this.description.replace(/\s+/g, ' ').split(' ').length: 0;
      if(this.name && this.email && this.phone && this.description && descriptionWordCount > 5) return true;
      this.errors = [];

      if(!this.name) this.errors.push("Name required.");
      if(!this.email) this.errors.push("Email required.");
      if(!this.phone) this.errors.push("Phone required.");
      if(descriptionWordCount <= 5 || descriptionWordCount > 100) this.errors.push("Description must be > 5 and <= 100 words");
      try {
        let container = this.$el.querySelector("legend");
        container.scrollIntoView();
      } catch (e) {
        console.error(e);
      }
      
      e.preventDefault();
    }
  }
});

Vue.component('app-data-search', {
  template: `<section v-if="tableData">
  <span class="badge badge-pill badge-warning">
    SELECT * FROM super_data where {{searchKeyword === "" ? 1 : "name LIKE '%" + searchKeyword + "%'"}};
  </span>
  <div class="form-group">
    <label class="form-control-label" for="filter">Search by name</label>
    <input type="text" class="form-control" name="filter" v-model.trim="searchKeyword">
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th v-for="header in tableHeader" scope="col">{{header}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in filteredTable">
        <td v-for="td in row">{{td}}</td>
      </tr>
    </tbody>
    </table>
  </section>`,
  data() {
    return {
      searchKeyword: "",
      tableData: false
    }
  },
  computed: {
    tableHeader() {
      let result = [];
      if (this.tableData) {
        result = this.tableData[0];
      }
      return result;
    },
    filteredTable() {
      let result = [];
      if (this.tableData && this.tableData.length > 1) {
        result = this.tableData.slice(1);
        if (this.searchKeyword) {
          let searchKeyword = this.searchKeyword.toLowerCase();
          result = result.filter(item => item[1].toLowerCase().indexOf(searchKeyword) !== -1);
        }
      }
      return result;
    }
  },
  created: function () {
    let promise = fetch('data.json');
    promise.then(data => data.json()).then(data => this.tableData = data).catch(e => console.error('Could not fetch data', e));
  }
});

new Vue({
  el: '#main-app'
})
