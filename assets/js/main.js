
Vue.component('tool-facebook', {
  template: `

<div>
  <div class="form-group">
    <label for="exampleTextarea">Enter Facebook links, line by line</label>
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

Vue.component('tool-csv', {
  template: `<div>
    TODO
  </div>`
});

Vue.component('app-nav', {
  props: ['currentPage', 'links'],
  template: `<div class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
  <div class="container">
    <a href="" @click="clickHandler('home', $event)" class="navbar-brand">Natuurlijk!</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="link in links">
          <a class="nav-link" href="" @click="clickHandler(link.value, $event)" v-bind:class="{ active: currentPage === link.value }">{{link.name}}</a>
        </li>
      </ul>
    </div>

  </div>
</div>`,
  methods: {
    clickHandler(page, event) {
      if (event) event.preventDefault()
      this.$emit('update:currentPage', page)
    }
  }
});

Vue.component('app-home', {
  template: `
  
<div>
  Test home (TODO)
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
  Test projects (TODO)
</div>
  
  `
});

Vue.component('projects-live', {
  template: `
<div>
  <div v-for="item in data">
    <a v-bind:href="item.value">{{item.name}}</a>
  </div>
</div>
  `,
  data() {
    return {data: [{value: "projects/partywise", name: "PartyWise"}, {value: "projects/mapapp", name: "LocationTracker"}, {value: "projects/orchid", name: "Orchid"}]};
  }
});

Vue.component('app-contacts', {
  template: `
  
<div>
  Test contacts (TODO)
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
  }
});

new Vue({
  el: '#main-app'
})