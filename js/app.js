var model = {
  currentCat: null,
  cats: [
    {
      clickCount:0,
      name: 'Larry',
      imgSrc: './static/images/cat0.jpg'
    },
    {
      clickCount:0,
      name: 'Joey',
      imgSrc: './static/images/cat1.jpg'
    }
  ]
};

var octopus = {
  init: function() {
    model.currentCat = model.cats[0];
    catView.init();
    catListView.init();
    adminView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
    catView.render();
  },

  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  }
};

var catView = {
  init: function() {
    this.catElem = document.getElementById('display');
    this.catNameElem = document.getElementById('cat-name');
    this.countElem = document.getElementById('click-count');
    this.catImageElem = document.getElementById('cat-image');

    this.catImageElem.addEventListener('click', function(){
      octopus.incrementCounter();
    });

    this.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

var catListView = {
  init: function() {
    this.catListElem = document.getElementById('cat-list');
    this.render();
  },

  render: function() {
    var cat, elem, i;
    var cats = octopus.getCats();

    this.catListElem.innerHTML = '';

   for (i = 0; i < cats.length; i++) {
     cat = cats[i];
     elem = document.createElement('li');
     elem.textContent = cat.name;
     elem.addEventListener('click', (function(catCopy) {
       return function() {
         octopus.setCurrentCat(catCopy);
         catView.render();
         adminView.hideAdminView();
       };
     })(cat));
     this.catListElem.appendChild(elem);
    }
  }
};

var adminView = {
  init: function() {
    this.nameInput = document.getElementById('name-input');
    this.urlInput = document.getElementById('url-input');
    this.clicksInput = document.getElementById('clicks-input');

    this.adminBtn = document.getElementById('admin-btn');
    this.adminBtn.addEventListener('click', (function() {
      return adminView.showAdminView()}));

    this.submitBtn = document.getElementById('submit');
    this.submitBtn.addEventListener('click', (function() {
      return adminView.render()}));

    this.cancelBtn = document.getElementById('cancel');
    this.cancelBtn.addEventListener('click', (function() {
      return adminView.hideAdminView()}));
  },

  showAdminView: function(){
    var admin = document.getElementById('admin-display');
    var currentCat = octopus.getCurrentCat();
    admin.style.display = "block";
    this.nameInput.value = currentCat.name;
    this.urlInput.value = currentCat.imgSrc;
    this.clicksInput.value = currentCat.clickCount;
  },

  hideAdminView: function(){
    var admin = document.getElementById('admin-display');
    admin.style.display = "none";
    this.nameInput.value = "";
    this.urlInput.value = "";
    this.clicksInput.value = "";
  },

  render: function(){
    var currentCat = octopus.getCurrentCat();
    currentCat.name = this.nameInput.value;
    currentCat.imgSrc = this.urlInput.value;
    currentCat.clickCount =  this.clicksInput.value;
    octopus.setCurrentCat(currentCat);
    this.hideAdminView();
  }
};

octopus.init();
