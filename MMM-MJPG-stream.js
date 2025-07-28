Module.register('MMM-MJPG-stream', {
    defaults: {
        title: 'MJPG Stream',
        header: false,
    },

    getScripts: function() {
        return [];
    },

    getStyles: function() {
        return ["MMM-MJPG-stream.css"];
    },

    start: function() {
        Log.info('Starting module ' + this.name);
        this.url1_alive = false;
        this.url2_alive = false;
        this.url3_alive = false;
        var self = this;
    },

    getDom: function() {
        var content = document.createElement("div");
        content.classList.add("flexContent");
        if (this.url1_alive) {
          var cam = document.createElement("div");
          cam.classList.add("divStream");
          var img = document.createElement("img");
          img.classList.add("imgStream");
          img.src = this.config.url1;
          cam.appendChild(img);
          content.appendChild(cam);
        }
        if (this.url2_alive) {
          var cam = document.createElement("div");
          cam.classList.add("divStream");
          var img = document.createElement("img");
          img.classList.add("imgStream");
          img.src = this.config.url2;
          cam.appendChild(img);
          content.appendChild(cam);
        }
        if (this.url3_alive) {
          var cam = document.createElement("div");
          cam.classList.add("divStream");
          var img = document.createElement("img");
          img.classList.add("imgStream");
          img.src = this.config.url3;
          cam.appendChild(img);
          content.appendChild(cam);
        }


        return content;
    },

notificationReceived: function(notification, payload) {
    if (notification === "START_MJPEGSTREAM") {
      Log.info("received :"+ payload.action);
      var fade = 500;
      var received = payload.action;
      if (received === "url1") {
	this.url1_alive =  true;
      } else if (received === "url2") {
	this.url2_alive = true;
      } else if (received === "url3") {
	this.url3_alive = true;
      }
      if (this.hidden == true ) {
        //this.show(1000, {lockString: this.identifier});
        this.show(1000, function() {});
        Log.info("hidden was true") ;
      } else {
        Log.info("hidden was false") ;
      }
        this.updateDom(fade);
    }
    if (notification === "STOP_MJPEGSTREAM") {
      Log.info("received :"+ payload.action);
      var fade = 500;
      var received = payload.action;
      if (received === "url1") {
	this.url1_alive = false;
      } else if (received === "url2") {
	this.url2_alive = false;
      } else if (received === "url3") {
	this.url3_alive = false;
      }
      this.updateDom(fade);
      if ( ! (this.url1_alive || this.url2_alive || this.url3_alive) ) {
	//this.hide(1000, {lockString:this.identifier});
        this.hide(1000, function() {
		// modulehidden
	});
        Log.info("Hide") ;
      }
    }
    if (notification==="MODULE_DOM_CREATED") {
        this.hide(0, function() {
		// modulehidden
	});
	//this.hide(0, {lockString:this.identifier});
    }
}

});
