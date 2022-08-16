//creating state store
class Store {
  //creating a constructor and will set the initial state(movie)
  constructor(init = {}) {
    //create varoable to hold our reference to the store
    const self = this;
    //
    this.subsciber = [];
    //this is the stores state which is a proxy we are using the it to store changes to the state
    //it initialized with the value of init from our constructor, if it's provided
    //the three arguments ae the state (the original ovject) the key being changed and the value being set(data.Title)
    this.state = new Proxy(init, {
      //set the value on the state. this won't retrigger the proxy
      set(state, key, value) {
        state[key] = value;
        self.subscrivers.forEach((subsciber) => subsciber(state));
        return true;
      },
    });
  }
  subscribe(cb) {
    if (typeof cb !== "function") {
      throw new Error("You must subscribe with a function");
    }

    this.subscribers.push(cb);
  }
}

class Movie extends HTMLElement {
  constructor() {
    super();
  }

  //overriding the connected callback method with my own html
  connectedCallback() {
    this.innerHTML = `
        <img src=${this.getAttribute("img")}>
        <h2>${this.getAttribute("title")}</h2>
        <p>${this.getAttribute("year")}</p>
        <p>${this.getAttribute("desc")}</p>
        
        
        `;
  }
}

//custome-elem
customElements.define("movie-display", Movie);
