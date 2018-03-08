
Vue.component('tool-facebook', {
  template: `

<div>
  <div class="form-group">
    <label for="exampleTextarea">Enter Facebook mobile links (m.facebook.com), line by line</label>
    <textarea v-model="linksInput" @input="check" class="form-control" id="exampleTextarea" rows="8" ref="myComponent"></textarea>
  </div>

  <div class="card border-success mb-3">
    <div class="card-header">Conversion result</div>
    <div class="card-body text-default">
      <ul class="no-decoration">
        <li v-for="item in linksOutput"><a :href="item" rel="noopener" target="_blank">{{item}}</a></li>
      </ul>
    </div>
  </div>
</div>

`,
  data() {
    return {
      linksInput: "",
      linksOutput: [],
    }
  },
  methods: {
    check() {
      this.linksOutput = this.linksInput.split("\n").map(item => {
        if (item.indexOf("m.facebook.com") !== -1) {
          let regexpResult = item.match(/\d+/g);
          if (regexpResult && regexpResult.length >= 2) {
            return `https://www.facebook.com/${regexpResult[1]}/posts/${regexpResult[0]}`;
          }
        }
        console.log(this.linksOutput);
      });
    }
  }
});

Vue.component('app-youtube', {
  template: `<div>
    TODO YOUTUBE
  </div>`
});

Vue.component('app-form', {
  template: `<div>
    TODO FORM
  </div>`
});

Vue.component('app-data-search', {
  template: `<section v-if="tableData">
  <span class="badge badge-pill badge-warning">
    SELECT * FROM super_data where {{searchKeyword.trim() === "" ? 1 : "name LIKE '%" + searchKeyword.trim() + "%'"}};
  </span>
  <div class="form-group">
    <label class="form-control-label" for="filter">Search by name</label>
    <input type="text" class="form-control" name="filter" v-model="searchKeyword">
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
          let searchKeyword = this.searchKeyword.toLowerCase().trim();
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

Vue.component('tool-converter', {
  template: `
<div>
<div class="form-group">
  <label class="col-form-label" for="inputDefault">Exchange date</label>
  <input @change="check" type="date" v-model="exchangeDate" class="form-control" name="inputDefault">
</div>

<div class="form-group">
    <label for="exampleSelect1">Currency</label>
    <select @change="check" v-model="currency" class="form-control" name="exampleSelect1">
      <optgroup label="Developer's choice">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </optgroup>
      <optgroup v-if="allCurrencies" label="All currencies">
        <option v-for="currency in allCurrencies" :value="currency.cc">{{currency.txt}}</option>
      </optgroup>
    </select>
</div>

<div v-if="loading">
  Loading...
</div>

<div v-if="nbuMessage">
  <p class="monospace">Raw data from NBU: {{nbuMessage}}</p>
  <div class="form-group">
    <label class="col-form-label" for="inputUAH">{{currency}} amount</label>
    <input type="number" v-model="uahAmount" class="form-control" name="inputUAH">
  </div>
  <p class="monospace">Raw: {{uahAmount * nbuMessage.rate}} UAH</p>
  <p class="monospace">Rounded: {{(uahAmount * nbuMessage.rate).toFixed(2)}} UAH</p>

  <div class="form-group">
    <label for="exampleTax">Tax amount</label>
    <select v-model="tax" class="form-control" name="exampleTax">
      <option value="3">3%</option>
      <option value="5">5%</option>
    </select>
  </div>

  <p class="monospace">Tax raw: {{uahAmount * nbuMessage.rate * tax / 100}} UAH</p>
  <p class="monospace">Tax rounded: {{(uahAmount * nbuMessage.rate * tax / 100).toFixed(2)}} UAH</p>

</div>
</div>
`,
  data() {
    return {
      exchangeDate: "",
      currency: "USD",
      loading: false,
      nbuMessage: "",
      uahAmount: 0,
      tax: "5",
      allCurrencies: false
    }
  },
  methods: {
    check() {
      if (this.exchangeDate && this.currency) {
        let self = this;
        self.loading = true;
        let date = this.exchangeDate.replace(/-/g, "");
        let promise = fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${self.currency}&date=${date}&json`);
        promise.then(function (response) {
          return response.json();
        }).then((data) => { self.loading = false; self.nbuMessage = data[0] });

      }
    }
  },
  created: function () {
    let self = this;
    let promise = fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    promise.then(function (data) {
      return data.json();
    }).then(data => self.allCurrencies = data);
  }
});

Vue.component('app-nav', {
  props: ['currentPage', 'links'],
  template: `TEST`,
  data() {
    return {
      themes: false,
      currentTheme: "Lux",
      lightTheme: false
    }
  },
  methods: {
    clickHandler(page, event) {
      if (event) event.preventDefault()
      this.$emit('update:currentPage', page)
    },
    changeTheme(index, e) {
      e.preventDefault();
      this.setTheme(this.themes[index]);
      localStorage.theme = JSON.stringify(this.themes[index]);
    },
    setTheme(theme) {
      let currentThemeLink = $("head link[data-style='theme']");
      currentThemeLink.attr("href", theme.css);
      this.currentTheme = theme.name;
    },
    customize(settings, e) {
      e.preventDefault();
      if (settings.action) {
        switch (settings.action) {
          case "drop":
            localStorage.clear();
            location.reload();
            break;
          case "toggle":
            this.lightTheme = !this.lightTheme;
            localStorage.lightTheme = JSON.stringify(this.lightTheme);
            break;
        }
      }
    }
  },
  created() {
    if (localStorage.theme) {
      this.setTheme(JSON.parse(localStorage.theme));
    }
    if (localStorage.lightTheme) {
      this.lightTheme = JSON.parse(localStorage.lightTheme);
    }
    let self = this;

    let promise = fetch('https://bootswatch.com/api/4.json');
    promise.then(function (data) {
      return data.json();
    }).then(data => self.themes = data.themes);
  }
});

Vue.component('app-home', {
  template: `
  
<div>
  <h1>Welcome to this homepage written in Vue.js</h1>
  <p>
    It's very simple, therefore all code is placed in one file (<a href="https://bochkovyi.github.io/assets/js/main.js" rel="noopener" target="_blank">here</a>)
  </p>
  <p>At Natuurlijk I placed some tools, like Currency Converter with tax calculator, and links to my other apps.</p>
  <p>Get in touch if you want more info!</p>
  </div>
</div>
  
  `
});

Vue.component('app-tools', {
  template: `
  
<div id="exampleAccordion" data-children=".item">
  <div class="item" v-for="(item, index) in tools">
    <h2><a data-toggle="collapse" data-parent="#exampleAccordion" :href="'#exampleAccordion' + (index + 1)" role="button" aria-expanded="true" :aria-controls="'exampleAccordion' + (index + 1)">
      {{item.name}}
    </a></h2>
    <div :id="'exampleAccordion' + (index + 1)" class="collapse" v-bind:class="{ show: index === 0 }" role="tabpanel">
      <div :is="item.componentName"></div>
    </div>
  </div>
</div>
  
  `,
  data() {
    return {
      tools: [
        {
          name: "Currency converter for UAH based on NBU data",
          componentName: "tool-converter"
        },
        {
          name: "Tool for converting mobile facebook links to full version",
          componentName: "tool-facebook"
        },
        {
          name: "Tool for converting raw csv data to table data",
          componentName: "tool-csv"
        }
      ]
    }
  }
});

Vue.component('projects-code', {
  template: `
<div>
  <div v-for="item in data">
    <a v-bind:href="'https://github.com/bochkovyi/' + item.value" rel="noopener" target="_blank">{{item.name}}</a> <span class="badge badge-pill badge-warning">{{item.type}}</span>
    <p>{{item.description}}</p>
  </div>
</div>
  `,
  data() {
    return {
      data: [{ value: "currency-app", name: "Currency App", description: "Source code for Currency App Angular project", type: "Angular" },
      { value: "Simple-PHP-App", name: "Simple PHP app", description: "JSON database, user authentication, custom MVC framework", type: "PHP" },
      { value: "db-project", name: "JSON DB project", description: "Simple file key-value store with example node.js server and two endpoints", type: "Node.js" },
      { value: "imaginator", name: "Imaginator", description: "There is (was) a possibility to access pictures of the shutdown Panoramio by direct link. App downloads up to 20 pictures at random per call.", type: "Node.js" },
      { value: "web_services", name: "Web Services", description: "Very simple Node api that uses mysql library", type: "Node.js" }]
    };
  }
});

Vue.component('projects-live', {
  template: `
<div>
  <div v-for="item in data">
    <a v-bind:href="item.value" rel="noopener" target="_blank">{{item.name}}</a> <span class="badge badge-pill badge-warning">{{item.type}}</span>
  </div>
</div>
  `,
  data() {
    return { data: [{ value: "projects/currency-app", name: "Currency App", type: "Angular" }, { value: "projects/partywise", name: "PartyWise", type: "Angular" }, { value: "projects/mapapp", name: "LocationTracker", type: "Angular" }, { value: "projects/orchid", name: "Orchid", type: "Vue.js" }] };
  }
});

Vue.component('app-contacts', {
  template: `
  
<div>
  Let's get in touch in <a href="https://www.linkedin.com/in/bochkovyi/" rel="noopener" target="_blank">LinkedIn</a>
</div>
  
  `
});

Vue.component('app-main', {
  template: `
  
<div>
  <app-nav :currentPage.sync="currentPage" :links="links"></app-nav>

  <br>
  <br>
  <br>
  <br>
  <br>

  <div class="container">

    <div class="jumbotron">

      <div v-if="currentPage === 'home'">
        <app-home/>
      </div>

      <div v-for="link in links" v-if="currentPage === link.value" :is="link.componentName">
      </div>

    </div> <!-- jumbotron -->
  </div> <!-- container -->
</div>
  
  `,
  data() {
    return {
      currentPage: "home",
      links: [
        {
          name: "Useful tools",
          value: "tools",
          componentName: "app-tools"

        },
        {
          name: "Projects - code",
          value: "projectsCode",
          componentName: "projects-code"
        },
        {
          name: "Projects - live versions",
          value: "projectsLive",
          componentName: "projects-live"
        },
        {
          name: "Contacts",
          value: "contacts",
          componentName: "app-contacts"
        },
      ]
    }
  },
  watch: {
    currentPage: function (val) {
      if (val !== window.location.hash.substr(1)) {
        window.location.hash = val;
      }
    }
  },
  created: function () {
    let path = window.location.hash.substr(1);
    if (path !== "") {
      this.currentPage = path;
    }
  }
});

new Vue({
  el: '#main-app'
})
