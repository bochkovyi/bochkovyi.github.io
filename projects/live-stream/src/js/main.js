Vue.component('app-youtube', {
  template: `
  <section id="app-youtube">
    <div class="arrow-container left-arrow"><button :disabled="!prevPageToken" @click="arrowClick(false)"><i class="arrow left"></i></button></div>
    <div class="main-block">
      <div class="form-group">
        <input type="text" class="form-control" v-model="searchString" placeholder="Search your video">
      </div>
      <div class="video-preview-loading" v-if="loading">
        <div class="loading">
          <div class="loading-bar" v-for="i in [1, 2, 3, 4]"></div>
        </div>
      </div>
      <div class="video-preview-fail" v-else-if="items.length === 0">
        <p>We're run out of #livestreams on this topic. Let's try ordinary videos?</p>
        <button class="btn btn-primary" @click="switchLivestreamMode(false)">Yes, let's give it a try</button>
      </div>
      <div class="video-preview" v-else>
        <div v-for="(item, key) in items" class="youtube-video-preview-container" :style="{backgroundImage: 'url(' + item.snippet.thumbnails.high.url + ')' }">
          <a class="youtube-video-preview-link" href="#" @click="openModal($event, item.id.videoId, item.snippet.title)">
            {{ item.snippet.title.length < 45 ? item.snippet.title : item.snippet.title.substr(0, 45).trim() + '...'}}
          </a>
        </div>
      </div>
    </div>
    <div class="arrow-container right-arrow"><button :disabled="!nextPageToken" @click="arrowClick(true)"><i class="arrow right"></i></button></div>

    <div class="modal" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{selectedVideoTitle}}</h5>
            <button type="button" class="close" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <iframe width="560" height="315" :src="selectedVideoUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </section>`,
  data() {
    return {
      searchString: 'Trains',
      showModal: false,
      selectedVideoTitle: null,
      selectedVideoUrl: null,
      prevPageToken: null,
      nextPageToken: null,
      items: [],
      loading: true,
      liveStream: true
    }
  },
  methods: {
    doYoutubeSearch(token = false) {
      this.loading = true;
      const apiEndpoint = 'https://www.googleapis.com/youtube/v3/search/?part=snippet';
      const settings = '&maxResults=4&type=video&key=AIzaSyCAgUyzqgqLEXJpY_FY4qKttL7Jck7eaRc';
      const searchKeyword = `&q=${this.searchString}`;
      let url = apiEndpoint + settings + searchKeyword;
      if (token) {
        url += `&pageToken=${token}`;
      }
      if (this.liveStream) {
        url += '&eventType=live';
      }
      let promise = fetch(url);
      promise.then(data => data.json()).then(data => {
        this.items = data.items;
        this.prevPageToken = data.prevPageToken;
        this.nextPageToken = data.nextPageToken;
        this.loading = false;
      }).catch(e => console.error('Could not fetch data', e));
    },
    openModal(e, videoId, videoTitle) {
      e.preventDefault();
      this.selectedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
      this.selectedVideoTitle = videoTitle;
      this.showModal = true;
    },
    closeModal() {
      this.showModal=false;
      this.selectedVideoUrl = "";
    },
    arrowClick(nextVideo) {
      if (nextVideo) {
        this.doYoutubeSearch(this.nextPageToken);
      } else {
        this.doYoutubeSearch(this.prevPageToken);
      }
    },
    switchLivestreamMode(isLivestreamActive = true) {
      this.liveStream = isLivestreamActive;
      this.doYoutubeSearch();
    }
  },
  watch: {
    searchString: function (currentValue, prevValue) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(() => {
        let currentValueTrimmed = currentValue.trim();
        if (!this.prevValueTrimmed || currentValueTrimmed !== this.prevValueTrimmed) {
          this.prevValueTrimmed = currentValueTrimmed;
          this.doYoutubeSearch(); // distinctUntilChanged
        }
      }, 500) // debounceTime
    }
  },
  created: function() {
    this.doYoutubeSearch();
  }
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
